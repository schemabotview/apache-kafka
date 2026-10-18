import type { Section } from '../types'

// Plan §9.3 — SASL authentication choices and credential handling.
export const saslChoices: Section = {
  id: 'sasl-mechanisms',
  title: 'Choosing a SASL mechanism',
  scene: 'sasl-choices',
  focus: 'mechanisms',
  slide: `## Choosing a SASL mechanism

**SASL** is how clients prove who they are. Kafka supports several mechanisms; choose by where your **identities already live**.

### The mechanisms
- **SCRAM**: salted password hashes, stored in the cluster's **metadata log**
- **OAUTHBEARER**: short-lived tokens from a central identity provider
- **GSSAPI**: Kerberos, for organisations that already run it
- **PLAIN**: only with an external check; never with passwords in broker files

### Handling credentials
- Always run SASL **over TLS** (SASL_SSL), or credentials can be intercepted
- Keep secrets in a **secret store**, never in code, images or repositories
- Design every credential to be **rotated** without an outage`,
  narration:
    "SASL is the framework Kafka uses for clients to prove who they are, and Kafka supports several mechanisms. The right one depends mostly on where your organisation's identities already live. SCRAM uses usernames and passwords, but the broker stores only salted hashes, and in a KRaft cluster those are kept in the cluster's metadata log. It is self-contained, which suits self-managed clusters. OAUTHBEARER uses short-lived tokens issued by a central identity provider, which suits organisations with a single identity platform, and has the advantage that a leaked token expires on its own. GSSAPI is Kerberos, for organisations that already run it. PLAIN sends a username and password, and should only be used with an external check behind it, never with passwords written into broker files. Some handling rules apply whichever you pick. Always run SASL over TLS, using the SASL SSL security protocol, because otherwise credentials can be read off the network. Keep secrets in a secret store, never in code, container images or repositories. And design every credential so that it can be rotated without an outage, which is the subject of the last section.",
}
