# Khaemenes Academy — Culinary Resource Reuse Inventory
**Audit date:** 2026-10-20  
**Status:** First-pass source discovery; compatibility and educational accuracy are NOT fully verified.

## Confirmed assets

1. **ARSHIF Culinary Arts, Foodways & Hospitality Hall 101–603**  
   Source: https://github.com/vervenveda/Arshif.github.io/blob/main/halls/culinary/index.html  
   Public path: https://vervenveda.com/Arshif.github.io/halls/culinary/  
   Existing page describes **185 culinary dossiers, 40 original modules, 18 formal pathways, 101–603 structure**, Test Kitchen Lab, world culinary atlas, food safety, food science, cultural research, hospitality, entrepreneurship and portfolio. It contains quiz/assessment and local device storage logic; full mastery integrity requires testing. It explicitly does **not** represent professional food-safety certification or academic transfer credit.

2. **Preschool Little Kitchen Recipe Garden**  
   Source: https://github.com/vervenveda/Khaemenes_Preschool.github.io/blob/main/apps/Life_Skills_kitchen_%20resipes_index.html  
   Existing recipe exploration includes adult guidance, allergen and choking-risk reminders. Intended for supervised early-childhood learning.

3. **Preschool Little Kitchen Helper**  
   Source: https://github.com/vervenveda/Khaemenes_Preschool.github.io/blob/main/apps/Life_skills_kitchen_helper_index.html  
   Interactive guided introduction to safe kitchen-helping activities.

## Higher Learning qualification
The Higher Learning repository's recursive main-branch filename inventory did not surface a separate path named culinary, cooking, recipe, kitchen or chef; its home page also did not surface culinary keywords. This **does not establish absence**: the broader culinary program may be the ARSHIF 101–603 hall, may be linked elsewhere, or may be embedded under a different name. Trace cross-repository links before labeling any Higher Learning resource missing.

## Architecture decision
- **Life Skills**: canonical *life-skills course progression*, stage-specific lessons, 80% formal knowledge mastery, separate supervised practical approval, printable evidence and parent involvement.
- **ARSHIF**: canonical deep reference/research archive, culinary dossiers, advanced modules, foodways and professional-study resources. Cross-link rather than copy its 483 KB hall.
- **Preschool**: canonical child-friendly original cooking apps/games. Cross-link and verify safe navigation rather than copy and create competing versions.
- Do **not** claim ARSHIF quiz scores or existing games automatically satisfy Life Skills mastery; versioned record bridge requires learner isolation, reviewed questions and verified score provenance.
- Existing curriculum assets remain unchanged in their original repositories.

## Next audit steps
- [ ] Inventory culinary mentions and aliases across all Academy grade repositories and game portals, beyond filename search.
- [ ] Test ARSHIF pathway enrollment, formal gate, quiz bank integrity, repeat attempts, printouts, offline use and accessibility.
- [ ] Verify all Preschool apps at 255px, safety messages and caregiver review.
- [ ] Map Life Skills Week 01–36 prerequisites to existing Hall dossiers and modules (link rather than duplicate).
- [ ] Audit source and licensing for any outside video before embedding; provide offline equivalent.
- [ ] Build an actual learner-specific Life Skills assessment/evidence engine only after resource mapping.
