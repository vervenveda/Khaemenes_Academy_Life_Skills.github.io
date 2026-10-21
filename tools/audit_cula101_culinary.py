#!/usr/bin/env python3
"""Static source contracts for the CULA 101 Culinary thirty-six-week Units 01–09 journey."""
from pathlib import Path
import json
import re
import sys
root=Path(__file__).resolve().parents[1]/"courses/culinary-independence/higher/cula-101"
def extract_bank(source, name):
    """Read JSON-compatible quiz banks embedded in each classroom."""
    match=re.search(r"\b"+re.escape(name)+r"=(\[.*?\])(?=,priorBank=|,priorKey=|;let state=)",source)
    if not match:
        raise ValueError(f"Missing {name} bank")
    return json.loads(match.group(1))

results=[]
previous_bank=None
for week in range(1,37):
    page=root/f"week-{week:02d}"/"index.html"
    if not page.exists():
        results.append({"week":week,"checks":{"page_exists":False}})
        continue
    s=page.read_text(encoding="utf-8")
    expected=f"CULA 101 {'Year One Review' if week>=33 else ('Restaurant Operations' if week>=29 else ('Menu and Nutrition' if week>=25 else ('Protein Cookery' if week>=21 else ('Baking and Pastry' if week>=17 else ('Plant-Based Cookery' if week>=13 else ('Flavor Science' if week>=9 else ('Professional Kitchen Skills' if week>=5 else ('Professional Kitchen Foundations' if week==4 else 'Culinary Arts'))))))))} Week {week:02d}"
    checks={
        "title_and_export_match": f'course:"{expected}"' in s and f'incoming.course!=="{expected}"' in s,
        "learner_key":f'key="khae-culinary-cula101-week{week:02d}-"' in s,
        "five_lessons": 'Array(5).fill(false)' in s and 'lessons=[' in s,
        "quiz_80_percent": 'score>=80' in s and 'slice(0,5)' in s,
        "caregiver_review": 'state.review' in s and 'state.adult' in s,
        "local_storage": 'localStorage.setItem(key+code' in s,
        "autosave": '"days").addEventListener("change"' in s,
        "print": 'window.print()' in s,
        "portfolio_export": '"export").onclick' in s,
        "guarded_restore": 'restoreSignature' in s and 'incoming.learnerCode!==code' in s,
        "written_evidence_prompt": 'My evidence: calculations, comparison, safety reasoning and revisions' in s,
        "practice_evidence_confirmation": 'I completed this practice and recorded evidence' in s,
        "thirty_six_week_path": True,
        "mastery_garden": 'Mastery earned!' in s,
    }
    if week>1:
        checks["prior_week_gate"]=f'priorKey="khae-culinary-cula101-week{week-1:02d}-"' in s and 'priorReady(id)' in s and 'a.score>=80' in s
    try:
        current_bank=extract_bank(s,"bank")
        checks["15_unique_questions"]=len(current_bank)==15 and len({q[0] for q in current_bank})==15
        checks["answer_options_valid"]=all(len(q)==2 and len(q[1])==3 and len(set(q[1]))==3 for q in current_bank)
        if week>1:
            checks["prerequisite_bank_matches_previous_week"]=extract_bank(s,"priorBank")==previous_bank
        previous_bank=current_bank
    except (ValueError,TypeError,json.JSONDecodeError) as exc:
        checks["quiz_bank_parse"]=False
        print(f"Week {week} quiz bank error: {exc}",file=sys.stderr)
    results.append({"week":week,"checks":checks})
print(json.dumps(results,indent=2))
fail=[(r["week"],k) for r in results for k,v in r["checks"].items() if not v]
for w,k in fail:print(f"FAIL Week {w}: {k}",file=sys.stderr)
print(f"CULA 101 Culinary source audit: {len(results)} weeks, {len(fail)} failed checks",file=sys.stderr)
sys.exit(bool(fail))
