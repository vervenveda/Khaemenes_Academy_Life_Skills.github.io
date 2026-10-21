#!/usr/bin/env python3
"""Read-only audit of Kindergarten portfolio import identity checks."""
from pathlib import Path
import json
import re
import sys

root = Path(__file__).resolve().parents[1] / "courses" / "kindergarten"
results = []
for page in sorted(root.glob("*/week-*/index.html")):
    source = page.read_text(encoding="utf-8")
    has_import = 'id="restore-go"' in source
    weak = '!incoming.course.toLowerCase().includes(' in source
    exact = 'incoming.course!==("Kindergarten "' in source
    preview = "previewSignature" in source
    confirmation = "window.confirm" in source
    quiz_reset = "attempts:[]" in source
    local_save = "localStorage.setItem(keyBase+id" in source
    learner = "incoming.learnerCode!==id" in source
    results.append({
        "path": str(page.relative_to(root.parent.parent)),
        "import": has_import,
        "weak_course_check": weak,
        "exact_course_check": exact,
        "learner_check": learner,
        "preview": preview,
        "confirmation": confirmation,
        "quiz_attempts_reset_on_import": quiz_reset,
        "local_import_save": local_save,
    })
print(json.dumps(results, indent=2))
problems = [r["path"] for r in results if not (r["import"] and r["exact_course_check"] and r["learner_check"] and r["preview"] and r["confirmation"] and r["quiz_attempts_reset_on_import"] and r["local_import_save"]) or r["weak_course_check"]]
print(f"Import identity audit: {len(results)} pages, {len(problems)} needing attention.", file=sys.stderr)
sys.exit(bool(problems))
