# Don't Get Sued — Lovable project instructions

**NOT LEGAL ADVICE. HAVE A QUALIFIED LAWYER OR LEGAL PROFESSIONAL REVIEW YOUR APP AND APPLICABLE LAWS BEFORE LAUNCH.**

Use these as a quality layer alongside existing product design and business requirements. Activate when asked to run "Don't Get Sued".

1. Scope the platforms, jurisdictions, business model, audience/under-13 likelihood, data, analytics/pixels/session replay, signup, sensitive information, payments/subscriptions, marketing email, uploads, AI and other risky features. Unknown does not mean no.
2. Inspect actual current source and user journeys with safe dummy accounts. Check live privacy links, consent/Reject behavior, relevant California opt-out/GPC, SDK inventory, Terms assent records, backend authorization, Supabase RLS/storage permissions, no private keys in browser bundle, billing/renewals/cancellation, account deletion, app-store data declarations, marketing rules, IP licenses and accessibility.
3. Cite a file:line, observed screen, network trace or verified test for each finding. A technical signal or a drafted legal page is not proof that the law was met.
4. Report evidence-backed P0–P3, top three fixes, unverified concerns and a handoff for qualified counsel. Distinguish legal obligation, conditional jurisdiction, platform policy and security best practice. Avoid an overall compliance score.
5. Review only before editing, unless explicitly asked. No production probing, real payments, policy publication or activation of agreement/consent gates pending lawyer approval. Re-test approved technical improvements and list what remains unknown.

COPPA, CCPA, DMCA safe harbor and California auto-renewal applicability all depend on actual facts. The FTC 2024 federal Click-to-Cancel rule was subsequently vacated. A one-click provider email requirement is not the same as CAN-SPAM. Self-hosted fonts are a mitigation, not an everywhere legal mandate. A policy disclaimer alone is not protection from liability.

## Privacy module activation (GDPR, UK, US states)

When an app collects or shares personal data, explicitly screen **EU GDPR**, **EU ePrivacy**, **UK GDPR and PECR**, and **relevant US state privacy laws**. Start with legal entity, user markets, actual targeting/monitoring and business thresholds. A website reachable from Europe alone does not prove GDPR applicability. Do not treat the UK as an EU market. Missing data is "unverified," not "not applicable."

If EU/EEA may be relevant: inspect purpose-by-purpose Art. 6 lawful basis, Art. 9 special-category conditions, Arts. 12–14 notices, Arts. 15–22 rights, Art. 7 consent and withdrawal, Art. 25 privacy defaults, Art. 28 processor DPAs, Art. 30 processing records, Arts. 33–34 breach handling, Art. 35 DPIA screening, Chapter V transfers and DPO/representative triggers. Check ePrivacy consent/exemptions for cookies, pixels and SDK/device access separately.

If UK may be relevant: examine the **2025 Data (Use and Access) Act** amendments now in force, complaints and children’s protection, current UK PECR storage/access rules and exceptions, UK lawful bases and UK transfer mechanisms. Do not automatically apply EU cookie rules to UK processing.

For the US: document state-by-state thresholds, rights, opt-out/Global Privacy Control and sensitive-data requirements. Review California’s 2026 CPPA regulations with phased deadlines; significant-decision ADMT requirements start in January 2027 for covered businesses. Colorado separately recognizes universal opt-out mechanisms.

Collect sanitized data flow maps, privacy-policy evidence, before/after-consent network traces, access/deletion test logs, retention schedules, vendor/subprocessor contracts, cross-border transfer mapping, incident runbooks and DPIA screening. Produce an explicit applicability-question list and counsel packet. **Never announce GDPR/CCPA compliance, publish legal notices or enable legally consequential consent settings solely from the skill.**

Guide: https://github.com/bq33/bq-design-critic/blob/main/packages/dont-get-sued/references/PRIVACY_FRAMEWORKS.md

Output: **Verdict → Evidence-backed P0/P1 → P2/P3 → Unknowns → Top three fixes → Lawyer handoff → Verified vs unverified**.

Source skill: https://github.com/bq33/bq-design-critic/blob/main/skills/dont-get-sued/SKILL.md
