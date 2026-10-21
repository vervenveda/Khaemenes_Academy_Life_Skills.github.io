#!/usr/bin/env python3
"""Static source contracts for the Grade 1 Culinary three-week journey."""
from pathlib import Path
import json
import re
import sys
root=Path(__file__).resolve().parents[1]/"courses/culinary-independence/elementary/grade-1"
results=[]
for week in range(1,4):
    page=root/f"week-{week:02d}"/"index.html"
    if not page.exists():
        results.append({"week":week,"checks":{"page_exists":False}})
        continue
    s=page.read_text(encoding="utf-8")
    expected=f"Grade 1 Culinary Arts Week {week:02d}"
    checks={
        "title_and_export_match": f'course:"{expected}"' in s and f'incoming.course!=="{expected}"' in s,
        "learner_key":f'key="khae-culinary-grade1-week{week:02d}-"' in s,
        "five_lessons": 'Array(5).fill(false)' in s and 'lessons=[' in s,
        "quiz_80_percent": 'score>=80' in s and 'slice(0,5)' in s,
        "caregiver_review": 'state.review' in s and 'state.adult' in s,
        "local_storage": 'localStorage.setItem(key+code' in s,
        "autosave": '"days").addEventListener("change"' in s,
        "print": 'window.print()' in s,
        "portfolio_export": '"export").onclick' in s,
        "guarded_restore": 'restoreSignature' in s and 'incoming.learnerCode!==code' in s,
        "mastery_garden": 'Mastery earned!' in s,
    }
    if week>1:
        checks["prior_week_gate"]=f'priorKey="khae-culinary-grade1-week{week-1:02d}-"' in s and 'priorReady(id)' in s and 'a.score>=80' in s
    results.append({"week":week,"checks":checks})
print(json.dumps(results,indent=2))
fail=[(r["week"],k) for r in results for k,v in r["checks"].items() if not v]
for w,k in fail:print(f"FAIL Week {w}: {k}",file=sys.stderr)
print(f"Grade 1 Culinary source audit: {len(results)} weeks, {len(fail)} failed checks",file=sys.stderr)
sys.exit(bool(fail))
