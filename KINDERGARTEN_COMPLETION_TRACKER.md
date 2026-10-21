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

## 2026-10-20 Kindergarten Gardening & Food Growing — third pathway
- Created original Kindergarten Gardening hub and three weekly pages, with 15 daily lessons, 45 subject-specific question prompts across three 15-item randomized banks, five-question/80% grading, caregiver review, separate Kindergarten Gardening localStorage keys, JSON export and print evidence.
- Curriculum progression: W01 seeds/plant parts/light/water/counting/picture garden; W02 five-day observations/light/shade/water decisions/animals/garden map; W03 safe planning/counting/calendar/revision/showcase. Includes simple optional picture-count and garden safety-choice interactions (not formal mastery).
- Linked Kindergarten grade gateway course card, leaving Preschool foundational review clearly optional.
- Fixed initial Week 03 self-prerequisite reference; actual Week 02/03 gate functions subsequently checked against synthetic passed, forged-score and missing-caregiver-review records; all test expectations held. Re-fetched weekly files, confirmed 5 daily sections and 15 unique question prompts each with JavaScript syntax passes.
- Interactive browser, offline, 255px device, screen-reader, exported JSON and print-layout acceptance remain open. No claim of production certification.

## 2026-10-20 Fourth Kindergarten pathway — Creativity, Arts & Making
- Added independent Kindergarten Creativity hub and Weeks 01–03 with 15 original art lessons and three independent 15-question banks, randomized five-question 80% mastery, caregiver review, portfolio print and JSON export using distinct `khae.life.creativity-arts-making.kindergarten.weekNN.v1.` records.
- Lessons span safe color exploration, shapes, simple and complex patterns, texture, paper models, visual storytelling, accessibility, reflection and final gallery.
- Three optional client-side practice cards per week: pretend color mixing, pattern building (AB/AAB/ABB), and a gallery-label maker. These are not quiz or graduation credit.
- Re-fetched all three week files: 5 lessons, 15 unique weekly prompts and 3 game cards each; both Week 02/03 actual prior-week validators permitted synthetic genuine passing learner records and denied missing caregiver review. Week 03 priorPrefix correctly targets Week 02.
- Kindergarten landing card now links to grade-specific Creativity hub; Preschool creative lessons remain optional review. Real browser, print output, 255px, game functional and assistive technology acceptance pending.

## 2026-10-20 Kindergarten forensic workflow and navigation audit
- GitHub Actions Pages run #39536481417 completed **success** for commit `4f27e251`, confirming that the earlier Creativity updates were processed by the deployment workflow. Subsequent audit repair commits require their own successful run before claiming they are deployed.
- **Bubble 1 (repaired):** Culinary Week 02's `priorPrefix` incorrectly pointed to its own Week 02 data, blocking the proper Week 01 → Week 02 progression. Updated it to Week 01.
- **Bubble 2 (repaired):** Home Management, Gardening and Creativity Kindergarten course hubs linked optional Preschool review to non-existent `<slug>-independence` directories. Corrected all three relative URLs.
- **Bubble 3 (source tests passed, browser pending):** Ran 40 direct-source regression assertions covering valid prior results, missing caregiver approval, corrupted learner JSON, correct predecessor week and distinct week record namespaces across all eight Weeks 02/03 from four Kindergarten courses. All assertions passed; no real-browser journeys performed.
- **Bubble 4 (open):** Games and small-screen/keyboard interactions still lack hands-on browser acceptance. Validate all 12 Kindergarten weekly pages, especially 255px layout, focus, quiz radio groups, offline behavior, game feedback and print pop-ups.
- **Bubble 5 (open):** Printed learner evidence, JSON export/import portability and deployment-to-live URL content have not been verified end to end; perform rendered/PDF checks and confirm live pages after current main deployment completes. Existing export-only workflows must not be called cross-device import features.

## 2026-10-20 Kindergarten functional/accessibility hardening pass
- Scope: all 12 weekly HTML classrooms across Culinary, Home Management, Gardening and Creativity on main.
- **Repaired:** printable learner text was omitted because textareas were hidden by print CSS. Added print-only synchronized learner-note evidence under each daily lesson, preserving blank writable lines when empty.
- **Repaired:** lesson checkboxes, learner note changes, caregiver-name changes and approval changes now initiate local save in all 12 files (explicit Save remains available). Print triggers a final note sync.
- **Source validation:** all 12 upgraded HTML files re-fetched; each contains print evidence extension and JS parsed without syntax errors.
- **Still open:** actual live deployed browser keyboard/screen-reader inspection, 255px horizontal overflow testing, popup-print accessibility, offline behavior and full end-to-end progression/portfolio QA. The environment could not connect to live vervenveda.com during this pass; no visual/browser success claimed.
- **Potential follow-up:** consider replacing popup-based recipe printing with an integrated printable project area, and add device-level export/import and full browser regression tests.

## 2026-10-20 Kindergarten recovery and practice-print hardening
- Added a weekly JSON restore control to all 12 Kindergarten classroom pages. Restore requires an open matching learner code, subject and week, validates five boolean practice flags, five short notes, caregiver fields and attempt-envelope shape, limits files to 250 kB, and asks before overwriting an existing local record.
- For safety, imported quiz attempts are deliberately reset (cannot assert mastery from an unverified JSON file); the learner must retake the local knowledge check. Original export remains unchanged. No data sent to servers.
- Added standardized printable optional-game/project evidence page area (learner, reflection lines, caregiver/date) to each classroom. Actual interactive project screenshots are **not** embedded; hand-written reflection space is provided instead.
- Re-fetched all 12 files and checked import markup, game-evidence print markup, and JavaScript syntax: 12/12 PASS.
- Open certification: live browser import testing, print layout, 255px responsiveness, offline storage and keyboard/screen-reader QA; verify Pages deployment for this final commit. Imported record trust (quiz deliberately reset) should be communicated to families.

## Fifth Kindergarten course — Health, First Aid & Wellbeing
- Added three Kindergarten Health and Wellbeing weekly classrooms (15 lessons, three 15-question quiz banks, local progress, caregiver review, print evidence, JSON export/import with imported quiz scores reset) and connected an independent three-week course hub to the Kindergarten gateway.
- Subject progression: healthy hygiene/rest/food/movement; feelings and trusted helpers, safe injury response and local emergency awareness; wellness project with boundaries, safe adult support and reflection. These are learning activities, never medical or first-aid certification.
- Verified five lessons and 15 question prompts each; Week 02 and 03 validators accept synthetic eligible records and reject records missing caregiver review. All three newly added scripts parse. Import/print and 255px real browser acceptance still pending.
- Deployment at pass start: latest previous portfolio commit `7c51bdbc` had GitHub Pages workflow in progress; new commits require their own deployment verification.

## Sixth pathway — Kindergarten Personal Finance (2026-10-20)
- Five-subject consistency audit: 15 existing weekly HTML classrooms checked for five lesson sections, 15 question records, source-valid JavaScript, note printing and matching JSON restore UI: 15/15 passed source checks.
- Created Personal Finance hub and Weeks 01–03: 15 lessons, separate weekly banks of 15 questions, paper-token counting activities, printable evidence, progress/assessment storage, caregiver review, autosave, JSON export/import.
- Week 01 needs/wants, pretend coins, counting, budget and pretend shop; Week 02 paper-token savings, addition/subtraction, choices, sharing and goal plans; Week 03 mock market, budget checks, accessible signage, revision and showcase. No real transactions or disclosure of financial information.
- Synthetic eligible Week 01->02 and Week 02->03 records passed actual prerequisite functions; missing caregiver review denied. Distinct personal-finance storage namespaces verified. Games/portfolio full browser and small-screen acceptance remains pending.
- Latest deployment sampled when audit began: `5afc6ef0` GitHub Pages workflow in progress; verify new Personal Finance commits separately before declaring deployed.
- QA debt: Personal Finance quiz distractors are generic placeholders and need a stronger pedagogical pass; existing HTML import records always reset quiz history as designed.

## Seventh subject — Sustainability & Stewardship
- Hardened all 45 Personal Finance quiz questions with subject-specific alternative answers and updated associated predecessor banks; preserves correct answers, learner storage and assessment thresholds.
- Built original Kindergarten Sustainability hub and Week 01–03 learning pages (15 lessons, 45 questions) covering water/reuse/sorting, nature/resource observations and a final planet-care picture project. Grade gateway links to new hub and keeps optional Preschool review.
- Caught and repaired initially flat quiz-choice array shape in all three Sustainability weekly pages before signoff. Re-fetched code now has 15 nested three-choice questions per week, valid JS, five lessons each. Week 02 and 03 gates accept synthetic passing records and reject missing caregiver review. Existing portfolio restore and print tools retained.
- Still pending: actual browser, print, assistive technology, offline and 255px testing; latest deployment of these specific commits not verified.

## Eighth pathway — Emergency Readiness & Resilience
- Created three-week Kindergarten Emergency Readiness subject hub, three weekly classrooms and gateway entry; Preschool review remains optional and separate.
- 15 age-appropriate lessons: hazard recognition, caregiver and trusted helpers, stop/move away/tell, weather awareness, local emergency number education without calls, safe plans, respectful calm practices, revision and portfolio.
- Three distinct 15-question banks, five questions per quiz, 80% mastery, independent local records, caregiver review, printable evidence and JSON recovery. No actual hazard exposure or independent emergency responder training.
- Re-fetched all three weeks and checked: 5 lessons, 15 questions with 3 answers, correct previous-week namespace, and presence of recovery tools. Week 02/03 validator allowed synthetic complete learner records and denied those missing caregiver review; no visual browser certification yet.
- Last checked deployment for prior main commit 801a7a7d was pending; newest emergency commits need separate deployment confirmation from the existing hourly watch.

## Halfway forensic audit — eight Kindergarten courses (2026-10-20)
- Source audited all 8 three-week courses (24 classroom HTML pages). Across the audited pages: five daily lesson sections and 15 formal question records per week, correct nested answer-choice format, JavaScript syntax success, visible JSON recovery and print-note code. Source-level checks only, not full device/browser certification.
- Audit code initially counted HTML ID snippets embedded in JavaScript strings as duplicate rendered IDs on Creativity Week 01; this was a false positive. Static document IDs should be checked after excluding scripts (all sampled static pages had unique IDs). No duplicate-ID repair necessary.
- **Repaired:** Inherited 'paper-based nature observations' description appeared in Health, Finance, Sustainability and Emergency classroom introductions; updated 12 weekly pages to subject-appropriate copy (Emergency W01 was already independently corrected).
- **Repaired:** Emergency Readiness pages inherited kitchen-competence warning and cooking hazard statement and W01 had a repeated 'My My My Trusted Helpers' heading; fixed across Emergency three weeks.
- **Open bubble 1 (high):** Other non-Culinary pages still contain inherited kitchen safety and 'real kitchen competence' boilerplate, potentially confusing learners. Audit and replace in all non-Culinary subjects.
- **Open bubble 2 (high):** Shallow lesson readings especially later courses (often about 60–80 words per day including form labels), requiring deeper differentiated instruction, examples, practice and caregiver guidance before academic sign-off.
- **Open bubble 3 (medium):** Learning games are uneven: Culinary 3 per week, Creativity 3, Gardening 2, many others only 1; add developmentally progressive subject-specific interactions, not merely copied token counters or single safe-choice buttons.
- **Open bubble 4 (high):** Conduct actual browser journey tests of 80% unlock, JSON round-trip, no data loss, print evidence, keyboard focus, narrow 255px layout and screen readers; source syntax alone does not certify runtime.
- **Open bubble 5 (medium):** Deployment acceptance and offline claims require live static-host checks, caching/reload tests and Pages workflow confirmation for most recent commit; a successful GitHub workflow is not proof of app functionality.
- Print and import progress remains child-local; no real purchases or emergency simulations. Keep all future repairs on main, preserve records/assessment keys.

## Halfway-audit Bubble 1 repaired — 2026-10-20
- Inspected 21 non-Culinary Kindergarten weekly classrooms (7 subjects × 3 weeks). Confirmed inherited cooking-specific warning and kitchen-competence description in Home Management, Gardening, Creativity, Health, Finance and Sustainability. Emergency had already had its warning corrected but retained repeated 'My My' titles in Weeks 02/03.
- Updated 18 non-Culinary pages with subject-specific learner safeguards and accurate knowledge-check language; cleaned repeated 'My' headings in the affected pages, including Emergency Weeks 02/03.
- Re-fetched all 21 classrooms after changes: all passed JS syntax parsing, retained 15-question banks, and no longer contained inherited 'real kitchen competence', the inherited kitchen warning, or repeated 'My My' course titles.
- Remaining priorities: expand lesson instructional depth, differentiated games, browser/keyboard/255px testing and deployed/offline verification. The work was committed to main; not yet certified in a browser.

## Halfway-audit Bubble 2 — Home Management curriculum depth
- Expanded every lesson in Home Management Weeks 01–03 (15 lessons total) with a worked real-life example, guided shared activity, independent picture-based challenge and inclusive caregiver teaching guidance.
- Instruction supports shared and temporary homes, differing routines, disability accommodations, child-safe activities, non-gendered roles and safe family support; no appliances or chemicals required.
- Re-fetched all three week files: exactly 5 instructional blocks and 5 original lessons per week, 15 intact assessment questions per week, visible portfolio restore/print-note code, no JavaScript parsing errors.
- Existing learner storage, progression, assessment logic and authored games were not changed. Full browser, offline, responsive and print-output acceptance remains pending.
- Next depth candidates: Gardening, Creativity and other age-appropriate courses; keep lessons substantial without clutter.

## Halfway-audit Bubble 2 — Gardening & Food Growing curriculum depth
- Deepened all 15 Gardening lessons across Weeks 01–03 with individual subject-specific explanations and worked examples, guided picture/card practices, independently drawable learning evidence and caregiver teaching notes.
- Scientific care emphasized: observation vs expectation, diverse real plant requirements, different habitats, suitable light/water, no tasting seeds or touching insects, safe alternatives to real seeds/soil, accessible container/paper gardens, privacy-respecting portfolio.
- Re-fetched the 3 weekly pages after commits: each contains 5 new teaching-depth blocks and 5 lessons, intact 15-question bank, portfolio JSON restore and print-note support; all embedded JavaScript passed syntax validation.
- Academic/runtime caveat: live-browser, print-page visual inspection, offline persistence and 255px keyboard/accessibility acceptance remain pending. Previous Home Management was depth-enhanced similarly.

## Halfway-audit Bubble 2 — Creativity, Arts & Making lesson depth
- Expanded all 15 Creativity lessons (Weeks 01–03) with distinct modeled examples, guided activities, independent picture-design challenges and accessibility/safety-minded caregiver notes.
- Content deepened: pretend pigment mixing (distinguished from additive light), geometric collage, AB/AAB/ABB/ABC repeat patterns, feelings through line, safe gallery labels, visual textures, paper engineering, three-panel narrative, inclusive design, feedback and original portfolio showcase.
- Re-fetched 3 weekly pages after main commits: 5 original lessons and 5 teaching-depth blocks each; 15 weekly quiz questions each; 3 original game cards each; JSON restoration and printable evidence code retained; JavaScript parsing passed throughout.
- The formal assessment banks, mastery rules and local-storage namespaces were left unchanged. Runtime browser/mobile/assistive-tech/print acceptance remains open.

## Halfway-audit Bubble 2 — Health, First Aid & Wellbeing lesson depth
- Deepened all 15 Health, First Aid & Wellbeing lessons in Weeks 01–03: distinct examples, guided caregiver-led activities, independent paper/picture challenges, and accessible caregiver teaching guidance.
- Coverage: handwashing, sleep/rest, food and water safety, adaptive movement, emotional awareness, trusted adults, reporting injuries, location-specific emergency help (no real practice calls), calm supports, safety boundaries and a reflective portfolio.
- No unsupervised treatment, touching real injuries/blood, medicines or emergency-response certification; private contacts and health details must not appear on public work.
- Re-fetched all three committed weekly pages: 5 lessons and 5 teaching-depth blocks per page, 15 original assessment questions, retained JSON recovery and printed learner-note functionality, zero JS parsing errors. No changes to mastery/record schemas.
- Browser, print, keyboard, 255px and offline end-to-end certification remain pending.

## Halfway-audit Bubble 2 — Personal Finance curriculum depth
- Enriched all 15 Kindergarten Personal Finance lessons (Weeks 01–03) with distinct examples, guided pretend-token activities, independent illustrated challenges, and caregiver notes; lesson progression covers money as a concept, needs/wants, simple counting, budgets, saving, sharing with consent, mock mini-markets, fairness and final portfolios.
- Lessons protect family financial privacy, avoid actual transactions and distinguish pretend tokens from real currencies; learning is inclusive of differing economic circumstances and accessibility needs.
- Re-fetched all three changed weekly pages: five lesson and five teaching-depth blocks per week, unchanged 15-item assessment banks per week, existing token game, JSON restore and printable learner evidence preserved; all embedded JS passes parsing.
- Five of eight currently built Kindergarten subject courses now have expanded lesson depth (Home Management, Gardening, Creativity, Health and Personal Finance); Culinary, Sustainability and Emergency remain for unified depth review.
- Browser/255px/offline/print end-to-end QA and deployment confirmation for current main remain pending.
