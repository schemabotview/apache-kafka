import type { Scene } from '@graphlearning/flow'

// §6.4 — the boundary of Kafka's exactly-once: reading, processing and writing Kafka topics. The
// payment service and the email are outside it, and nothing about a transaction reaches them.
export const eosBoundary: Scene = {
  id: 'eos-boundary',
  title: 'Where exactly-once ends',
  flow: 'LR',
  nodes: [
    {
      id: 'inside',
      label: 'Inside one Kafka transaction',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'in-orders', label: 'orders', sub: 'input offsets', pattern: 'storage', icon: 'scroll' },
        { id: 'in-app', label: 'Pricer', sub: 'deterministic logic', pattern: 'service', icon: 'gears' },
        { id: 'in-out', label: 'priced-orders', sub: 'output records', pattern: 'storage', icon: 'scroll' },
      ],
      edges: [
        { source: 'in-orders', target: 'in-app' },
        { source: 'in-app', target: 'in-out' },
      ],
    },
    {
      id: 'outside',
      label: 'Outside: Kafka cannot undo these',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'o-pay', label: 'Card charged', sub: 'payment service call', pattern: 'warn', icon: 'receipt' },
        { id: 'o-mail', label: 'Email sent', sub: 'cannot be unsent', pattern: 'warn', icon: 'bell' },
        { id: 'o-db', label: 'Row written', sub: 'separate database', pattern: 'warn', icon: 'database' },
      ],
    },
  ],
  edges: [{ source: 'inside', target: 'outside', label: 'an abort does not reach', dashed: true }],
}
