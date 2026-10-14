import os
import re

html_files = [
    'index.html',
    'explore.html',
    'consumer-rights.html',
    'directory.html',
    'rti.html',
    'news.html',
    'signin.html',
    'legal-notice.html',
    'glossary.html',
    'know-your-rights.html',
    'faq.html',
    'about.html'
]

css_link = '<link rel="stylesheet" href="assets/panels.css">'
js_scripts = '<script src="assets/emergency.js"></script>\n<script src="assets/menu.js"></script>'

for filename in html_files:
    if not os.path.exists(filename):
        print(f"Skipping missing file: {filename}")
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add css link if missing
    if 'assets/panels.css' not in content:
        if '</head>' in content:
            content = content.replace('</head>', f'    {css_link}\n</head>')
        else:
            print(f"No </head> in {filename}")

    # Add js scripts if missing
    if 'assets/emergency.js' not in content:
        if '</body>' in content:
            content = content.replace('</body>', f'    {js_scripts}\n</body>')
        else:
            print(f"No </body> in {filename}")
    elif 'assets/menu.js' not in content:
        content = content.replace('<script src="assets/emergency.js"></script>', '<script src="assets/emergency.js"></script>\n<script src="assets/menu.js"></script>')

    # Ensure menu button has id="mobileMenuBtn"
    content = re.sub(r'class="btn-menu"(?! id=)', 'class="btn-menu" id="mobileMenuBtn"', content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Successfully processed {filename}")
