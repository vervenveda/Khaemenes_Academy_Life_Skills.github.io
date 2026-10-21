#!/usr/bin/env python3
"""Year 2 Unit 13: assessment-chain, arithmetic and course-link regression."""
from pathlib import Path
import json, re, sys
root=Path(__file__).resolve().parents[1]/"courses/culinary-independence/higher/cula-101"
errors=[]
def extract(s, name):
    start=s.index(name+"=")+len(name)+1
    decoder=json.JSONDecoder()
    return decoder.raw_decode(s[start:])[0]
previous=extract((root/"week-48"/"index.html").read_text(),"bank")
for week in range(49,53):
    path=root/f"week-{week:02d}"/"index.html"
    if not path.is_file():
        errors.append(f"Week {week}: page missing")
        continue
    s=path.read_text()
    course=f"CULA 201 Advanced Culinary Week {week:02d}"
    for label,ok in [
        ("course export",f'course:"{course}"' in s),
        ("course import",f'incoming.course!=="{course}"' in s),
        ("learner prerequisite",f'priorKey="khae-culinary-cula101-week{week-1:02d}-"' in s),
        ("80 percent prerequisite","a.score>=80" in s and "priorReady(id)" in s),
        ("local saved record",f"khae-culinary-cula101-week{week:02d}-" in s),
    ]:
        if not ok: errors.append(f"Week {week}: {label}")
    try:
        lessons=extract(s,"lessons")
        bank=extract(s,"bank")
        prior=extract(s,"priorBank")
        if len(lessons)!=5 or any(len(d)!=3 or not all(isinstance(v,str) and len(v)>25 for v in d[1:]) for d in lessons):
            errors.append(f"Week {week}: lesson structure or depth")
        if len(bank)!=15 or len({q[0] for q in bank})!=15 or any(len(q)!=2 or len(q[1])!=3 or len(set(q[1]))!=3 for q in bank):
            errors.append(f"Week {week}: quiz bank")
        if prior!=previous: errors.append(f"Week {week}: previous quiz mismatch")
        previous=bank
    except (ValueError,KeyError,TypeError,IndexError,json.JSONDecodeError) as e:
        errors.append(f"Week {week}: data parse {e}")
portal=(root/"index.html").read_text()
for week in range(49,53):
    if f'href="./week-{week}/"' not in portal:
        errors.append(f"Week {week}: missing course entrance")
# Independent reference arithmetic for core Unit 13 models.
cases=[
    ("edible purchase kg", 30*.160/.80,6.0),
    ("inventory remaining kg",20+15-22,13),
    ("cost of goods",2400+3100-1900,3600),
    ("plate ingredient cost",4.20+1.30+.75+.25,6.50),
    ("scenario menu price",6.50/.325,20),
    ("contribution margin",20-8,12),
    ("break even units",6000/(20-8),500),
]
for name,actual,expected in cases:
    if abs(actual-expected)>1e-8: errors.append("Arithmetic: "+name)
print("Unit 13 forensic source audit:", "PASS" if not errors else "FAIL")
for e in errors: print(e,file=sys.stderr)
sys.exit(bool(errors))
