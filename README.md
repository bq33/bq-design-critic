# BQ Design Critic

An independent, portable UX critique system for coding agents and Lovable. **Review the experience before changing the code.**

The package includes an agent skill, a standalone Model Context Protocol (MCP) server, a scored design rubric, and copy/paste instructions for Lovable.

**Scope:** Design criticism, not automated visual perception. An agent must inspect screenshots and/or the running application itself and supply real observations. The MCP server organizes those observations, calculates evidence-backed scores, checks color contrast, and prioritizes actionable fixes. It does not capture screenshots, browse websites, or pretend that a score proves accessibility compliance.

## What it does

- Critiques visual hierarchy, task clarity, usability, type, responsive behavior, accessibility, motion, brand fit, and content integrity.
- Separates observed defects from assumptions and recommendations.
- Sorts actionable findings into **P0 blocker**, **P1 high**, **P2 medium**, and **P3 polish**.
- Avoids generic AI aesthetics unless intentionally supported by the brand.
- Produces a concise critique, a fix plan, and a retest checklist.
- Honors `prefers-reduced-motion`, mobile behavior, and legible interface copy.

## Repository layout

```text
bq-design-critic/
├── README.md                     Start here
├── AGENTS.md                     Agent entrypoint
├── skills/design-critic/SKILL.md Agent skill
├── lovable/KNOWLEDGE.md         Paste into Lovable knowledge
├── lovable/STARTER-PROMPTS.md   Prompts for Lovable sessions
├── rubric.json                   Weighted review criteria
├── src/server.mjs                Dependency-free MCP server
├── examples/review-input.json    Example structured review
├── tests/server.test.mjs         Smoke tests
├── .github/workflows/test.yml    GitHub Actions validation
├── package.json
└── LICENSE
```

## Use with Lovable (no MCP needed)

**Option A: Workspace skill** — In an environment with workspace skills enabled, add `skills/design-critic/SKILL.md` as a new skill named `design-critic`. Lovable may maintain its own workspace skills repository, separate from this personal GitHub repository.

**Option B: Project knowledge** — Paste the contents of [`lovable/KNOWLEDGE.md`](lovable/KNOWLEDGE.md) into your project's Knowledge/Instructions. Keep existing brand instructions; this system is a quality layer, not a shared visual brand.

Then ask:

> Run Design Critic on this page. Inspect the actual desktop and mobile UI. Report P0–P3 issues with specific evidence before changing anything. Propose the three highest-impact fixes, implement only approved fixes, and re-review the result.

**Important:** A GitHub URL alone does not install an MCP server into Lovable. Use its workspace skill / knowledge features, or connect a compatible agent runtime to the MCP server. The MCP server uses local stdio; it is not a hosted HTTP endpoint.

## Use with coding agents through MCP

Requirements: **Node.js 20+**. No npm dependencies are required.

```bash
git clone https://github.com/bq33/bq-design-critic.git
cd bq-design-critic
node src/server.mjs
```

Configure a coding agent that supports local MCP stdio servers with:

```json
{
  "mcpServers": {
    "bq-design-critic": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/bq-design-critic/src/server.mjs"]
    }
  }
}
```

MCP tools:

| Tool | Function |
|---|---|
| `get_design_rubric` | Returns the criteria, severity definitions, and review rules |
| `prepare_critique` | Returns an evidence-collection prompt for a page type and audience |
| `score_design_review` | Computes evidence-backed score and ordered issue list from observations |
| `check_text_contrast` | Calculates WCAG contrast ratio for two hex colors |

The rubric and agent skill work without an MCP connection. The server is useful when a compatible agent wants structured outputs and a consistent rating engine.

## Review method

1. Establish the page's purpose, audience, brand context, and primary task.
2. Inspect actual UI evidence: desktop and mobile screenshots or live app, plus code where appropriate.
3. Record observed problems, not invented problems; cite screen/element/state.
4. Rate each dimension 0–5 with evidence. Leave anything unverified **unrated**.
5. Rank fixes by severity, user impact, effort, and reversibility.
6. Propose the smallest viable design changes and explain tradeoffs.
7. After implementation, capture and verify again at 390, 768, 1024, and 1440 CSS px where possible.
8. Clearly distinguish tested findings from likely risks and subjective taste.

**Ship gate:** No known P0 issues. All dimensions must be covered for a full score. A static screenshot cannot establish functional, keyboard, or screen-reader quality.

## Tests

```bash
npm test
```

## Privacy and provenance

This project was written as an **original, independent implementation**, drawing only on general UX principles, public accessibility guidance, and the owner's personal design preferences. It includes no company-private source code, documentation, screenshots, templates, trademarks, or internal workflows. No screenshots are sent to third-party services by this MCP server.

External resources are optional references, not bundled code: [WCAG](https://www.w3.org/TR/WCAG22/), [WAI](https://www.w3.org/WAI/), [Impeccable](https://github.com/pbakaus/impeccable), [Emil Kowalski Skills](https://github.com/emilkowalski/skills).

## License

MIT. See [LICENSE](LICENSE).
