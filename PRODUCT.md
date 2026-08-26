# Product

## Register

brand

Per-surface override, confirmed as a genuine split rather than a fuzzy default:

- **Interactive character sheet** (`index.html` `main`, the default view): **brand**. The design is the product. Expression, personality and memorability are the job.
- **Recruiter view** (`#cvDoc`, `body.plain`): **product**. The design serves a scanning task. Legibility, hierarchy and speed of comprehension win over expression every time. No RPG language, no neon, no motion that delays reading.

When a change touches both, they are governed separately. A decision that improves the character sheet is not automatically right for the CV, and vice versa.

## Users

Two audiences, recruiter first.

**Primary: recruiters and HR screeners.** Non-technical, moving fast, filtering a stack of candidates. They need to establish in seconds that this person is a final-year ICT student in Hobart, graduating December 2026, looking for a first role. They are reading the recruiter view.

**Secondary: technical hiring managers.** They go further, and they read the evidence. The unit codes behind each skill rating, the project detail, what was built by hand versus imported. They are reading the character sheet.

**Critical context: this is a companion, not a discovery channel.** Visitors arrive from a CV or a LinkedIn profile that has already been sent. They know the name before they land. The site does not need to introduce anyone. Its job is to confirm what the application claimed and expand on it with proof that would not fit on one page.

## Product Purpose

Support a live job application for a first ICT role. Success is a reader closing the tab more convinced than when they opened it, with the specific claims in the CV now backed by something checkable.

The organising principle of the whole site is **citation over claim**. Every skill rating names the unit, certification or project it came from. Every achievement names the fact behind it. Nothing on the page asserts a capability without pointing at where it was earned. That is the argument the site is making, and it is what separates it from a portfolio that simply lists adjectives.

## Brand Personality

**Warm, honest, approachable.**

The voice is a person talking plainly about work they actually did. Confident about what is finished, unembarrassed about what is in progress. "Learning next" is stated as openly as "Confident".

Honesty is structural here, not just tonal. Progress bars are computed from real checkpoints rather than typed in. Unfinished quests show as unfinished. Projects without a public repository say so instead of linking nowhere. Academic results are deliberately not published. The site should never claim more than it can show, and the reader should be able to feel that.

Warmth is the quality currently least present in the interface, and the one most worth protecting in future work.

## Anti-references

All four were named explicitly. In rough priority order:

1. **Generic AI-built portfolio.** Gradient hero, three identical feature cards, a big-number stat row, Inter everywhere. If a reader could say "a template made that" the site has failed at its only differentiating job.
2. **Overdone gamification.** The RPG framing tipping into juvenile or gimmicky. The conceit only works while every game element maps to a real, verifiable fact. The moment XP or a badge is decorative, the framing reads as a costume and undermines the honesty above. This is the sharpest constraint on the site: the concept and the anti-reference are the same thing viewed from two sides.
3. **Dense unreadable dump.** Everything visible at once with nothing prioritised. The reader should never be left to do the sorting.
4. **Corporate consultancy site.** Stock imagery, safe navy, empty superlatives, personality sanded off. The recruiter view must stay professional without becoming this.

## Design Principles

1. **Cite, don't claim.** Every rating, badge and number points at its source. If a fact cannot be backed, it does not go on the page.
2. **The game layer must be load-bearing.** Every RPG element maps to real data and is computed from it. Decorative gamification is the failure mode, not the feature.
3. **Two documents, two rulebooks.** The character sheet and the recruiter view are separate artefacts sharing one data source. Never restyle one into the other.
4. **Progressive depth.** The surface is scannable in seconds; detail is available on demand and never mandatory. Collapse, disclose, filter.
5. **Warmth is a feature, not decoration.** The person should be legible through the interface, not buried under the system.

## Accessibility & Inclusion

**Target: WCAG 2.2 AA.** The standard for Australian government and most large employers, which is exactly the audience being applied to. Failing it on a job-application site is a self-inflicted wound.

Concretely, held to:

- Contrast at 4.5:1 for body text, 3:1 for large text and meaningful UI boundaries.
- Touch targets at 44px on touch devices. WCAG 2.2 clears 24px; 44px is the size a thumb actually expects.
- Full keyboard operability with visible focus. The skill tree, filters and disclosures are all real buttons.
- `prefers-reduced-motion` honoured as gentler motion, not absent motion. Movement and overshoot are dropped, opacity transitions are kept because they aid comprehension.
- No information carried by colour alone. Skill levels carry a word as well as coloured pips; quest state carries a label as well as a tint.
- Text floor of 11px on mobile. A 9px mono label is legible on a monitor and not on a phone.
