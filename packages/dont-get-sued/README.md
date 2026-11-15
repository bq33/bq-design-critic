# Don't Get Sued
### Vibe-coded apps are cool. Lawyer fees aren't.

As the great poet **Shawn Carter (JAY-Z)** once said: “Chains is cool to cop ... more important is lawyer fees.”

Run this skill with your **Lovable apps** to reduce avoidable legal and operational risks before your users do. It maps privacy, tracking, children, security, subscriptions, intellectual property, AI, accessibility and app-store concerns to testable questions and a lawyer handoff.

**THIS IS NOT LEGAL ADVICE. YOU SHOULD REVIEW YOUR APP WITH A QUALIFIED LAWYER OR LEGAL PROFESSIONAL TO ENSURE ALL APPLICABLE LEGAL REQUIREMENTS ARE MET BEFORE LAUNCH. THIS TOOL CANNOT GUARANTEE YOU WILL AVOID LAWSUITS, FINES OR OTHER LEGAL CONSEQUENCES.**

## What you get

- A reusable [Lovable agent skill](../../skills/dont-get-sued/SKILL.md), already installable without an MCP connection.
- **58 evidence-first review controls**, including 24 EU/UK/US privacy enhancements, classified as legal, jurisdiction-dependent, platform-policy, best-practice or optional risk reduction.
- **Six local MCP tools** for review planning, prioritization, code-pattern signals and factual handoff to counsel.
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
| `get_legal_risk_catalog` | Returns all 58 sourced review controls; supports `category` filter |
| `get_privacy_review` | Retrieves EU GDPR, EU ePrivacy, UK GDPR/PECR or US state privacy checklist and jurisdiction screening signals |
| `build_review_plan` | Selects context-relevant controls; unknown never means absent |
| `triage_legal_risk_evidence` | Ranks evidence and unverified requirements; never approves launch |
| `scan_source_signals` | Examines *agent-supplied snippets* for possible issues; not a security audit |
| `prepare_counsel_handoff` | Creates factual review questions and outstanding matters for a qualified lawyer |

## Privacy-first modules (v1.1)

Privacy is now a first-class review category. See the [privacy field guide](references/PRIVACY_FRAMEWORKS.md), [58 control definitions](rules.json) and [primary sources](references/LEGAL_SOURCES.md). The **24 added privacy controls** are: EU GDPR (14), EU ePrivacy (2), UK privacy including UK GDPR/PECR (5), and US state privacy (3). The existing privacy checks remain.

Ask the Lovable skill: `Run Don't Get Sued on this app with an EU GDPR + UK GDPR + US state privacy focus; show evidence, unknown jurisdiction questions and a counsel handoff. Do not modify the app.`

Compatible MCP clients can call `get_privacy_review` with one of these framework values: `eu_gdpr`, `eu_eprivacy`, `uk_privacy`, `us_state`.

Example MCP tool arguments:

```json
{
  "framework": "eu_gdpr",
  "profile": {
    "app_name": "Example",
    "platforms": ["web", "ios"],
    "regions": ["DE", "GB", "US-CA"],
    "features": {
      "accounts": true,
      "analytics": true,
      "cloud_hosting": true,
      "international_transfers": true,
      "ai": false
    }
  }
}
```

`regions` accepts ISO-style country signals (e.g. `DE`, `FR`, `NO`, `GB`), `EU`/`EEA`, or US state codes (e.g. `US-CA`). These aid triage only. **A region match does not establish legal applicability, and a missing region does not establish an exemption.** Assess targeting, establishments, monitoring, business thresholds and data practices with counsel. The UK is assessed separately from the EU/EEA.

No change to the read-only, no-secrets, no-automatic-deploy safeguards. The MCP server doesn't browse, inspect projects or make legal determinations.

## Ground rules

**Legal compliance is not a numerical score.** A cookie banner, EULA, age gate or source-code match alone never proves legality or security. A `verified` item means only that the supplied technical evidence was checked; it is not a legal opinion. The agent must separately inspect actual app behavior and identify unresolved legal questions.

Use [official regulatory and platform sources](references/LEGAL_SOURCES.md). In particular, the FTC's former 2024 Click-to-Cancel rule was vacated, while California has separate automatic-renewal requirements; COPPA is not a universal age-gate mandate; DMCA agent registration is conditional on safe-harbor strategy; self-hosted fonts are a privacy mitigation, not a universal requirement.

For deep technical security work, use a separate verified security audit such as [Cloudflare's security-audit skill](https://github.com/cloudflare/security-audit-skill), with safe sandbox controls.

## Safe operation

Review source and nonproduction behavior only. Never pass customer data or secrets into MCP arguments, send real charges, probe live targets, silently deploy, publish legal agreements or enable legally consequential consent flows awaiting counsel approval.

## License

MIT. Original public-source review guidance. No private employer tools or materials are included.
