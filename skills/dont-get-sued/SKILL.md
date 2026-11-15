---
name: dont-get-sued
description: "Evidence-first legal, privacy, IP, subscription, app-store and security risk review for vibe-coded Lovable apps. Never a legal-compliance certificate."
---

# Don't Get Sued — Vibe-Coded App Review

As the great poet Shawn Carter once said: “Chains is cool to cop ... more important is lawyer fees.”

**THIS IS NOT LEGAL ADVICE. YOU SHOULD REVIEW YOUR APP WITH A QUALIFIED LAWYER OR LEGAL PROFESSIONAL TO ENSURE THAT ALL APPLICABLE LEGAL REQUIREMENTS ARE MET BEFORE LAUNCH. THIS SKILL CANNOT GUARANTEE AGAINST LAWSUITS OR FINES.**

## Trigger

Use when asked to "Run Don't Get Sued", audit launch readiness, review privacy/security or legal risks in a Lovable app, or assemble a lawyer review. Work with, not instead of, the Design Critic skill. Do not launch an intrusive audit during ordinary edits.

## Process

1. Scope the application: platform, countries/states, audience and possibility of under-13 users, business model, subscriptions, data collected, authentication, analytics/ad pixels, session replay, third-party fonts, AI, user uploads, marketing and regulated features. Unknown is not the same as absent.
2. Inspect actual source, relevant UI, policy links, tracking network calls, backend authorization/RLS, secrets, signup/account deletion, purchases, renewal/cancellation, marketing email, accessibility, image/code/font licenses, app-store metadata and data retention. Name which behavior you truly tested. Use safe dummy accounts and non-production environments.
3. Separate **laws**, **jurisdiction-dependent questions**, **platform policies**, **security best practices** and **optional risk reduction**. Don't extrapolate from a keyword to a legal violation. Cite authoritative sources for law/policy claims.
4. Report **P0** release-impacting, **P1** high, **P2** medium and **P3** improvement observations. Each needs exact evidence (path:line, test, screenshot or actual URL), a conditional legal/operational concern, smallest proposed fix, and verification.
5. Keep untested requirements **unverified**. Don't award a compliance score, legal approval, certification, or claim this prevents getting sued.
6. **Review first**: no code changes unless directed; do not make real purchases, probe production, transmit sensitive data or auto-publish policies. Legal Terms/EULA/consent gates awaiting lawyer sign-off must stay draft/inactive.
7. Produce **lawyer handoff**: jurisdictions, audience, data flow, vendors/AI, policy drafts, assents, UGC/IP, marketing, subscriptions, high-risk features, evidence and questions for counsel. Technical improvements require retesting; counsel decides legal obligations.

## Domain checklist

- Privacy notice, cookies/pixels, consent or opt-out according to actual market, GPC where required, data rights, retention, SDK vendor contracts.
- Children/COPPA assessment rather than a universal age-gate requirement.
- Terms/privacy/EULA approvals, versioned assent evidence, business contact.
- CAN-SPAM marketing email postal address/unsubscribe; SMS marketing consent as relevant.
- Transparent prices/trials/renewal/cancellation, California automatic renewal obligations where applicable, and mobile store billing rules.
- User content rights, IP and license provenance; DMCA agent process only when relevant to safe-harbor strategy.
- Apple/Google Play privacy links, account-deletion flow and accurate privacy declarations.
- Server-side access controls, database RLS, storage, keys, auth, rate limits, backups, independent security review.
- AI disclosures/data sharing/claims and high-risk regulated use cases.
- Accessibility, truthful marketing and testimonials.

## Dedicated privacy review frameworks (v1.1)

Use the [source catalog](../../packages/dont-get-sued/rules.json) and [privacy field guide](../../packages/dont-get-sued/references/PRIVACY_FRAMEWORKS.md). The catalog contains 58 controls, including 24 additional EU/UK/US privacy controls. In a compatible MCP runtime use `get_privacy_review` with `framework` = `eu_gdpr`, `eu_eprivacy`, `uk_privacy` or `us_state`. In Lovable without MCP, use these same instructions and inspect the actual project.

1. **Screen territorial reach, not merely server location:** distinguish a company established in the EU/EEA, deliberate offering of goods/services to people there, and monitoring their behavior there. Separate UK territorial reach and US state business thresholds; a public website reachable worldwide is not necessarily targeting every country. If unknown, flag it to counsel instead of marking a law not applicable.
2. **EU GDPR:** for each data processing purpose map data fields, legal basis (Art. 6) and special category conditions (Art. 9) where relevant. Review privacy notice (Arts. 12–14), access/correction/deletion/portability/objection rights (Arts. 15–22), consent/withdrawal (Art. 7), privacy by default (Art. 25), vendor processing contracts (Art. 28), records (Art. 30), breach response (Arts. 33–34), DPIA screening (Art. 35), DPO/representative assessment and international transfer mechanism (Chapter V). Treat Art. 22 automated decisions as conditional, not all AI.
3. **EU ePrivacy:** separately assess consent/exemptions for cookies, pixels, SDK identifiers and other terminal equipment access under applicable member-state implementations. Use clean-session network traces before choice, after Reject and after withdrawal. Classify necessary versus non-essential functions with evidence; a banner is not a legal finding.
4. **UK GDPR and PECR:** separately assess UK lawful bases, complaints process and children-likely-to-access protections under the **Data (Use and Access) Act 2025** (data protection provisions fully in force by June 2026). Review updated UK PECR storage/access exemptions and any required simple means to object; do not copy the EU cookie rubric blindly. For transfers use UK adequacy, IDTA/Addendum or other suitable mechanisms rather than assuming EU SCCs alone satisfy UK rules.
5. **US state privacy:** document each targeted state's thresholds, entity/data exemptions, notice, rights, opt-out, sensitive-data and vendor requirements. Explicitly check California's 2026 CPPA risk/ADMT/cybersecurity regulations with phased dates (ADMT significant-decision requirements begin January 2027), and states like Colorado that recognize Universal Opt-Out Mechanisms/GPC.
6. **Evidence packet:** require real flows and sanitized technical evidence, a data-flow and vendor map, purpose/basis matrix, policy/cookie tests, redacted rights-request cases, retention/processor contracts, incident runbook and DPIA/transfer screening. Ask counsel to decide whether each obligation actually applies. No automatically generated legal-compliance grade, attorney sign-off or blanket EU/UK/US legal conclusion.

Official sources: [EU Commission GDPR](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations_en), [EDPB ePrivacy](https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en), [UK ICO DUAA](https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations/), [California CPPA](https://cppa.ca.gov/regulations/ccpa_updates), [Colorado AG](https://coag.gov/opt-out/).

## Accuracy guards

COPPA applies to qualifying child-directed services and general services with actual knowledge of collecting under-13 data, not all apps. [FTC](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions).

California CCPA requirements depend on business and data practices; a cookie banner alone is not an opt-out. [CPPA](https://cppa.ca.gov/regulations/).

CAN-SPAM and large-mail-provider one-click sender rules are different. [FTC](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business).

DMCA agent registration supports certain qualifying safe harbors, not all uploads. [Copyright Office](https://www.copyright.gov/dmca-directory/).

A standalone EULA is not categorically required. Apple and Google require accessible app privacy policies and have account-deletion rules. [Apple](https://developer.apple.com/app-store/review/guidelines/), [Google Play](https://support.google.com/googleplay/android-developer/answer/10144311).

The FTC's 2024 federal Click-to-Cancel rule was later vacated; California automatic-renewal requirements still matter when applicable. [California DOJ](https://www.oag.ca.gov/news/press-releases/attorney-general-bonta-issues-consumer-alert-california%E2%80%99s-automatic-renewal-law).

Self-hosting fonts is not globally mandatory. CCPA breach statutory damages have specific prerequisites, not an automatic charge for any data incident. Security scans are not legal opinions; if asked, consider [Cloudflare's independent security audit](https://github.com/cloudflare/security-audit-skill).

## Output

**Don't Get Sued: [app/version/date]**  
**NOT LEGAL ADVICE — QUALIFIED COUNSEL REVIEW REQUIRED**  
Scope and actual evidence inspected; evidence-backed P0/P1; P2/P3; unknown requirements and jurisdiction questions; top 3 technical fixes; lawyer handoff; tests actually performed and not performed. No legal clearance.

Companion MCP: separate local Node server with an evidence-based catalog, source-pattern triage and counsel-handoff tools. The skill works in Lovable without MCP; the server does not inspect the app autonomously.