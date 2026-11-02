"""
filter_bns.py - bns_2023_full.json me se sirf diye gaye section numbers nikalta hai.

Usage:
  python filter_bns.py data/corpus/bns_2023_full.json data/corpus/bns_2023.json 303,304,308,309,310,316,318,319,351,352,353,354,355,356,69,74,76,77,78,79
"""
import sys, json

def main(inp, out, nums):
    want = set(n.strip() for n in nums.split(",") if n.strip())
    data = json.load(open(inp, encoding="utf-8"))
    kept = [r for r in data if r["section_no"] in want]
    found = {r["section_no"] for r in kept}
    missing = sorted(want - found, key=lambda x: int("".join(c for c in x if c.isdigit())))
    json.dump(kept, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"{len(kept)} of {len(want)} requested sections found -> {out}")
    if missing:
        print("NOT FOUND (check section numbers / chapter amendments):", missing)
    print("\n--- preview ---")
    for r in kept[:5]:
        print(f"\n[s.{r['section_no']}] {r['title']}\n{r['text'][:150]}...")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(__doc__); sys.exit(1)
    main(*sys.argv[1:])
