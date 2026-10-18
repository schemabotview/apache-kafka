import type { Section } from '../types'

// Plan §9.1 — distinguishing networking, TLS, authentication, and authorization failures.
export const authnAuthz: Section = {
  id: 'which-layer-failed',
  title: 'Which layer failed?',
  scene: 'authn-authz',
  focus: 'layers',
  slide: `## Which layer failed?

When a client cannot read a topic, the cause sits in one of **four layers**. Each layer has its own error, and its own fix.

### The layers, bottom up
- **Network**: timeouts or refused connections, so check addresses and firewalls
- **TLS**: handshake failures, so check certificates and truststores
- **Authentication**: SaslAuthenticationException, so check the credential
- **Authorization**: Topic or **GroupAuthorizationException**, so check ACLs

### Using it
- Read the **exact exception**, and fix only that layer
- Each layer only fails once the one below it **works**
- Authentication failing right after a rotation usually means an **old credential**
- Broker authorizer logs name the **principal**, which confirms who was refused`,
  narration:
    "When a service reports that it cannot read a topic, the cause is in one of four layers, and each layer produces its own kind of error with its own fix. Reading the exact exception, and fixing only that layer, saves hours of changing the wrong thing. Start at the bottom. If the client cannot reach the broker at all, you see timeouts or refused connections, and the fix is in addresses, firewalls or DNS. If the network works but TLS does not, the handshake fails, and the fix is in certificates and truststores. If TLS works but the credential is wrong, you see a SASL authentication exception, and the fix is the credential or the mechanism. And if the client is authenticated but not permitted, you see an authorization exception. A topic authorization exception means its ACLs on the topic are missing. A group authorization exception, from a consumer that can read the topic perfectly well, means it lacks read on its group. The layers fail in order: each one can only fail once every layer beneath it is working. That is also why changing ACLs can never fix a TLS problem.",
}
