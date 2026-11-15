# Don't Get Sued
### Vibe-coded apps are cool. Lawyer fees aren't.

As the great poet **Shawn Carter (JAY-Z)** once said: “Chains is cool to cop ... more important is lawyer fees.”

Run this skill with your **Lovable apps** to reduce avoidable legal and operational risks before your users do. It maps privacy, tracking, children, security, subscriptions, intellectual property, AI, accessibility and app-store concerns to testable questions and a lawyer handoff.

**THIS IS NOT LEGAL ADVICE. YOU SHOULD REVIEW YOUR APP WITH A QUALIFIED LAWYER OR LEGAL PROFESSIONAL TO ENSURE ALL APPLICABLE LEGAL REQUIREMENTS ARE MET BEFORE LAUNCH. THIS TOOL CANNOT GUARANTEE YOU WILL AVOID LAWSUITS, FINES OR OTHER LEGAL CONSEQUENCES.**

## What you get

- A reusable [Lovable agent skill](../../skills/dont-get-sued/SKILL.md), already installable without an MCP connection.
- **34 evidence-first review controls**, classified as legal, jurisdiction-dependent, platform-policy, best-practice or optional risk reduction.
- **Five local MCP tools** for review planning, prioritization, code-pattern signals and factual handoff to counsel.
- Review prompts, official legal-source references and automated tests.
- No outsourced server, dependencies, outbound analytics, repository access or automatic deployment.

## Install in Lovable

Add the agent skill from [SKILL.md](../../skills/dont-get-sued/SKILL.md) as `dont-get-sued` in your workspace, or paste the [Lovable project instructions](lovable/KNOWLEDGE.md) into Knowledge. The Lovable skill can inspect code through Lovable's own agent access; the MCP server by itself does not read your project.

Start with:

> Activate the `dont-get-sued` skill. Review this Lovable app before launch, citing source paths, actual flow evidence and authoritative links. Prioritize P0–P3, show unknowns, propose the top three fixes and prepare my legal counsel handoff. **Do not change code or deploy yet.**

## Standalone local MCP server

Requirements: **Node.js 20+**. Clone this repository and point your local MCP-compatible coding agent at the server:

```bash
git clone https://github.com/bq33/bq-design-critic.git
cd bq-design-critic/packages/dont-get-sued
npm test
node src/server.mjs
```

MCP configuration:

```json
{
  "mcpServers": {
    "dont-get-sued": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/bq-design-critic/packages/dont-get-sued/src/server.mjs"]
    }
  }
}
```

A GitHub URL alone does not install a local stdio MCP server into Lovable. Use the workspace skill in Lovable, or connect the MCP to a separate local compatible agent runtime.

## Tools

| MCP tool | What it does |
|---|---|
| `get_legal_risk_catalog` | Returns all 34 cited review controls |
| `build_review_plan` | Selects context-relevant controls; unknown never means absent |
| `triage_legal_risk_evidence` | Ranks evidence and unverified requirements; never approves launch |
| `scan_source_signals` | Examines *agent-supplied snippets* for possible issues; not a security audit |
| `prepare_counsel_handoff` | Creates factual review questions and outstanding matters for a qualified lawyer |

## Ground rules

**Legal compliance is not a numerical score.** A cookie banner, EULA, age gate or source-code match alone never proves legality or security. A `verified` item means only that the supplied technical evidence was checked; it is not a legal opinion. The agent must separately inspect actual app behavior and identify unresolved legal questions.

Use [official regulatory and platform sources](references/LEGAL_SOURCES.md). In particular, the FTC's former 2024 Click-to-Cancel rule was vacated, while California has separate automatic-renewal requirements; COPPA is not a universal age-gate mandate; DMCA agent registration is conditional on safe-harbor strategy; self-hosted fonts are a privacy mitigation, not a universal requirement.

For deep technical security work, use a separate verified security audit such as [Cloudflare's security-audit skill](https://github.com/cloudflare/security-audit-skill), with safe sandbox controls.

## Safe operation

Review source and nonproduction behavior only. Never pass customer data or secrets into MCP arguments, send real charges, probe live targets, silently deploy, publish legal agreements or enable legally consequential consent flows awaiting counsel approval.

## License

MIT. Original public-source review guidance. No private employer tools or materials are included.
