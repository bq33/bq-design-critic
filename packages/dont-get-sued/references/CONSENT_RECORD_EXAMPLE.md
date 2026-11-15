# Example: versioned legal-document assent record

**Design illustration only, not legal advice or proof of legally effective acceptance. Have counsel approve the actual interface, agreement, evidence and retention policy first.**

An auditable record might have: internal subject ID, document type and specific version, hash of the text shown, server-side acceptance timestamp, app channel and locale, affirmative user action, and appropriate reacceptance/withdrawal handling if needed.

```json
{
  "subject_id": "internal-user-id",
  "document_type": "terms_of_service",
  "document_version": "2026-11-14-draft-counsel-pending",
  "document_sha256": "SHA256_HASH_OF_ACTUAL_SHOWN_TERMS",
  "accepted_at": "2026-11-14T20:00:00Z",
  "channel": "ios_signup",
  "locale": "en-US",
  "affirmative_action": "unchecked_box_selected_then_continue"
}
```

Do not store plaintext passwords, payment data, raw secrets or personal data you cannot justify. Do not trust client timestamps as the authoritative record. Test backend persistence with a dummy user, retain only the legally and operationally necessary evidence, and publish only after required counsel approval.
