import type { Section } from '../types'

// Plan §9.2 — connection troubleshooting for listeners and TLS.
export const connectionTroubleshooting: Section = {
  id: 'connection-troubleshooting',
  title: 'Troubleshooting connections',
  scene: 'connection-troubleshooting',
  focus: 'symptoms',
  slide: `## Troubleshooting connections

Most connection failures follow a pattern, and the symptom points to the cause. Work from the **network up**, one layer at a time.

### Reading the symptoms
- Bootstrap works, then requests time out: the **advertised address** is unreachable
- The handshake fails at once: often a **plaintext** client on a TLS listener
- A certificate is rejected: the issuing **CA** is not in the client's truststore
- Hostname verification fails: the certificate lacks the **advertised name**

### Evidence before changes
- Check the **metadata** addresses the brokers actually return
- Inspect the certificate chain with **openssl s_client**
- Test **DNS and routes** from the client's own host`,
  narration:
    "Connection problems look mysterious, but most of them follow a small number of patterns, and the symptom usually points straight to the cause. The most common: the client bootstraps successfully, then every request times out. The first connection worked because the bootstrap address was reachable. The following connections go to the advertised addresses from the metadata, and those are not reachable from where the client is. If a handshake fails immediately, the usual cause is a mismatch of protocols, such as a client configured for plaintext connecting to a TLS listener. If the certificate is rejected, the certificate authority that issued it is missing from the client's truststore. And if hostname verification fails, the broker's certificate does not contain the name the client connected to, which is the advertised name. If only one broker misbehaves, compare its configuration with the others. Before changing anything, collect evidence. Check which addresses the metadata actually returns. Inspect the certificate chain with openssl s client. And test DNS and routing from the client's own host, not from your laptop, because the network path is often the difference.",
}
