# Authoritative legal and app-store references

**NOT LEGAL ADVICE. A LICENSED LAWYER OR QUALIFIED LEGAL PROFESSIONAL MUST ASSESS YOUR APP AND ALL APPLICABLE LAWS BEFORE RELEASE.**

Reviewed 2026-11-14. Links are a starting point and may change before launch.

| Topic | Primary source | Review note |
|---|---|---|
| Apple privacy, deletion, IAP and IP | [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) | Privacy policy in App Store Connect and within app; account deletion requirements if account registration is supported. |
| Android data policies | [Google Play User Data Policy](https://support.google.com/googleplay/android-developer/answer/10144311) | Privacy link in store and app; accurate data safety and applicable account/data deletion. |
| Children | [FTC COPPA guidance](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions) | Applies to child-directed services and general-audience services with actual knowledge of under-13 data collection; not blanket age verification. |
| Commercial email | [FTC CAN-SPAM guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) | Correct sender identity, address, opt-out and timely requests. One-click may arise separately from email-provider requirements. |
| California privacy | [CPPA regulations](https://cppa.ca.gov/regulations/) and [CCPA statute](https://cppa.ca.gov/pdf/20260101_ccpa_statute.pdf) | Applicable businesses, data rights, sale/share opt-outs, GPC; cookie banners do not by themselves answer these obligations. |
| California subscription renewal | [California AG consumer notice](https://www.oag.ca.gov/news/press-releases/attorney-general-bonta-issues-consumer-alert-california%E2%80%99s-automatic-renewal-law) | 2025 amendments relevant to consent, cancellation and notices. |
| Federal recurring-payment status | [FTC current Negative Option Rule page](https://www.ftc.gov/legal-library/browse/rules/negative-option-rule) | The 2024 Click-to-Cancel rule was vacated. Avoid citing old FTC rules as if currently in force. |
| User-generated content | [Copyright Office DMCA directory](https://www.copyright.gov/dmca-directory/) | Designated agent is relevant when seeking certain 17 USC 512 safe harbors, not every app that accepts files. |
| Accessibility | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Technical guidance, not a legal-conformance determination on its own. |
| Engineering security | [NIST SSDF](https://csrc.nist.gov/Projects/ssdf) | Risk reduction; not proof of reasonable security under every statute. |
| Deep defensive code audit | [Cloudflare security-audit-skill](https://github.com/cloudflare/security-audit-skill) | Independent source-first audit with isolation safeguards; not legal certification. |
| Truth-in-advertising | [FTC advertising guidance](https://www.ftc.gov/business-guidance/advertising-marketing) | Claims, reviews, endorsements, and pricing need substantiation. |
| IP ownership/permissions | [US Copyright Office](https://www.copyright.gov/help/faq/faq-fairuse.html) | A public web image or archive photo is not automatically public domain. |

## EU, UK and US privacy source map (November 2026)

These sources cover **conditional** requirements. Verify country-specific implementation, current regulator guidance and the app's actual facts before making recommendations.

| Framework | Official source | Review use |
|---|---|---|
| EU GDPR territorial scope (Art. 3) | [European Commission](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en) | EU establishment or intentionally offering goods/services to, or monitoring, people in the EU; mere global availability is not enough. EEA extension also covers Iceland, Liechtenstein and Norway. |
| EU GDPR legal bases and special categories (Arts. 6, 9) | [European Commission](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data_en) | Lawful basis per purpose; Art. 9 separate conditions for listed special-category data. |
| EU GDPR notices, rights and minimization (Arts. 5, 12–22, 25) | [European Commission principles](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en) | Notice completeness, rights request handling, purpose limitation, data minimization and defaults. |
| EU GDPR processors, recordkeeping, DPIAs and breach response (Arts. 28, 30, 33–35) | [European Commission obligations](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/obligations_en) | Processor contracts, documented records, high-risk DPIA screening and conditional 72-hour authority breach reporting. |
| EU GDPR cross-border transfers (Chapter V) | [European Commission international transfers](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/rules-international-data-transfers_en) | Adequacy, SCCs or other lawful transfer tools; cross-border vendor access needs investigation. |
| EU GDPR consent validity | [EDPB Guidelines 05/2020](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en) | Consent freely given, specific, informed, unambiguous and withdrawable, where consent is the chosen basis. |
| EU ePrivacy terminal access (not GDPR alone) | [EDPB Guidelines 2/2023](https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en) | Cookies, pixels, SDKs and similar tracking technologies; exemptions and implementation vary by state. |
| UK GDPR and Data (Use and Access) Act 2025 | [UK ICO DUAA overview](https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations/) | UK amendments fully in force by June 2026; includes data-protection complaints and children's higher protection matters. |
| UK GDPR lawful bases | [ICO lawful basis guide](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/) | Updated UK grounds including recognized legitimate interests; do not assume EU bases identical. |
| UK PECR device storage/access | [ICO 2026 guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/) | UK exceptions and any simple-means-to-object requirement need dedicated review. |
| UK international transfers | [ICO 2026 guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/a-guide-to-international-transfers/) | Restricted transfer tests and UK-specific mechanism/transfer risk assessment. |
| California 2026 privacy regulations | [California CPPA](https://cppa.ca.gov/regulations/ccpa_updates) | CCPA-covered entities; risk assessments effective Jan. 2026, with phased submission; ADMT significant-decision requirements from Jan. 2027. |
| Colorado Privacy Act and opt-outs | [Colorado AG](https://coag.gov/resources/colorado-privacy-act/) and [opt-out page](https://coag.gov/opt-out/) | Thresholds, opt-out rights and recognized universal mechanisms including GPC. |
| Other US states | Relevant state AG, statute and regulator publications | No single California/Colorado review proves nationwide compliance; counsel to check state-by-state thresholds and exemptions. |

### Reading the outcomes

- `scope=review` means a relevant market or feature was declared, **not** that the law applies.
- `scope=needs_context` means more facts are needed, including possible extra-territorial targeting.
- `status=verified` means a stated **technical fact** has evidence, not legal sign-off.
- No compliance score, certification or legal ship decision is issued.

## Misleading shortcuts to avoid

1. A cookie banner existing is not proof that cookies/pixels were held back or that opt-outs work.
2. Self-hosting fonts reduces remote data transfers but is not a universal legal requirement.
3. A standalone EULA is not always mandatory; store default agreements can apply.
4. DMCA registration is a conditional part of claiming a safe harbor, not a generic requirement for all uploads.
5. The California CCPA's statutory damages for eligible breaches have specific statutory conditions; a generic app vulnerability does not automatically trigger a per-user award.
6. A tiny AI disclaimer cannot replace effective risk controls, truthful marketing or counsel review.
7. A successful security scan or checklist cannot guarantee an app is lawful.
