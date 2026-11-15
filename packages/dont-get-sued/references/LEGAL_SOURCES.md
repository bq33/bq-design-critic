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

## Misleading shortcuts to avoid

1. A cookie banner existing is not proof that cookies/pixels were held back or that opt-outs work.
2. Self-hosting fonts reduces remote data transfers but is not a universal legal requirement.
3. A standalone EULA is not always mandatory; store default agreements can apply.
4. DMCA registration is a conditional part of claiming a safe harbor, not a generic requirement for all uploads.
5. The California CCPA's statutory damages for eligible breaches have specific statutory conditions; a generic app vulnerability does not automatically trigger a per-user award.
6. A tiny AI disclaimer cannot replace effective risk controls, truthful marketing or counsel review.
7. A successful security scan or checklist cannot guarantee an app is lawful.
