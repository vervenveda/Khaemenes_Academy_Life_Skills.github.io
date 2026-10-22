# Khaemenes Academy — Life Skills & Practical Independence

A free, sovereign, accessible Life Skills curriculum branch serving Preschool, Kindergarten, Elementary, Middle School, High School, Higher Learning and adult learners.

## Ownership
**This repository is the canonical source** for Life Skills curricula, pathway identifiers, route policy, and reusable assessment/portfolio standards. Other Academy repositories should link or import versioned, age-adapted resources only after verification. Earlier planning copies elsewhere in the ecosystem are historical/reference material, not authoritative masters.

## Sixteen pathways
1. Culinary Independence
2. Home Management
3. Gardening & Food Growing
4. Creativity, Arts & Making
5. Entrepreneurship & Small Business
6. Personal Finance
7. Health, First Aid & Wellbeing
8. Emergency Readiness & Resilience
9. Digital Literacy & Citizenship
10. Career & Work Readiness
11. Transportation & Navigation
12. Civic & Community Living
13. Relationships & Communication
14. Sustainability & Resource Stewardship
15. Caregiving & Family Responsibilities
16. Legal & Consumer Literacy

## Curriculum structure
The binding implementation standard is [`CURRICULUM_STANDARD.md`](./CURRICULUM_STANDARD.md).

- One Life Skills course = **3 instructional weeks / 15 learning days**.
- All **16 pathways** fit into a **48 + 4 flexible week** annual model.
- Verified **80% knowledge mastery** is required for weekly progression.
- Practical safety competency and caregiver/teacher review remain separate from quiz mastery.
- Learner records stay local unless deliberately exported.
- No course is represented as professional licensure or accreditation.

### Route policy
Preschool uses the canonical pathway-first structure:

`courses/<pathway>/preschool/`

Kindergarten is an intentionally preserved stage-first bridge:

`courses/kindergarten/<pathway>/`

Those Kindergarten URLs are established and **must not be moved merely for symmetry**. The machine-readable authority is [`docs/life-skills-route-manifest.json`](./docs/life-skills-route-manifest.json).

## Current implementation state — October 2026
- **Preschool:** all 16 pathways have dedicated three-week classroom structures with local learner records, mastery gates and caregiver-review boundaries.
- **Kindergarten:** **8 dedicated pathways / 8 foundation-review pathways**. Dedicated courses currently include Culinary, Home Management, Gardening, Creativity, Health, Personal Finance, Sustainability and Emergency Readiness.
- **Culinary Independence:** the strongest vertical model, extending through Elementary, Middle School, High School and Higher Learning.
- **Other pathways:** Preschool foundations and blueprints are in place; later-stage expansion is intentionally being sequenced rather than filled with superficial pages.
- **Regression protection:** Preschool direct-source integrity CI and Kindergarten source audits are active.
- **Browser certification:** automated Chromium acceptance now covers dedicated Preschool/Kindergarten pages and critical learner journeys. Real assistive-technology speech and human print/PDF visual review remain manual certification gates.

See [`docs/EARLY_LEARNING_BROWSER_CERTIFICATION.md`](./docs/EARLY_LEARNING_BROWSER_CERTIFICATION.md) for the boundary between automated and manual browser evidence.

## Academy standards
- 80% formal knowledge mastery before the next weekly formal step unlocks; practice alone never grants mastery.
- Adult supervision and explicit safety guidance for age-restricted or hazardous practical tasks.
- Responsive narrow-screen layouts, keyboard accessibility, printable evidence and offline-capable/local-first learning wherever practical.
- Import/export routines must preserve learner, subject and week identity and must not silently overwrite existing work.
- One canonical master on `main`; cross-campus releases follow documented QA.

## Campus
[Open Life Skills](./index.html) · [Course outlines](./courses/) · [Preschool](./courses/preschool/) · [Kindergarten](./courses/kindergarten/) · [Main Academy](https://vervenveda.com/Khaemenes_Academy.github.io/) · [Higher Learning](https://vervenveda.com/Khaemenes_Higher_Learning.github.io/)

Jennifer Kay Pearl
