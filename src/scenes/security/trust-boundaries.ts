import type { Scene } from '@graphlearning/flow'

// §9.1 — every connection that crosses a trust boundary, and the identity on each end. Each
// application gets its own principal; nothing shares one "kafka" user.
export const trustBoundaries: Scene = {
  id: 'trust-boundaries',
  title: 'Identities and trust boundaries',
  flow: 'TB',
  nodes: [
    {
      id: 'apps',
      label: 'Applications — one principal each',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'a-checkout', label: 'Checkout', sub: 'User:svc-checkout', pattern: 'service', icon: 'server' },
        { id: 'a-fulfil', label: 'Fulfilment', sub: 'User:svc-fulfilment', pattern: 'service', icon: 'package' },
        { id: 'a-connect', label: 'Connect workers', sub: 'User:svc-connect', pattern: 'service', icon: 'plug' },
        { id: 'a-streams', label: 'Sales totals', sub: 'User:svc-sales-totals', pattern: 'service', icon: 'sigma' },
      ],
    },
    {
      id: 'cluster',
      label: 'Cluster — its own identities',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-brokers', label: 'Brokers', sub: 'User:broker, replicate', pattern: 'storage', icon: 'harddrive' },
        { id: 'c-controllers', label: 'Controllers', sub: 'separate listener', pattern: 'storage', icon: 'brain' },
      ],
    },
    {
      id: 'questions',
      label: 'Asked on every connection',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'q-who', label: 'Who is it?', sub: 'authentication', pattern: 'network', icon: 'fingerprint' },
        { id: 'q-may', label: 'May it?', sub: 'authorization, per request', pattern: 'network', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'apps', target: 'cluster', label: 'TLS + SASL' },
    { source: 'cluster', target: 'questions', dashed: true },
  ],
}
