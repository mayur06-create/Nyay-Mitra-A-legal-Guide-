"""
chunk_act.py - Indian Act PDF/TXT ko section-wise JSON me todta hai.

Usage:
  python chunk_act.py <input.pdf|input.txt> "<Act name>" <year> <output.json>
Example:
  python chunk_act.py raw/consumer_protection_act_2019.pdf "Consumer Protection Act" 2019 corpus/consumer_protection_act_2019.json
"""
import sys, re, json, random

def read_text(path):
    if path.lower().endswith(".pdf"):
        import fitz  # PyMuPDF
        doc = fitz.open(path)
        return "\n".join(page.get_text() for page in doc)
    return open(path, encoding="utf-8").read()

def clean_lines(raw):
    lines = []
    for ln in raw.splitlines():
        ln = ln.strip()
        if not ln:
            continue
        if re.fullmatch(r"\d{1,4}", ln):          # sirf page number
            continue
        if re.fullmatch(r"(?i)(THE GAZETTE OF INDIA.*|\[?PART II.*|ARRANGEMENT OF SECTIONS)", ln):
            continue
        lines.append(ln)
    return lines

SEC_START = re.compile(r"^(\d{1,3}[A-Z]{0,2})\.\s+(.+)")

def split_sections(lines):
    cands, cur = [], None
    for ln in lines:
        m = SEC_START.match(ln)
        if m:
            if cur: cands.append(cur)
            cur = {"section_no": m.group(1), "text": m.group(2)}
        elif cur:
            cur["text"] += " " + ln
    if cur: cands.append(cur)
    # Table of contents me bhi "1. Short title." jaisi lines hoti hain (chhoti).
    # Har section number ke liye sabse lamba text rakho = asli section.
    best = {}
    for c in cands:
        n = c["section_no"]
        if n not in best or len(c["text"]) > len(best[n]["text"]):
            best[n] = c
    return list(best.values())

def split_title(text):
    m = re.match(r"^(.{3,200}?)[.\-–—]{1,3}\s*[—–-]\s*(.*)$", text) or re.match(r"^(.{3,160}?)\.[—–-](.*)$", text)
    if m:
        return m.group(1).strip(" ."), m.group(2).strip() or text
    return "", text

def main(inp, act, year, out):
    secs = split_sections(clean_lines(read_text(inp)))
    recs = []
    for s in secs:
        title, body = split_title(s["text"])
        recs.append({"act": act, "year": int(year), "section_no": s["section_no"],
                     "title": title, "text": re.sub(r"\s+", " ", body).strip(),
                     "source": "India Code"})
    def key(r):
        m = re.match(r"(\d+)([A-Z]*)", r["section_no"]); return (int(m.group(1)), m.group(2))
    recs.sort(key=key)
    json.dump(recs, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    nums = sorted({int(re.match(r"\d+", r["section_no"]).group()) for r in recs})
    missing = [n for n in range(1, nums[-1] + 1) if n not in nums] if nums else []
    print(f"{len(recs)} sections saved -> {out}")
    print("Missing section numbers (PDF se manually check karo):", missing or "none")
    print("\n--- 5 random sections (original PDF se match karo) ---")
    for r in random.sample(recs, min(5, len(recs))):
        print(f"\n[{r['act']} s.{r['section_no']}] {r['title']}\n{r['text'][:250]}...")

if __name__ == "__main__":
    if len(sys.argv) != 5: print(__doc__); sys.exit(1)
    main(*sys.argv[1:])
