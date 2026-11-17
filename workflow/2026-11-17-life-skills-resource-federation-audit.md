# Khaemenes Academy Life Skills — Cross-Repository Resource Federation Audit
**Date:** 2026-11-17  
**Branch:** main  
**Scope:** Life Skills repository plus Preschool, Kindergarten, Elementary, Middle, High School, Higher Learning, Finance, Medicament, Firmament, ProReSources, Academy and Arcade.

## Architectural conclusion

The dedicated Life Skills repository is the **canonical curricular authority** for Life Skills pathway IDs, stage progression, standards and mastery expectations.

The wider Verve N Veda ecosystem already contains many practical-life tools, games, workshops, portals and supporting courses. Those resources should be **federated by metadata and linked from Life Skills**, not copied into this repository unless there is a separate migration reason.

Rule:

> Life Skills owns the curriculum map; ecosystem repositories may own the practice tools.

A resource may support a pathway without becoming the authority for course mastery.

---

## Canonical Life Skills backbone

The repository currently defines sixteen pathways:

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

The landing page explicitly states this repository is the canonical Life Skills curriculum backbone.

Current maturity is uneven by stage:
- Preschool: dedicated coverage across all 16 pathways
- Kindergarten: 8 dedicated courses plus 8 foundation-review routes
- Culinary: strongest vertical development across later Academy stages and Higher Learning
- Other pathways: curriculum blueprints/outlines exist, with stage depth still expanding

This staged maturity should remain visible rather than implying equal completion everywhere.

---

## Preschool — legacy practical-life tools

Confirmed child-facing practical-life apps include:

- Life Skills Kitchen Recipes
- Life Skills Kitchen Helper
- How to Brush Your Teeth
- Emotions & Friendship Garden
- Make the Bed
- Organizer
- Walk the Dog
- Life Skills Compass Exploration
- Donate
- Schoolwork
- weather and simple observation tools

These are valuable early-practice surfaces, but they remain governed by the Preschool child-safe boundary.

**Federation role:** supervised routines, hygiene, organization, responsibility, emotional/social practice, simple household participation.

Do not route Preschool learners outward into the full Life Skills or ecosystem directory.

---

## Kindergarten

The dedicated Life Skills repository already contains Kindergarten stage routes. The separate Kindergarten repository also contributes child-facing weather and exploration tools.

Because Kindergarten is under the closed child-safe navigation model, any Life Skills federation must be one-way from adult/teacher discovery toward Kindergarten resources—not a child-facing escape route into the full ecosystem.

---

## Elementary

The Elementary repository contains full Health / PE / SEL pathways across Grades 2–5 plus reusable games such as:
- Emotional Garden
- Elementary Weather Portal
- Story Seed Garden
- vocabulary and reasoning games that can support communication and self-management

**Federation role:** health, SEL, emotional regulation, communication, routines, weather awareness, responsibility and age-appropriate independence.

---

## Middle School

Confirmed:
- Grade 6–8 Health / PE / SEL sequences
- Home Gardening elective
- agricultural/home-gardening curriculum

**Federation role:** health, emotional/self-management, gardening, planning, supervised independence and practical responsibility.

---

## High School

Confirmed high-value Life Skills resources include:
- Grade 11 Personal Finance course
- Physical Education safety and exercise studios
- movement safety
- science health-information and homeostasis activities
- civic capstone work
- family-facing guides
- broader government/economics and practical-planning resources

**Federation role:** financial literacy, health decision-making, independent living, civic participation, evidence-based decision-making and practical planning.

---

## Higher Learning

Higher Learning has a separate `life-skills/` hub and should be treated as the adult/collegiate **consumer** of this canonical Life Skills curriculum, not as a competing pathway authority.

Higher Learning can expose:
- adult practical independence
- professional readiness
- advanced communication
- finance
- legal/consumer literacy
- health/wellness
- career
- civic/public-service resources

The Life Skills repository should remain the source of pathway definitions and cross-age progression.

---

## Finance repository

Confirmed practical tools include:

- Budget Calculator
- Budget Tool
- Budget Planner
- Chore Budget Hub
- Small Business Budget
- Ultimate Budget Tool
- Personal Finance workshop
- Financial Budget workshop
- Personal Taxes workshop
- International Finance
- Global Job Search
- Finance / employment news
- Business Hub
- Business Incubator
- Business Management
- Sovereign Legacy Planner

Primary pathway mappings:
- Personal Finance
- Entrepreneurship & Small Business
- Career & Work Readiness
- Legal & Consumer Literacy
- Caregiving / legacy planning

These tools should be exposed contextually from Life Skills without duplicating their code.

---

## Medicament / health ecosystem

Confirmed:
- Health & Wellness courses across high-school grades
- Physical Education across grades
- Universal Exercise Log / Workout Tracker
- Health Is Wealth trivia
- 10-Week Wellness Program
- Diabetes Health workshop
- elementary and middle health branches

Primary pathway mappings:
- Health, First Aid & Wellbeing
- Emergency Readiness & Resilience
- Personal care
- fitness / movement
- health literacy

Health and first-aid content must preserve the existing Life Skills disclaimer: educational content is not professional certification.

---

## Firmament

Confirmed practical-life resources include:
- Family Hub
- Estate / Legacy / Elder Care
- Insurance Education
- Insurance Resources
- Senior Safety Check
- Veterans Hub · National
- Veterans Hub · Florida
- Homeless Hub

Primary pathway mappings:
- Caregiving & Family Responsibilities
- Legal & Consumer Literacy
- Civic & Community Living
- Emergency Readiness & Resilience
- Personal Finance / insurance literacy
- public-service and veterans support

Firmament resources should be treated as civic/legal/support tools, not curricular mastery authorities.

---

## ProReSources

Confirmed relevant professional/practical resources include:
- resume template
- interview-preparation template
- job-description template
- business-plan template
- family-history template
- KhaeClean
- broader professional productivity and documentation tools

Primary pathway mappings:
- Career & Work Readiness
- Entrepreneurship & Small Business
- Home Management
- Caregiving / family history
- Digital Literacy & Citizenship

---

## Academy

Confirmed supporting resources include:
- Health Is Wealth
- Health Trivia
- Wellness Workshop
- Workout Builder
- Family / parent infrastructure
- Homeschool Compass

These should be considered supporting resources, especially for adult/teacher discovery, but not copied into Life Skills.

---

## Arcade

Confirmed reusable practice surfaces include:
- Civic Compass trivia
- Health trivia
- Lawn Care trivia

These are good candidates for pathway-linked practice under:
- Civic & Community Living
- Health & Wellbeing
- Gardening / Sustainability

Arcade games remain supplemental practice and must not independently award Life Skills mastery.

---

## Recommended canonical federation metadata

Create a canonical registry such as:

`data/ecosystem-life-skills-resources.json`

Every record should declare:

### Pathway
One or more of the 16 canonical pathway IDs:
- CUL
- HOM
- GAR
- CRE
- ENT
- FIN
- HEA
- SAF
- DIG
- CAR
- TRN
- CIV
- REL
- SUS
- FAM
- LEG

### Learner stage
- preschool
- kindergarten
- elementary
- middle
- high
- higher
- adult
- all-ages with adapter

### Resource role
- formal-course
- supplemental-practice
- game
- tool
- workshop
- portal
- reference
- checklist
- planner
- studio

### Safety class
- independent
- supervised
- adult-required
- teacher/parent-facing
- informational-only

### Authority
Each resource must explicitly state whether it:
- contributes practice evidence
- can contribute teacher-reviewed evidence
- is purely informational
- has no formal mastery authority

Practice tools must never silently write or elevate canonical Life Skills mastery.

---

## Recommended Life Skills resource explorer

Build one searchable Life Skills Resource Explorer driven by the federation registry.

Filters:
- pathway
- age/stage
- tool/game/course
- supervised vs independent
- skill type
- repository
- adult / child suitability

Useful one-word categories for toolbar or compact filters:
- Home
- Money
- Health
- Safety
- Career
- Civic
- Food
- Garden
- Family
- Digital
- Travel
- Legal
- Create
- Communicate

Visible toolbar labels must follow the canonical rule:

> **One word · one line · fixed height**

The launcher should be a one-word context descriptor such as **Life** or **Skills**.  
Internal controls should remain one-word functional descriptors.

---

## Child-safety boundary

Preschool and Kindergarten remain closed local learning environments.

Life Skills resources from those repositories may be indexed by the adult/teacher federation, but their child-facing pages must not gain broad ecosystem navigation.

Age-appropriate resources can be surfaced locally inside those child repositories without exposing:
- full ecosystem search
- adult finance/legal/civic hubs
- parent/admin controls
- unrestricted external navigation

---

## Next implementation pass

1. Create `data/ecosystem-life-skills-resources.json`.
2. Seed verified resources from all audited repositories.
3. Map every record to one or more of the 16 canonical pathway IDs.
4. Add age/stage and safety metadata.
5. Add an explicit mastery-authority field.
6. Build a searchable Life Skills Resource Explorer.
7. Connect age-aware learner toolbars to filtered views rather than generic ecosystem search.
8. Add regression tests preventing supplemental tools or games from becoming formal mastery authorities.
