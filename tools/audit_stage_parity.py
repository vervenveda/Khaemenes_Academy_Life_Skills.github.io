#!/usr/bin/env python3
"""Report cross-pathway stage parity without pretending incomplete stages are complete."""
from __future__ import annotations
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/"docs"/"life-skills-route-manifest.json").read_text(encoding="utf-8"))

def has_index(path:Path)->bool:
    return (path/"index.html").is_file()

def grade_count(base:Path,prefix:str,numbers:list[int])->int:
    return sum(has_index(base/f"{prefix}{n}") for n in numbers)

rows=[]
for item in manifest["pathways"]:
    slug=item["slug"]
    base=ROOT/"courses"/slug
    preschool=all(has_index(base/"preschool"/f"week-0{w}") for w in (1,2,3))
    kindergarten=item["kindergarten"]["status"]
    elementary=grade_count(base/"elementary","grade-",[1,2,3,4,5])
    middle=grade_count(base/"middle","grade-",[6,7,8])
    high=grade_count(base/"high","grade-",[9,10,11,12])
    higher=has_index(base/"higher")
    rows.append({
      "slug":slug,"title":item["title"],
      "preschool":"dedicated" if preschool else "incomplete",
      "kindergarten":kindergarten,
      "elementaryGrades":elementary,
      "middleGrades":middle,
      "highSchoolGrades":high,
      "higherLearning":higher
    })

culinary=next(row for row in rows if row["slug"]=="culinary-independence")
expected={"elementaryGrades":5,"middleGrades":3,"highSchoolGrades":4,"higherLearning":True}
for key,value in expected.items():
    if culinary[key]!=value:
        raise SystemExit(f"FAIL: Culinary vertical reference regressed at {key}: {culinary[key]!r} != {value!r}")

if sum(row["preschool"]=="dedicated" for row in rows)!=16:
    raise SystemExit("FAIL: Preschool parity fell below 16 dedicated pathways")
if sum(row["kindergarten"]=="dedicated" for row in rows)!=8:
    raise SystemExit("FAIL: Kindergarten dedicated-pathway baseline fell below 8")

summary={
  "status":"PASS",
  "policy":"Inventory is descriptive outside protected baselines; incomplete later stages are not failures.",
  "protectedBaselines":{
    "preschoolDedicated":16,
    "kindergartenDedicated":8,
    "culinaryVertical":{"elementaryGrades":5,"middleGrades":3,"highSchoolGrades":4,"higherLearning":True}
  },
  "nextExpansionGate":"Finish Preschool/Kindergarten browser certification, then complete the remaining eight Kindergarten pathways before starting a new Grade 1 vertical.",
  "recommendedNextVertical":"home-management",
  "pathways":rows
}
print(json.dumps(summary,indent=2))
