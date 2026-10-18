import type { Section } from '../types'

// Plan §9.7 — secret rotation, with a credential-rotation sequence.
export const credentialRotation: Section = {
  id: 'credential-rotation',
  title: 'Rotating credentials',
  scene: 'credential-rotation',
  focus: 'steps',
  slide: `## Rotating credentials

Credentials must be rotated, on a schedule and after any suspected leak. The safe pattern is always the same: **overlap, move, prove, remove**.

### Rotating a SASL principal
- Create a **new** principal and credential alongside the old one
- Give it the **same ACLs**, and verify the listing matches
- Roll every instance onto the new credential
- Remove the old one only once it has had **no connections** for a while

### Rotating TLS certificates
- Add the **new CA** to every truststore first
- Then roll certificates, **one broker at a time**, and remove the old CA last
- Existing connections stay authenticated until they **reconnect**, unless re-authentication is enabled
- Short-lived **OAUTHBEARER** tokens rotate themselves, by design`,
  narration:
    "Every credential will need rotating eventually, on a schedule, or urgently after a suspected leak, and the way to do it without an outage is always the same pattern: overlap, move, prove, remove. For a SASL principal, start by creating a new principal and credential alongside the old one, and store the credential in the vault. Give the new principal exactly the same ACLs, and compare the listings to prove they match. Then roll the service's instances onto the new credential, one at a time, checking each one connects. Now comes the step people skip. Watch the old principal, and only remove it once it has made no connections for a reasonable period, a day here, because a forgotten batch job or a second deployment may still be using it. Then remove the old ACLs and credential, and record the change. Certificates follow the same shape. Add the new certificate authority to every truststore first, so that both old and new certificates are trusted. Then roll new certificates onto brokers and clients, one broker at a time. Remove the old authority last, once nothing presents a certificate it signed.",
}
