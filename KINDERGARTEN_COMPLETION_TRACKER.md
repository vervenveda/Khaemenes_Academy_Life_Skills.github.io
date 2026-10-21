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
