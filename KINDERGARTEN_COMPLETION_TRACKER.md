# Khaemenes Academy — Kindergarten Life Skills Implementation Tracker

Updated: 2026-10-20 · Branch: main

## Grade-level status
- Kindergarten gateway: 16 accessible subject pathways, brighter Comic Sans cards, large icons, search and surprise feature.
- Culinary Independence: three weekly classroom HTML files and a standalone subject hub.
- Other 15 Kindergarten subjects: pathway cards and clearly labelled Preschool *review* links only; dedicated Kindergarten lessons not yet built.

## Culinary Independence (Weeks 01–03)
- 15 original Kindergarten daily lessons: kitchen safety, handwashing, food sorting, counting, picture recipes, family food stories, fractions/halves, cooperation and a final safe project.
- 45 questions in three independent 15-question banks; five shuffled per attempt; 80% threshold (4/5).
- Separated grade records in `khae.life.culinary.kindergarten.week01.v1.`, `week02.v1.`, `week03.v1.`; never reuses Preschool record keys.
- Weeks 02/03 require the prior week's five completed practices, caregiver review with name, and a legitimate 80% result with five unique questions and matching correct answers. Previous-week gate functions tested on synthetic passing, altered-score and no-review records in a JS runtime for each week; all checked examples behaved as expected.
- Print identification, JSON export and paper activities provided; 255px, rendered PDF, offline reloading and keyboard/screen-reader journeys still need real-browser verification.

## Next certification repairs
1. Run full-browser end-to-end progression, data corruption and cross-learner isolation tests; verify save/export/print and assess whether quiz attempts persist when storage is disabled.
2. Provide richer original hands-on (paper-first) picture sequencing, pretend measuring and recipe-building games without mandatory outside services.
3. Extend the three-week, independently assessed model to the 15 remaining Kindergarten Life Skills subjects, ensuring age progression and no unearned mastery equivalence.

## 2026-10-20 Original interactive Culinary practice lab
- Added original optional picture sequencing, pretend scoop counting (1–6), and three-step ingredient/recipe picture planning to Kindergarten Culinary Weeks 01–03. All work with plain HTML/CSS/JS and require no services or purchases.
- Sequencing presents four intentionally mixed cards and requires safe order, provides retry/reset; measuring uses range and accessible buttons/output; recipe builder offers pretend food and counts with a printable adult-guided plan. Interactive play does not alter formal quiz attempts or mastery status.
- Re-fetched all 3 main-branch weekly HTML pages: all have 5 lessons, 3 practice cards, 15 formal quiz questions, unique HTML IDs and valid JavaScript syntax. Browser interaction, small-screen layout, pop-up print, offline and keyboard validation remain pending.

## 2026-10-20 Week-progressive Culinary games
- Week 01 remains guided picture sequencing, pretend scoop counting, and safe recipe picture practice.
- Week 02 upgraded to independent four-step sequencing, one-to-four whole paper circles compared with halves, and two-bowl pretend ingredient quantity comparisons.
- Week 03 upgraded to six-item adult-vs-child safety roles, a five-step final recipe showcase plan with printable reflection, and recipe safety revision decisions.
- All game activities remain optional and separate from 15-question weekly banks and storage/mastery gates.
- Re-fetched all three pages: 5 lessons, 15 assessment questions, 3 play cards, no duplicate HTML IDs and parsable scripts per file. Actual cross-browser gameplay, print popup and 255px usability checks still pending.

## 2026-10-20 Kindergarten Home Management launch and Culinary check
- Audited Culinary weeks 01–03 from committed source: 5 lessons and 15 unique formal questions each, three optional play cards in each week, and prior-week gate presence in Weeks 02–03. Actual browser/game acceptance remains unverified.
- Created Kindergarten Home Management subject hub and 3 independent weekly classrooms (15 original daily lessons, 45 topic-specific bank questions, optional safe-home helper mini-game, separate Kindergarten home-management localStorage namespaces, caregiver review, printable evidence and JSON export).
- Repaired Week 03 priorPrefix to read Week 02 (not itself) and corrected week-specific page titles. Verified Week 02 and Week 03 actual prerequisite function with synthetic valid and missing-review records: valid PASS and missing-review DENIED. Retained five-question / 80% score behavior.
- Updated Kindergarten gateway Home Management card to open course hub and retain optional Preschool review. Source-level checks passed; interactive browser, accessibility, printed evidence and 255px QA pending.
