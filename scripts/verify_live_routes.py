import urllib.request
import urllib.error
import re
import sys

BASE_URL = 'http://localhost:3000'

ROUTES = [
    '/',
    '/about',
    '/pricing',
    '/subscription',
    '/faq',
    '/contact',
    '/guide-installation',
    '/guide-installation/firestick',
    '/guide-installation/samsung-smart-tv',
    '/guide-installation/lg-smart-tv',
    '/guide-installation/android-tv',
    '/guide-installation/apple-tv',
    '/guide-installation/iphone',
    '/guide-installation/android',
    '/guide-installation/windows',
    '/guide-installation/mac',
    '/blog',
    '/blog/how-to-install-iptv-on-amazon-firestick',
    '/blog/how-to-install-iptv-on-samsung-smart-tv',
    '/blog/how-to-stop-iptv-buffering-guide',
    '/blog/best-iptv-player-apps-smart-tv-firestick',
    '/blog/complete-master-us-iptv-setup-guide',
    '/terms',
    '/privacy-policy',
    '/refund-policy'
]

print(f"Testing {len(ROUTES)} live routes against {BASE_URL}...")

passed = 0
failed = 0

for r in ROUTES:
    url = f"{BASE_URL}{r}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (ProjectVerifier)'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            status = resp.status
            body = resp.read().decode('utf-8', errors='ignore')
            
            # Check title
            title_match = re.search(r'<title>(.*?)</title>', body, re.IGNORECASE)
            title = title_match.group(1) if title_match else 'MISSING TITLE'
            
            # Check description
            desc_match = re.search(r'<meta[^>]+name=[\'"]description[\'"][^>]+content=[\'"]([^\'"]+)[\'"]', body, re.IGNORECASE)
            desc = desc_match.group(1) if desc_match else 'MISSING DESC'
            
            # Check canonical
            canon_match = re.search(r'<link[^>]+rel=[\'"]canonical[\'"][^>]+href=[\'"]([^\'"]+)[\'"]', body, re.IGNORECASE)
            canon = canon_match.group(1) if canon_match else 'MISSING CANONICAL'
            
            if status == 200 and title != 'MISSING TITLE' and desc != 'MISSING DESC':
                passed += 1
                print(f"[OK 200] {r:<45} | Title: {title[:40]}... | Canon: {canon}")
            else:
                failed += 1
                print(f"[WARN] {r:<45} | Status: {status} | Title: {title} | Desc: {desc}")
    except Exception as e:
        failed += 1
        print(f"[FAIL] {r:<45} | Error: {e}")

print(f"\nAudit complete: {passed}/{len(ROUTES)} routes PASSED, {failed} failed.")
if failed > 0:
    sys.exit(1)
