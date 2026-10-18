import type { Section } from '../types'

// Plan §9.2 — listeners, advertised addresses, and TLS.
export const listeners: Section = {
  id: 'listeners-and-addresses',
  title: 'Listeners and advertised addresses',
  scene: 'listeners',
  focus: 'audiences',
  slide: `## Listeners and advertised addresses

A broker accepts connections on one or more named **listeners**, each with its own port and **security protocol**. Each audience gets the listener meant for it.

### Three listeners here
- **INTERNAL** for applications and replication inside the data centre
- **EXTERNAL** for partners connecting from outside
- **CONTROLLER**, separate by rule, for the controller quorum

### The address that matters
- Clients bootstrap from any broker, then use the **advertised** addresses
- Each advertised address must be **reachable** by that listener's audience
- And it must match the name in the broker's **TLS certificate**`,
  narration:
    "A broker can accept connections on several ports at once, each called a listener, and each with its own name, port and security protocol. That lets different audiences connect in different ways. Here there are three. Internal is for applications inside the data centre, and for replication between brokers. External is for partners connecting from outside, through a different network path. And controller is used only by the controller quorum, and Kafka requires it to be separate from the inter-broker listener. The security protocol map says each listener's protocol, here SASL over TLS for both client listeners. The setting that causes most connection trouble is advertised listeners. A client bootstraps by connecting to any broker it can reach. But the metadata it receives back lists each broker by its advertised address, and from then on, the client connects to those addresses. So each advertised address must be reachable by that listener's audience. A partner outside must never be told an internal hostname. And because clients verify hostnames, the advertised name must also appear in the broker's TLS certificate.",
}
