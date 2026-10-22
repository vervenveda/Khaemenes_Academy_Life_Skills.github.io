# Early Learning Browser Certification

This repository now runs automated Chromium acceptance for all dedicated Preschool and Kindergarten weekly pages listed by `docs/life-skills-route-manifest.json`.

## Automated in CI
- actual 255 CSS px viewports at 568px and 812px heights
- horizontal-overflow checks
- keyboard focus progression
- discernible control-name checks
- status/live-region presence
- browser page/console error collection
- Kindergarten learner persistence, switching and corrupted-storage refusal
- Kindergarten JSON export and preview-before-import replacement
- quiz-attempt reset after Kindergarten import
- wrong-score rejection and 80% predecessor unlock in Kindergarten
- wrong-score rejection and 80% predecessor unlock in Preschool
- representative learning-game/dialog feedback
- Chromium PDF generation
- standalone `file://` reopening for one Preschool and one Kindergarten weekly page

## Still requires human assistive-technology/device certification
Automated Chromium does **not** prove the words actually spoken by NVDA, JAWS, VoiceOver or TalkBack, the visual quality of printed/PDF evidence, or install/offline behavior on every target phone/tablet/desktop browser. Those items remain manual acceptance gates and must not be represented as certified merely because CI passes.

The machine-readable run artifact is `early-learning-browser-acceptance.json`.
