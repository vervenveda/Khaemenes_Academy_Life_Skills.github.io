#!/usr/bin/env python3
"""Static integrity checks for Year 2 Culinary Unit 10, Weeks 37–40."""
from pathlib import Path
import json
import re
import sys
root=Path(__file__).resolve().parents[1]/"courses/culinary-independence/higher/cula-101"
def bank(s,name):
    m=re.search(r"\\b"+re.escape(name)+r"=(\\[.*?\\])(?=,priorBank=|,priorKey=|;let state=)",s)
    if not m: raise ValueError("Missing "+name)
    return json.loads(m.group(1))
errors=[]
previous=None
for w in range(37,41):
    p=root/f"week-{w:02d}"/"index.html"
    if not p.exists():
        errors.append(f"Week {w}: missing page")
        continue
    s=p.read_text(encoding="utf-8")
    course=f"CULA 201 Advanced Culinary Week {w:02d}"
    if f'course:"{course}"' not in s or f'incoming.course!=="{course}"' not in s: errors.append(f"Week {w}: export/import course mismatch")
    if f'priorKey="khae-culinary-cula101-week{w-1:02d}-"' not in s: errors.append(f"Week {w}: prior learner key mismatch")
    if "priorReady(id)" not in s or "a.score>=80" not in s: errors.append(f"Week {w}: missing prerequisite validation")
    try:
        current=bank(s,"bank")
        earlier=bank(s,"priorBank")
        if len(current)!=15 or len({q[0] for q in current})!=15: errors.append(f"Week {w}: quiz quantity or uniqueness")
        if not all(len(q)==2 and len(q[1])==3 and len(set(q[1]))==3 for q in current): errors.append(f"Week {w}: invalid answer options")
        if w==37:
            previous=bank((root/"week-36"/"index.html").read_text(encoding="utf-8"),"bank")
        if earlier!=previous: errors.append(f"Week {w}: prior quiz bank mismatch")
        previous=current
    except (ValueError,TypeError,json.JSONDecodeError) as exc: errors.append(f"Week {w}: {exc}")
portal=(root/"index.html").read_text(encoding="utf-8")
for w in range(37,41):
    if f'href="./week-{w:02d}/"' not in portal: errors.append(f"Week {w}: missing portal link")
print("Year 2 Unit 10 static checks:", "PASS" if not errors else "FAIL")
for e in errors: print(e,file=sys.stderr)
sys.exit(bool(errors))
