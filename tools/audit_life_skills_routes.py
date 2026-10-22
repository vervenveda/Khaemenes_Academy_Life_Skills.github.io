#!/usr/bin/env python3
"""Validate the canonical Life Skills route/stage manifest against the repository tree."""
from __future__ import annotations
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
MANIFEST=ROOT/"docs"/"life-skills-route-manifest.json"

def fail(message:str)->None:
    raise SystemExit("FAIL: "+message)

data=json.loads(MANIFEST.read_text(encoding="utf-8"))
if data.get("schema")!="khaemenes-life-skills-route-manifest-v1":
    fail("unexpected manifest schema")
paths=data.get("pathways")
if not isinstance(paths,list) or len(paths)!=16:
    fail("manifest must contain exactly 16 pathways")
slugs=[item.get("slug") for item in paths]
if len(set(slugs))!=16 or any(not slug for slug in slugs):
    fail("pathway slugs must be unique and non-empty")

dedicated=review=0
for item in paths:
    slug=item["slug"]
    preschool=item.get("preschool",{})
    if preschool.get("status")!="dedicated":
        fail(f"{slug}: Preschool must be dedicated")
    pdir=ROOT/preschool["route"]
    if not (pdir/"index.html").is_file():
        fail(f"{slug}: missing Preschool index at {pdir}")
    for week in preschool.get("weeks",[]):
        if not (pdir/week/"index.html").is_file():
            fail(f"{slug}: missing Preschool {week}")

    kindergarten=item.get("kindergarten",{})
    status=kindergarten.get("status")
    if status=="dedicated":
        dedicated+=1
        kdir=ROOT/kindergarten["route"]
        if not (kdir/"index.html").is_file():
            fail(f"{slug}: missing dedicated Kindergarten index")
        for week in kindergarten.get("weeks",[]):
            if not (kdir/week/"index.html").is_file():
                fail(f"{slug}: missing dedicated Kindergarten {week}")
        review_path=ROOT/kindergarten["reviewRoute"]
        if not (review_path/"index.html").is_file():
            fail(f"{slug}: missing Preschool review route")
    elif status=="foundation-review":
        review+=1
        review_path=ROOT/kindergarten["route"]
        if not (review_path/"index.html").is_file():
            fail(f"{slug}: foundation-review route does not resolve")
        expected=f"courses/kindergarten/{slug}/"
        if kindergarten.get("futureDedicatedRoute")!=expected:
            fail(f"{slug}: future dedicated Kindergarten route must remain {expected}")
    else:
        fail(f"{slug}: invalid Kindergarten status {status!r}")

if (dedicated,review)!=(8,8):
    fail(f"Kindergarten release must report 8 dedicated / 8 foundation-review; got {dedicated}/{review}")

print(json.dumps({
    "status":"PASS",
    "schema":data["schema"],
    "pathways":len(paths),
    "preschool":{"dedicated":16},
    "kindergarten":{"dedicated":dedicated,"foundationReview":review},
    "routePolicy":data["policy"]
},indent=2))
