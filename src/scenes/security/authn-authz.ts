import type { Scene } from '@graphlearning/flow'

// §9.4 — telling the failure layers apart. Each one has its own error and its own fix; reading the
// exact exception saves hours of changing the wrong thing.
export const authnAuthz: Scene = {
  id: 'authn-authz',
  title: 'Which layer failed?',
  flow: 'TB',
  nodes: [
    {
      id: 'layers',
      kind: 'table',
      label: 'Four layers, four kinds of failure',
      sub: 'svc-fulfilment cannot read orders: why?',
      headers: ['Layer', 'Typical error', 'Fix'],
      values: [
        ['network', 'timeout, connection refused', 'address, firewall, DNS'],
        ['TLS', 'SSL handshake failed', 'certificates, truststore'],
        ['authentication', 'SaslAuthenticationException', 'credentials, mechanism'],
        ['authorization', 'TopicAuthorizationException', 'ACLs for this principal'],
        ['authorization', 'GroupAuthorizationException', 'Read on the group too'],
      ],
    },
    {
      id: 'order',
      label: 'Read the layers bottom up',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-net', label: '1. Reach it', sub: 'network', pattern: 'network', icon: 'router' },
        { id: 'o-tls', label: '2. Encrypt', sub: 'TLS', pattern: 'network', icon: 'lock' },
        { id: 'o-who', label: '3. Identify', sub: 'SASL', pattern: 'service', icon: 'fingerprint' },
        { id: 'o-may', label: '4. Permit', sub: 'ACLs', pattern: 'service', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [{ source: 'layers', target: 'order', label: 'in order' }],
}
