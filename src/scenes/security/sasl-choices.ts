import type { Scene } from '@graphlearning/flow'

// §9.3 — the SASL mechanisms Kafka supports, compared on where the credential lives and what it
// needs alongside. Every mechanism should run over TLS (SASL_SSL).
export const saslChoices: Scene = {
  id: 'sasl-choices',
  title: 'Choosing a SASL mechanism',
  flow: 'TB',
  nodes: [
    {
      id: 'mechanisms',
      kind: 'table',
      label: 'SASL mechanisms in Kafka 4.1',
      sub: 'always over TLS: security protocol SASL_SSL',
      headers: ['Mechanism', 'Credential', 'Suits'],
      values: [
        ['SCRAM-SHA-512', 'salted hash in the metadata log', 'self-managed clusters'],
        ['OAUTHBEARER', 'token from an identity provider', 'central identity, short tokens'],
        ['GSSAPI', 'Kerberos ticket', 'existing Kerberos estates'],
        ['PLAIN', 'username and password', 'only with an external check'],
      ],
    },
    {
      id: 'handling',
      label: 'Handling credentials',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'h-store', label: 'Secret store', sub: 'never in code or images', pattern: 'storage', icon: 'key' },
        { id: 'h-one', label: 'One per service', sub: 'never shared', pattern: 'service', icon: 'fingerprint' },
        { id: 'h-tls', label: 'TLS always', sub: 'or credentials leak', pattern: 'warn', icon: 'lock' },
        { id: 'h-rotate', label: 'Rotatable', sub: 'without an outage', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'mechanisms', target: 'handling', label: 'whichever you choose' }],
}
