import type { Scene } from '@graphlearning/flow'

// §6.6 — the transactional outbox. Checkout writes the order and the event in ONE database
// transaction; a relay (often CDC) publishes outbox rows to Kafka afterwards, at least once.
export const outbox: Scene = {
  id: 'outbox',
  title: 'The transactional outbox',
  flow: 'TB',
  nodes: [
    { id: 'checkout', label: 'Checkout', sub: 'one database transaction', pattern: 'service', icon: 'server' },
    {
      id: 'db',
      label: 'Orders database — committed together',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'db-orders', label: 'orders table', sub: 'row for o-1041', pattern: 'storage', icon: 'table' },
        { id: 'db-outbox', label: 'outbox table', sub: 'OrderPlaced, eventId 7f3c…', pattern: 'storage', icon: 'table' },
      ],
    },
    { id: 'relay', label: 'Relay or CDC', sub: 'reads outbox rows in order', pattern: 'network', icon: 'workflow' },
    { id: 'topic', label: 'orders topic', sub: 'at least once: same eventId', pattern: 'storage', icon: 'scroll' },
  ],
  edges: [
    { source: 'checkout', target: 'db', label: 'BEGIN … COMMIT' },
    { source: 'db', target: 'relay', label: 'after commit' },
    { source: 'relay', target: 'topic', label: 'publish' },
  ],
}
