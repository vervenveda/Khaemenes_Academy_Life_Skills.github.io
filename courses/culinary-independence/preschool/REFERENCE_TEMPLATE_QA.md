# Khaemenes Academy · Culinary Preschool Reference Template & QA

**Status:** implementation reference under verification, not an accredited course or proof of completed browser testing.
**Scope:** Preschool Culinary portal, Weeks 01–03, Culinary Play Lab, and future Grade 1+ Life Skills implementations.

## Standard learner journey
1. Open the course campus; find navigation, three weeks, an optional play lab, and accessible learner instructions.
2. Explore low-stakes illustrations and educational games without substituting game progress for assessed knowledge.
3. Choose a private learner code; create a separated device-local record (no verified identity or shared cloud synchronization).
4. Work through five daily lessons per week, each with full reading, progressive step popup, supervised activity, print evidence, reflection and practice sticker.
5. Take reviewed, randomized knowledge checks with required **≥80%**, record dated practice and receive independently documented practical/caregiver review.
6. At the final project, collect evidence from all 15 lessons and independent reviewer signoff. Do not issue a certificate on the basis of scores/stickers alone.

## Interactive card and button contract
- All visible buttons must have a meaningful action, visible feedback and keyboard access. Nonworking cards must not be styled as active controls.
- Popups require a heading, clearly labeled steps, Back/Next/Close, Escape support, focus return and accessible focus containment.
- Every course has a clear breadcrumb to Academy > learner age campus > Life Skills > subject > course week.
- Games must be original no-grade practice (e.g., counting scoops, food color matching, mixing pretend pigment colors, sorting), with new-round/retry/reset actions and no real-food hazards.
- At narrow 255px width, prevent clipping, preserve 44px minimum touch targets, and allow labels and nav to wrap.

## Verified existing Preschool app paths (repository tree only)
- `apps/Life_skills_kitchen_helper_index.html`
- `apps/Life_Skills_kitchen_ resipes_index.html` (URL must encode the space)
- `apps/Art_color_mixing_index.html`
- `apps/Art_match_colors_index.html`
- `apps/numbers_1-12_fun_index.html`
- `apps/shapes_match_index.html`

The Culinary Play Lab links to these canonical Academy source pages. Source-file existence does **not** prove live URLs or in-browser compatibility; review click-through on deployed site.

## Mastery integrity and limitations
- Current week pages perform **local** prerequisite checks; these are not remotely authenticated and localStorage can be edited.
- Weeks 02 and 03 depend on previous weeks' locally saved evidence. A manual browser test must confirm the correct learner cannot bypass prereqs by choosing another alias, and confirm unexpected, empty, corrupted and partially saved records fail closed.
- Local randomized banks are small (10 questions per 5-question quiz) and need a larger teacher-reviewed item pool before high-stakes deployment; answer integrity and local tamper controls need further hardening.
- Preserve practice, knowledge mastery, observed skill safety, and portfolio review as distinct status values.
- Save changes before switching learners; provide printable/exportable evidence without leaking student names publicly.

## Grade 1 and other subjects: migration recipe
1. Reuse the route and visual hierarchy; change the stage label, age language and skill progression.
2. Replace preschool picture-only activities with Grade 1 counting/measurement, basic reading, sequencing, observation notes and beginning word problems.
3. Carry forward offline-first HTML/CSS/JS; avoid paid dependencies or ads.
4. Reuse the graphic + four-step dialog pattern, but create one subject-meaningful final-result graphic per lesson.
5. Reuse the print page skeleton with Academy heading, stage, unit, lesson, learner and date.
6. Build domain-specific safety and privacy review; never reuse unrelated quiz questions.
7. Run end-to-end tests on phone, 255px window, tablet and desktop; test screen reader/keyboard, refresh/localStorage, error and offline cases.

## Remaining release blockers / acceptance tests
- [ ] Browser-confirm every breadcrumb and external app link on deployed pages
- [ ] Keyboard tab cycle and Escape for all modal dialogs
- [ ] Wrong-answer scoring, score snapshot validation, reattempts and learner-switch cases
- [ ] Verify exact Week 1 -> Week 2 -> Week 3 progression separately per learner, including corrupted evidence
- [ ] Demonstrate the full activity with a preschool caregiver and validate choking/allergy safeguards
- [ ] Print one complete per-day record with visible lesson objectives, name, date and reviewer
- [ ] Verify completed practice games do not alter knowledge mastery or certificates
- [ ] Expand randomized reviewed assessment bank and add course-level portfolio verification

**No claim of browser QA, external-link reachability, or certification readiness is made by this document.**

## Hardening verification · 2026-10-20
- Inspected Week 01–03 JavaScript source; all three inline scripts parsed successfully before edits.
- Hardened Week 02 and Week 03 record-switch workflow: an invalid or prerequisite-blocked candidate now restores the active learner code rather than leaving the input showing one learner while another learner's details remain displayed.
- Week 02 and Week 03 now save changed daily dates, observation notes, family reflection, reviewer name and practical-review checkbox to device storage on field change; existing explicit Save, Print and Export remain available.
- Preserved the existing locally checked prerequisite structure and ≥80% scored gates; neither is server-verified, and the current ten-question banks are too small for high-stakes certification.
- **Remaining QA:** manual real-device checks of 255px wrapping, keyboard dialog focus, printed five-day packets, data persistence on abrupt reload, and deployed external resource links. An intentional offline/clear-storage test must not be mistaken for mastery evidence.
- **Template migration requirement:** when adapting to First Grade, keep safe age progression, learner-separated storage and independent practical approval; do not copy preschool assessment difficulty into a higher grade.
