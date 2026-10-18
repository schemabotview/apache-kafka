import type { Scene } from '@graphlearning/flow'

// §9.2 — connection failures, read from the symptom backwards. Most of them happen AFTER the first
// bootstrap connection succeeds, which is what makes them confusing.
export const connectionTroubleshooting: Scene = {
  id: 'connection-troubleshooting',
  title: 'Troubleshooting connections',
  flow: 'TB',
  nodes: [
    {
      id: 'symptoms',
      kind: 'table',
      label: 'Symptom, then the usual cause',
      sub: 'check in this order',
      headers: ['Symptom', 'Usual cause'],
      values: [
        ['bootstrap works, then timeouts', 'advertised address unreachable'],
        ['handshake fails at once', 'plaintext client on a TLS listener'],
        ['certificate rejected', 'CA missing from the truststore'],
        ['hostname verification fails', 'certificate lacks the advertised name'],
        ['works on one broker only', 'one broker misconfigured'],
      ],
    },
    {
      id: 'tools',
      label: 'Evidence to collect',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-meta', label: 'Metadata', sub: 'addresses brokers return', pattern: 'network', icon: 'network' },
        { id: 't-openssl', label: 'openssl s_client', sub: 'the certificate chain', pattern: 'network', icon: 'lock' },
        { id: 't-dns', label: 'DNS and route', sub: 'from the client host', pattern: 'network', icon: 'router' },
        { id: 't-logs', label: 'Broker logs', sub: 'the failed handshake', pattern: 'network', icon: 'scroll' },
      ],
    },
  ],
  edges: [{ source: 'symptoms', target: 'tools', label: 'confirm with' }],
}
