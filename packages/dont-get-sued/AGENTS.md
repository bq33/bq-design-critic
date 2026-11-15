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
