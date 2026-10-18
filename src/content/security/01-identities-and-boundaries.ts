import type { Section } from '../types'

// Plan §9.1 — identity and trust boundaries across clients, brokers, controllers, and integrations.
export const trustBoundaries: Section = {
  id: 'identities-and-boundaries',
  title: 'Identities and trust boundaries',
  scene: 'trust-boundaries',
  focus: 'apps',
  slide: `## Identities and trust boundaries

Security starts with **identity**. Every application, every Connect cluster and the brokers themselves each need **their own principal**.

### Two questions on every connection
- **Authentication**: who is this? Answered once, when the connection opens
- **Authorization**: may it do this? Checked on **every request**
- **Encryption** with TLS protects both, and the data, on the wire

### Boundaries in this system
- Applications to brokers, brokers to brokers, everything to **controllers**
- Connect and Streams act **on behalf** of applications, so they need identities too
- One principal per service means one leak exposes **one service**, not all
- Brokers authenticate **each other** too, on the inter-broker listener`,
  narration:
    "Securing Kafka starts with a simple question: who is on the other end of each connection? Every application, every Connect cluster, every Streams application, and the brokers themselves, each need their own identity, called a principal. Two separate questions are then asked. Authentication asks who this is, and it is answered once, when the connection opens, using a certificate or a SASL mechanism. Authorization asks whether this principal may do this particular thing, and it is checked on every single request: may it write to orders, may it read as the fulfilment group. Encryption, with TLS, protects both of those exchanges, and all the data, while it crosses the network. Now map the boundaries in this system. Applications connect to brokers. Brokers connect to each other to replicate. Brokers and controllers connect to the controller quorum. And Connect and Streams applications act on behalf of other applications, so they need identities of their own too. The reason to insist on one principal per service is containment. If one credential leaks, one service is exposed, and only that credential needs replacing.",
}
