# Privacy Frameworks — Review Field Guide (v1.1)

**THIS IS NOT LEGAL ADVICE. REVIEW THE ACTUAL APP AND APPLICABLE LAWS WITH A QUALIFIED LAWYER OR LEGAL PROFESSIONAL.** This guide is for evidence gathering and technical issue triage, not legal certification or a substitute for jurisdiction-specific analysis.

Version 1.1 adds **24 review controls** to the original 34: **EU GDPR (14)**, **EU ePrivacy (2)**, **UK Privacy / UK GDPR + PECR (5)** and **US State Privacy (3)**. See [rules.json](../rules.json) for exact control IDs, sources, triggers, severity and evidence.

## 1. Start with applicability, not a cookie banner

Collect: legal entity, establishment(s), actual offer, marketing target, where people are located when relevant processing occurs, behavior monitoring, platforms, state thresholds, data volume, current flows and vendor locations.

| Scope | Questions for counsel | Common false shortcut |
|---|---|---|
| EU/EEA | EU establishment? Intentional offer to people in EU/EEA? Monitoring behavior of people there? | “Anyone can visit the site, so GDPR must apply everywhere.” |
| UK | UK establishment? Offer/monitoring reaching people in UK? Relevant UK-specific processing and DUAA/PECR duties? | “UK and EU GDPR have identical lawful bases and cookies rules.” |
| California | Is the entity a CCPA-covered business? Does it sell/share personal information or use applicable ADMT/high-risk processing? | “All California apps require every CPPA audit regardless of thresholds.” |
| Other US states | Which states are targeted, how many resident customers, which exemptions apply, what advertising/sharing is done? | “CCPA compliance means all 50 states are covered.” |

MCP `profile.regions` examples: `["DE", "FR", "GB", "US-CA", "US-CO"]`. `DE`/`FR` map to EU/EEA, `NO` to EEA, `GB` to UK, `US-CA` to US plus California. These **signals are not legal conclusions**. Unknown scope remains a question. `get_privacy_review` returns one jurisdictional checklist; `build_review_plan` includes all relevant and uncertain controls.

## 2. EU GDPR (EU-01 through EU-14)

- **Art. 3 / EU-01:** establish territorial scope with actual evidence (including targeting/monitoring).
- **Arts. 5–6 / EU-02:** map each purpose to data fields, basis and justification before processing.
- **Arts. 12–14 / EU-03:** match notice to real collection, processors, retention, rights, transfers and categories.
- **Arts. 15–22 / EU-04:** test request intake, response windows, access, correction, erasure, portability, objection and any required safeguards; exceptions are context-dependent.
- **Art. 7 / EU-05:** where consent is selected, record choice, version, time/purpose, easy withdrawal and downstream enforcement.
- **Arts. 5 and 25 / EU-06:** limit collection and retention; privacy protective defaults and permission controls.
- **Art. 28 / EU-07:** categorize controller/processor relationships, signed processing terms, instructions and subprocessor approvals when required.
- **Chapter V / EU-08:** map actual cross-border flows and current adequacy, SCC or appropriate safeguards; do not infer from cloud region alone.
- **Art. 35 / EU-09:** screen for likely high-risk processing and pre-launch DPIA where required. Not every small app needs a DPIA.
- **Arts. 33–34 / EU-10:** incident classification, controller notification of risky breaches generally by 72 hours from awareness; affected-person notice for high-risk breaches when required; processors notify controllers. Not all incidents trigger 72-hour notice.
- **Art. 30 / EU-11:** records of processing activities and scoped exceptions.
- **Arts. 27 and 37 / EU-12:** screen for EU representative or DPO, not automatic for every startup.
- **Art. 22 / EU-13:** assess significant solely automated decisions, profiling, safeguards and rights; using an LLM does not automatically create an Art. 22 case.
- **Art. 9 / EU-14:** check enumerated special categories, Art. 6 basis and separate Art. 9 condition where relevant.

Primary sources: [European Commission scope](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en), [lawful bases](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data_en), [obligations](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/obligations_en), [international transfers](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/rules-international-data-transfers_en).

## 3. EU ePrivacy (EPR-01 and EPR-02)

Separate **device storage/access** obligations from GDPR lawful basis. Identify cookies, pixels, SDK identifiers, local storage, and similar technologies. Determine actual purpose and whether a valid exemption applies under relevant national implementation. For consent-reliant non-essential activity, check that it does **not run before the choice** and is prevented after Reject or withdrawal. Review ease of rejecting and withdrawing, not just existence of a banner.

**Safe test** (staging or consent test environment, no real user data):
1. Fresh browser profile; capture outbound requests, cookies and local storage before any click.
2. Select Reject; check the vendor endpoints and relevant device state remain blocked.
3. Select consent and then withdraw; check subsequent accesses and events cease appropriately.
4. Capture only sanitized network metadata, screenshots and consent event IDs in the report.

Sources: [EDPB Article 5(3) technical scope](https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en), [EDPB GDPR consent guidance](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en).

## 4. UK GDPR and PECR (UK-01 through UK-05)

Review independently from the EU. The **Data (Use and Access) Act 2025** amended, not replaced, UK GDPR, DPA 2018 and PECR; relevant data protection provisions were in force by June 2026.

- Territorial reach, complaint intake and DUAA changes (UK-01).
- UK-specific lawful basis, rights and complaints processes (UK-02). The UK guidance now includes a **recognized legitimate interest** lawful basis, not a blanket EU GDPR basis.
- PECR storage/access exceptions and any required **simple means to object** (UK-03); do not impose EU consent logic blindly on exempt cases.
- UK restricted transfer assessment, including adequacy, the IDTA/Addendum and transfer-risk review where relevant (UK-04).
- Children-likely-to-access design and children's higher protection matters (UK-05), even where COPPA's US under-13 trigger is not met.

Sources: [ICO DUAA overview](https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations/), [ICO lawful basis](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/), [ICO PECR](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/), [ICO transfers](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/a-guide-to-international-transfers/).

## 5. US state privacy (US-01 through US-03)

- State-by-state applicability thresholds, exceptions, targeted advertising and rights (US-01). Use primary state AG/regulator sources and update for each launch market.
- California 2026 CPPA regulations (US-02): requirements and deadlines differ. In particular, **ADMT significant-decision compliance begins January 1, 2027**, while applicable risk assessment obligations started January 1, 2026 and audit certifications phase in later. Verify eligibility and dates before claiming a required control.
- Sensitive data and sale/targeted-ad opt-outs; Colorado recognizes a universal opt-out mechanism including GPC where the Colorado Privacy Act applies (US-03). Test using clean non-production sessions.

Sources: [CPPA finalized 2026 rules](https://cppa.ca.gov/regulations/ccpa_updates), [Colorado AG privacy law](https://coag.gov/resources/colorado-privacy-act/), [Colorado AG universal opt-out](https://coag.gov/opt-out/).

## 6. Evidence record and counsel handoff

Per finding, record:
```yaml
control_id: EU-02
jurisdiction: EU_GDPR
app_version: "release candidate / commit"
status: unverified  # verified technical fact | issue | unverified | not_applicable with rationale
facts: "What exactly was inspected, and what evidence supports it?"
artifact: "path:line, screenshot, sanitized test ID, vendor agreement"
legal_scope: "Unresolved unless confirmed by qualified counsel"
priority: P0
technical_fix: "Small reversible implementation or missing evidence to collect"
owner: "Product / engineering / legal"
retest: "How to verify the observed product behavior"
counsel_question: "Does this rule apply and what legal document or approval is required?"
```

The packet should include a processing-purpose and lawful-basis matrix, DPA/subprocessor inventory, hosting/transfer map, live notices and consent records, a rights/deletion test, incident escalation plan, DPIA screen, state jurisdiction screen and outstanding questions. **Never mark a legally sensitive step approved based only on an agent or static scan.**

## 7. Privacy audit prompt for Lovable

> Activate `dont-get-sued`. Examine my application's actual personal-data flows and interfaces. Screen EU GDPR, EU ePrivacy, UK GDPR/PECR and US state privacy based on the business's operations, audience and actual markets; do not assume applicability from mere site reachability. Audit each applicable/uncertain control using evidence and primary sources. Produce P0–P3 issues, unknowns, three prioritized technical remediations and a counsel handoff. Do not modify code or publish policies without authorization.

Source review: November 14, 2026. Laws, enforcement and platform requirements evolve. Refresh sources before applying to a later release.
