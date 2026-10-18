import type { Scene } from '@graphlearning/flow'

// §9.7 — rotating a service's credential with no outage: overlap old and new, move every client,
// prove nothing uses the old one, then remove it.
export const credentialRotation: Scene = {
  id: 'credential-rotation',
  title: 'Rotating a credential',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'Rotating svc-checkout without an outage',
      sub: 'a new principal, then the old one retired',
      headers: ['Step', 'Action', 'Proof before the next step'],
      values: [
        ['1', 'create svc-checkout-2026b', 'credential stored in vault'],
        ['2', 'copy its ACLs from svc-checkout', 'kafka-acls --list matches'],
        ['3', 'roll checkout to the new credential', 'all instances connected'],
        ['4', 'watch the old principal', 'no connections for a day'],
        ['5', 'remove old ACLs and credential', 'audit entry recorded'],
      ],
    },
    {
      id: 'tls',
      label: 'For TLS certificates, the same overlap',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 't-trust', label: 'Trust new CA', sub: 'everywhere first', pattern: 'service', icon: 'shieldcheck' },
        { id: 't-roll', label: 'Roll certificates', sub: 'one broker at a time', pattern: 'service', icon: 'repeat' },
        { id: 't-remove', label: 'Remove old CA', sub: 'last', pattern: 'service', icon: 'trash' },
      ],
      edges: [
        { source: 't-trust', target: 't-roll' },
        { source: 't-roll', target: 't-remove' },
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'tls', label: 'likewise' }],
}
