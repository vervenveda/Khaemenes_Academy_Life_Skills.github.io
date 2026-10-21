# Kindergarten learner-journey audit — 2026-10-21

Scope: 24 weekly classrooms across eight Life Skills subjects. Source-level inspection with representative Week 1, 2, and 3 samples; not a real-browser certification.

## Verified in source
- Weekly classrooms have five lesson practice checks, notes, caregiver review and a five-question randomized knowledge quiz drawn from a fifteen-question bank.
- Quiz scores are calculated in 20-point increments; four correct answers produce the 80% mastery threshold.
- Week 2 onward checks the preceding week's same-learner record for all five completed practices, caregiver review, caregiver name, and a validated >=80% quiz attempt before opening.
- Learner records use localStorage; save failures display a storage warning. Printable view and JSON export exist in sampled classrooms.
- Import identity is checked against the exported course title, with learner-code matching, preview, confirmation, and quiz-attempt reset. Required source audit and Pages deployment passed at commit 4c7556e1.

## Learner-journey bubbles to address
1. **Browser-level certification missing (high).** Run an actual browser journey from fresh learner -> complete five lessons -> fail quiz -> retry/pass -> caregiver review -> next week. Repeat for a second learner, reload, print, export, cancel import, and valid restore. No real-browser result is asserted here.
2. **Progression feedback is mostly text (medium).** Sampled progress UI reports lesson count, best score, and review status but lacks a clear earned milestone or celebratory transition tied to verified mastery. Reward only authentic achievements; do not let optional games grant assessment credit.
3. **Assessment challenge calibration (medium).** A fifteen-question bank sampled five at a time and a four-of-five passing threshold may permit repeated memorization. Add mixed application and reasoning prompts, varied answer positions, and review feedback without punitive lockouts; retain accessible retries.
4. **Print/export fidelity (medium).** Source contains print and JSON export, but needs browser verification for 255px screens, page breaks, readable academic headings, student/date/grade/unit/lesson fields, and preservation of notes and caregiver evidence.
5. **Storage and identity resilience (high).** Test corrupt JSON, disabled/full storage, device changes, learner switches with unsaved edits, and restoration of the correct learner's practice record. Never silently overwrite or cross-load learner records.
6. **Navigation clarity (medium).** Verify students can tell why a later week is locked, what exactly is needed next, and how to return to a lesson without losing progress.

## Recommended acceptance scenarios
A. Fresh learner cannot enter Week 2. Completing five practices alone does not unlock it.
B. A 60% quiz score does not unlock it; an 80% score plus caregiver review does.
C. A different learner code cannot inherit mastery from the first.
D. Reload retains progress; a corrupt record does not get silently replaced.
E. Wrong-learner/wrong-week import is rejected; cancellation leaves the old record unchanged; valid import resets quiz attempts and requires new mastery.
F. Printable portfolio remains readable on mobile and paper, including learner identity and learning evidence.
G. Games reward practice without bypassing formal mastery.

## Definition of release-quality
Pass all scenarios A–G in an actual browser on mobile-width and desktop layouts, with a reproducible test log and no broken lesson or navigation links. Until then, status is **source audit passed; learner-journey runtime pending**.
