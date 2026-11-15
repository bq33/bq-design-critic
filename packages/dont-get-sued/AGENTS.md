# Agent instructions — Don't Get Sued

Read [the workspace skill](../../skills/dont-get-sued/SKILL.md), [risk controls](rules.json) and [official sources](references/LEGAL_SOURCES.md) before reviewing an app.

- Profiles must list actual platforms, markets and features; unknown never means absent.
- Collect evidence with `path:line`, screenshots, non-production functional tests or verified configuration. Do not make up tests or law conclusions.
- Run scans as read-only analysis. Do not execute untrusted target code, install project dependencies, contact production endpoints, use real customers or payment cards, or access credentials.
- Do not log or send raw secrets, customer data or recordings.
- Differentiate legal obligations, platform requirements, security practices and suggestions; legal counsel decides applicability.
- Do not publish Terms, activate assent gates or deploy other legally consequential changes when counsel review is pending.
- Report P0–P3, observed evidence, proposed smallest fix, retest steps, unknowns and questions for counsel.
- **THIS IS NOT LEGAL ADVICE. THE ACTUAL APP MUST BE REVIEWED BY A QUALIFIED LAWYER OR LEGAL PROFESSIONAL BEFORE LAUNCH.**

## Privacy framework review

- For a privacy request, read `references/PRIVACY_FRAMEWORKS.md`, all relevant `rules.json` controls, and current primary regulator sources.
- Evaluate EU GDPR Art. 3 scope, UK GDPR scope and US state thresholds **independently**. Do not conflate the UK with EU/EEA or presume a public website targets every jurisdiction.
- Test actual consent/rejection/withdrawal and real data rights workflows only in safe non-production contexts, with dummy records.
- UK DUAA 2025 amendments are in force by June 2026; California 2026 rules have separate phased effective/compliance deadlines. Check current status before writing an issue.
- A GDPR/CCPA/PECR finding requires a verified technical observation plus qualified counsel's determination of legal relevance; never assert legal compliance based on generated documents or code pattern matching.
