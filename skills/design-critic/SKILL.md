---
name: design-critic
description: Evidence-based UX and UI design critique for screenshots, live pages, components, and Lovable builds. Scores clarity, hierarchy, accessibility, responsiveness, motion, and brand fit; returns prioritized actionable fixes without generic AI design clichés.
---

# Design Critic

## Trigger

Use when the user asks to review, critique, audit, polish, redesign, compare, or improve a website, app, landing page, or UI component. Activate before implementing design changes, especially for Lovable projects.

## Operating principles

1. **Classify the surface**: software app, editorial, storefront, service, community, or other. Ask what the visitor is trying to accomplish; infer cautiously from visible copy when not supplied.
2. **Gather evidence**: inspect actual screenshot(s), live browser state, or code. Identify viewport and interaction state. If unavailable, mark findings as hypothesis, not observation.
3. **Look before scoring**: locate the primary task, the visual focal point, navigation, content hierarchy, trust evidence, conversion path, error/empty/loading states, and mobile behavior.
4. **Score only verified dimensions** against the nine dimensions in `rubric.json`. Missing evidence means `unrated`; never manufacture a 100-point grade.
5. **Critique specifically**: for each issue, name the precise element/state, what is wrong, why it matters, and the smallest likely fix. Treat P0 as ship-blocking, P1 as high impact, P2 as meaningful polish, P3 as optional craft.
6. **Prefer meaningful restraint**: independent visual design, contrast and hierarchy, honest content, inclusive interaction, disciplined motion. Avoid generic gradients, undifferentiated cards, arbitrary rounded icons, gratuitous effects, and cloned patterns unless justified by brief.
7. **Plan, then change**: default to critique-first. If the user asks for implementation, propose and perform targeted, reversible improvements. Do not silently rewrite the entire interface.
8. **Verify**: retest affected viewports and states, checking keyboard use and reduced motion when tools permit. Report untested items explicitly.

## Evidence rules

- Screenshot alone does **not** verify focus order, keyboard controls, real loading time, screen reader announcements, motion preference handling, or backend behavior.
- Color contrast calculations are tests only for specified color pairs, not blanket WCAG conformance.
- Do not invent user research, conversion rates, business metrics, visual inspection, or screenshots.
- Prefer authentic product assets and licensed imagery. Never misrepresent a generated image as actual staff or product.

## Review format

```
## Design verdict
[One crisp statement explaining the strongest opportunity.]

Overall score: [0–100 only when every dimension was rated; otherwise Incomplete]
Confidence: [high / medium / low + what you examined]

### Priority findings
P0/P1/P2/P3 • [specific screen or component]
Observed: [what is visible or confirmed]
Why it matters: [user impact]
Fix: [smallest concrete change]

### Three changes I would make first
1. [impact x effort]
2. ...
3. ...

### Keep
[What already works and should be preserved]

### Verification
[Tested sizes/states and remaining unknowns]
```

## Quality dimensions (weighted)

- Task clarity and information architecture — 20
- Visual hierarchy and composition — 15
- Interaction usability and feedback — 15
- Accessibility and inclusion — 15
- Typography and readability — 10
- Responsive and mobile layout — 10
- Motion and transitions — 5
- Brand differentiation — 5
- Content integrity and trust — 5

Consult `rubric.json` for individual score anchors. Each dimension is 0–5, and the weighted total is out of 100 only if all nine are scored with evidence.

## Page-type nuance

- **Software/dashboard:** lead with tasks/data, fast paths, understandable states, search/filter context, sensible density.
- **Service/local:** clear offering, real identity, service area, contact and trust, no decorative scroll theater.
- **Storefront:** clear product visual, price and details, size/stock, predictable checkout path; avoid invented scarcity.
- **Editorial:** reading rhythm, authorship, source context, meaningful typography and scanning.
- **Portfolio/landing:** distinctive point of view, persuasive above-the-fold story, one main CTA, credible proof.

## Motion

Purpose first. Use transform/opacity where appropriate, avoid making all sections animate, and respect `prefers-reduced-motion`. Use focus and hover states that communicate intent; hover cannot be the only affordance. Prefer short, consistent transitions to unrelated animations on every component. Verify mobile and touch behavior.

## Commands users can ask

- `Critique this screenshot, no edits.`
- `Audit this Lovable page and prioritize P0–P3.`
- `Compare these two mobile directions.`
- `Run a motion review and suggest meaningful animations.`
- `Improve the top three issues, then re-review.`

## External design inspiration (opt-in)

If the user asks for inspiration, style exploration, alternative directions or distinctive interaction patterns, consult [`inspiration/mia-ai-lab-fable-5.2.md`](../../inspiration/mia-ai-lab-fable-5.2.md) and the machine-readable [`catalog`](../../inspiration/mia-ai-lab-fable-5.2.json). Choose at most 2–3 references that match the product purpose and interaction model, and explain **what abstract principle** is relevant. Open originals when possible and credit Mia. Do not copy HTML, copyrighted art, distinctive branded copy or the entire page; independently design for the project's audience and existing identity. Inspiration is **not evidence** for scoring a real UI, nor proof of accessibility or performance. Preserve reduced-motion and mobile fallbacks.
