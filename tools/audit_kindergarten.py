#!/usr/bin/env python3
"""Read-only Life Skills repository source audit. Run from repository root."""
from pathlib import Path
from html.parser import HTMLParser
import json, re, shutil, subprocess, sys
ROOT=Path(__file__).resolve().parents[1]
K=ROOT/"courses"/"kindergarten"
class Inspector(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.links=[]; self.buttons=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if "id" in a:self.ids.append(a["id"])
        if tag=="a" and a.get("href"):self.links.append(a["href"])
        if tag=="button":self.buttons+=1
def inspect(p):
    source=p.read_text(encoding="utf-8")
    h=Inspector();h.feed(source)
    issues=[]
    if len(h.ids)!=len(set(h.ids)):issues.append("duplicate HTML IDs")
    for link in h.links:
        if link.startswith(("#","https:","http:","mailto:","tel:","javascript:","data:")):continue
        target=link.split("#")[0].split("?")[0]
        if not target:continue
        dest=(ROOT/target.lstrip("/")) if link.startswith("/") else p.parent/target
        if not dest.exists():issues.append("missing relative link: "+link)
    scripts=re.findall(r"<script\\b[^>]*>(.*?)</script>",source,re.S|re.I)
    if shutil.which("node"):
        for s in scripts:
            result=subprocess.run(["node","--check","-"],input=s,text=True,capture_output=True)
            if result.returncode:issues.append("JavaScript syntax: "+result.stderr.strip()[:250])
    else:issues.append("NOT VERIFIED: Node.js missing; JavaScript syntax unchecked")
    if not re.search(r"localStorage",source):issues.append("REVIEW: no localStorage reference")
    if not re.search(r"print|window\\.print",source,re.I):issues.append("REVIEW: print capability not found")
    return {"file":str(p.relative_to(ROOT)),"buttons":h.buttons,"issues":sorted(set(issues))}
def main():
    pages=sorted(K.glob("*/week-*/index.html"))
    reports=[inspect(p) for p in pages]
    subjects=sorted(p.name for p in K.iterdir() if p.is_dir())
    inventory={s:sorted(p.parent.name for p in (K/s).glob("week-*/index.html")) for s in subjects}
    summary={"kindergarten_subjects":len(subjects),"weekly_pages":len(pages),
             "inventory":inventory,"files":reports,
             "browser_certified":False,
             "note":"Static source inspection only; browser, 255px, keyboard, persistence, import and print must be tested separately."}
    print(json.dumps(summary,indent=2))
    return 1 if any(r["issues"] and any(not x.startswith(("REVIEW:","NOT VERIFIED:")) for x in r["issues"]) for r in reports) else 0
if __name__=="__main__":sys.exit(main())
