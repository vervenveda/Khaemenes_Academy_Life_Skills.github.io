#!/usr/bin/env python3
"""Static learner-journey contract audit; browser tests remain necessary."""
from pathlib import Path
import json
import sys

root = Path(__file__).resolve().parents[1] / "courses" / "kindergarten"
pages = sorted(root.glob("*/week-*/index.html"))
checks = {
    "five_lesson_practices": lambda s: 'Array(5).fill(false)' in s,
    "quiz_bank": lambda s: 'const bank=' in s,
    "five_question_quiz": lambda s: '.slice(0,5)' in s,
    "mastery_80_percent": lambda s: 'score>=80' in s,
    "persistent_save": lambda s: 'localStorage.setItem(prefix+code' in s,
    "storage_failure_notice": lambda s: 'Device storage is unavailable' in s,
    "print_action": lambda s: 'window.print()' in s,
    "json_export": lambda s: 'JSON.stringify({course:' in s,
    "learner_specific_import": lambda s: 'incoming.learnerCode!==id' in s,
}
results = []
for page in pages:
    source = page.read_text(encoding="utf-8")
    state = {name: check(source) for name, check in checks.items()}
    if page.parent.name != "week-01":
        state["prior_week_gate"] = "function priorReady(" in source and "priorReady(next)" in source
    results.append({"page": str(page.relative_to(root)), "checks": state})
print(json.dumps({"pages": len(pages), "results": results}, indent=2))
failed = [(item["page"], name) for item in results for name, ok in item["checks"].items() if not ok]
print(f"Learner journey source audit: {len(pages)} pages, {len(failed)} failed checks.", file=sys.stderr)
for path, name in failed:
    print(f"FAIL {path}: {name}", file=sys.stderr)
sys.exit(bool(failed) or len(pages) != 24)
