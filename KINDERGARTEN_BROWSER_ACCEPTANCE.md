# Kindergarten Life Skills — Browser Acceptance Checklist

Scope: all 8 Kindergarten courses, Weeks 01–03 (24 weekly pages).

**Do not mark browser certification passed based on source syntax or Pages deployment.**
Test Chrome/Firefox or Safari with a new learner code and a second existing learner code. Preserve real learner files before testing.

## Bubble 1: Record recovery
- Export a valid weekly record, reopen the same learner and select that JSON; first click must display a preview and must leave localStorage untouched.
- Preview explicitly lists completed lessons, note count, caregiver review, and reset of quiz attempts.
- Change selected file after preview; confirmation must require a new preview.
- Reject an incorrect subject, week, learner, invalid JSON and oversized file; original progress must remain unchanged.
- Select Import twice, then cancel either confirmation: original local record must remain intact.
- Confirm import of a matching file only after exporting a separate backup. Check restored lesson flags, notes and adult review, and check quiz attempts are reset. Reopen and take quiz to restore mastery.
- Test localStorage denial/quota and reload paths; report error without claiming success.

## Bubble 2: Learning games
- Verify each game's prompt, controls and announced feedback; optional practice must not advance required mastery.
- New choice studios in Health, Finance, Sustainability and Emergency: all three answers should have usable feedback, keyboard Enter/Space must operate button, select option must be accessible.
- Remaining gap: design more varied progressive subject-specific challenges beyond the new decision studio.

## Bubble 3: 255px accessibility
- Use actual browser devtools viewport **255 CSS px** and heights 568, 812; check no horizontal scrolling, clipped words, overlapping cards or buttons, and focus visible at every step.
- Test keyboard Tab / Shift+Tab, Enter/Space, and arrow keys for sliders/selects; focus must follow visual reading order and never become trapped.
- Touch targets should be comfortably separated and large; browser zoom to 200%, high contrast, and reduced-motion accessibility.
- Confirm screen-reader announcements for quiz outcome, validation messages, safe-choice feedback, import preview, and refusal notices.
- Verify caregiver inputs have discernible labels; printed student/date/grade/unit/lesson headings are clear.

## Bubble 4: End-to-end student journey
- New learner code, save five lesson checks and notes, refresh. Check values persist in correct learner namespace.
- Take five-question quizzes repeatedly and confirm randomization, distinct prompts, accurate scoring. 0–60% must not unlock next week; 80–100% requires completed lessons and caregiver review.
- Change caregiver review and confirm save. Attempt Week 2 before Week 1 mastery: deny. Attempt Week 3 before Week 2 mastery: deny.
- Retest after importing a record (quizzes reset); do not lose existing records when learner code changes.
- Export/print, then close/reopen page; check portfolio includes notes, project lines and readable Academy identification.

## Bubble 5: Deployment/offline certification (tentative; original fifth bubble was not supplied)
- Confirm latest main branch SHA against the final successful GitHub Pages workflow SHA.
- Load a week over network, save as a standalone HTML file, disconnect network, reopen, complete optional practice, quiz and local JSON export.
- Confirm no third-party network requests, and explicitly distinguish reopening a locally saved HTML file from offline availability of a live URL without a service worker.
- Do not claim full offline support until tested on target desktop, tablet and mobile devices.

Record date, browser/version, platform, viewport, tested subject/week, learner-code alias (never learner's real identifying data), result, screenshot if appropriate, and defect/commit reference.


## Automated Chromium companion
The workflow `.github/workflows/early-learning-browser-acceptance.yml` now automates 255px viewport checks, keyboard-focus progression, status/live-region contracts, learner persistence/switching, corrupted-storage refusal, 80% gates, JSON export/import preview behavior, representative game/dialog interaction, PDF generation and standalone local-file reopening. See `docs/EARLY_LEARNING_BROWSER_CERTIFICATION.md`.

This checklist remains authoritative for human-only acceptance items such as actual assistive-technology speech and visual PDF inspection. A green Chromium workflow must not be described as full screen-reader or device certification.
