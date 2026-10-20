# Khaemenes Academy — Culinary Curriculum Forensic Audit
Date: 2026-10-20 · Phase: source and architecture baseline

## Verified existing inventory
| Stage | Current accessible source | Curriculum finding |
|---|---|---|
| Preschool | [Little Kitchen Helper](https://github.com/vervenveda/Khaemenes_Preschool.github.io/blob/main/apps/Life_skills_kitchen_helper_index.html), [Little Kitchen Recipe Garden](https://github.com/vervenveda/Khaemenes_Preschool.github.io/blob/main/apps/Life_Skills_kitchen_%20resipes_index.html) | Two substantial supervised early-childhood activities. Not automatically a reviewed 36-week course. |
| Elementary | [Little Kitchen Helper](https://github.com/vervenveda/Khaemenes_Elementary.github.io/blob/main/games/little_kitchen_helper/index.html) | A dedicated game is present; independent evidence of 36 weeks or mastery was not established. |
| Middle | Campus scanned for culinary/cooking/kitchen/recipe filenames | No separately named culinary course path found; topical science and math overlaps need a content-level audit. |
| High | Campus scanned for culinary/cooking/kitchen/recipe filenames | No separately named culinary course path found; available science food web files are not equivalent to a cooking curriculum. |
| Higher Learning | Campus recursive file inventory scanned | No separately named culinary path found; earlier report may refer to ARSHIF culinary hall or another renamed program. Not proof of absence. |
| Cross-stage reference | [ARSHIF Culinary Hall](https://github.com/vervenveda/Arshif.github.io/blob/main/halls/culinary/index.html) | Source describes 185 dossiers, 40 modules, 18 pathways, 101–603 curriculum, atlas and kitchen lab; contains quizzes, but gate integrity and accreditation claims must be examined separately. |

## New Life Skills layer
Five standalone vanilla HTML, inline CSS and JS, dependency-free introductory learner portals have been added under `courses/culinary-independence/{preschool,elementary,middle,high,higher}/index.html`. Each includes introductory lesson content, five daily activities, a local device log and adult review notes, randomized introductory bank (15 questions, ten per attempt, four answers each), persisted assessment attempt snapshots, an 80% knowledge gate and print function. All were linked from the Culinary Arts landing page. They do **not** constitute five complete courses.

## Findings requiring hardening (priority ordered)
1. **Curriculum depth gap:** All stage portals currently share much introductory reading and the same 15-question bank. Replace with original developmentally differentiated units, rich readings, multimedia alternatives and reviewed larger banks. Preschool assessment requires an appropriately accessible caregiver-assisted interaction, not the same text quiz used for adults.
2. **Gate boundary:** The 80% condition currently unlocks an introductory next-step status message, **not** actual Week 02 content. Full 36-week gating, midterm, final and verified portfolio criteria are not implemented.
3. **Identity and evidence:** Records use stage-scoped browser localStorage, not individual authenticated student identity. Profiles, parent approval and cross-repository synchronization must wait for Academy registry integration, conflict testing and export/import safeguards. Shared devices may mingle learners.
4. **Daily log precision:** The current narrative activity entry is printable but not yet five separately date-stamped structured daily records; create day-specific immutable snapshots and dedicated printable packets.
5. **Assessments:** The 15-item bank is too small for a high-stakes course; formally review correctness, distractors, item-specific learning objective and question variants; test tampering, attempts, relaunch, learner switching and offline persistence.
6. **Resources:** Preserve ARSHIF and Preschool ownership; map exact lessons to Hall modules and specific recipes, audit safety information and check internal links. Audit alternate course names before reporting a missing High or Higher Learning course.
7. **Video and games:** New portals presently link only existing resources; they do not yet contain independently reviewed video references, embedded ad-minimized video, interactive mini-games or full printable evidence packets.
8. **Accessibility and safety:** Source-level HTML and narrow CSS rules exist, but 255px real-device QA, keyboard-only tests, screen-reader labeling, food allergy policies, child safeguarding and print pagination remain unverified.

## Release doctrine
- Do not publish completion certificates on introductory score alone.
- Require verified 80% formal knowledge mastery **and** separate supervised practical competency before each designated practical gate.
- Maintain one canonical Life Skills curriculum; ARSHIF remains the advanced reference archive and other campuses retain their existing apps.
- Expand the five portals systematically, starting with a true stage-specific Culinary Week 01 at Preschool, then Elementary, Middle, High and Higher Learning.

Jennifer Kay Pearl · Khaemenes Academy
