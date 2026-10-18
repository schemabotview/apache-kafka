import type { Scene } from '@graphlearning/flow'

// §6.6 — checkout writes the order to its database AND publishes the event, as two separate
// operations. Either can succeed without the other, in both orders.
export const dualWrite: Scene = {
  id: 'dual-write',
  title: 'The dual-write problem',
  flow: 'TB',
  nodes: [
    { id: 'checkout', label: 'Checkout', sub: 'two writes, no shared transaction', pattern: 'service', icon: 'server' },
    {
      id: 'targets',
      label: 'Two systems',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-db', label: 'Orders database', sub: 'INSERT o-1041', pattern: 'storage', icon: 'database' },
        { id: 't-kafka', label: 'orders topic', sub: 'OrderPlaced o-1041', pattern: 'storage', icon: 'scroll' },
      ],
    },
    {
      id: 'failures',
      kind: 'table',
      label: 'A crash between the two writes',
      sub: 'no ordering of the writes avoids both',
      headers: ['Order', 'Crash after the first', 'Result'],
      values: [
        ['database, then Kafka', 'row saved, no event', 'order never shipped'],
        ['Kafka, then database', 'event sent, no row', 'shipped, but no order'],
      ],
    },
  ],
  edges: [
    { source: 'checkout', target: 'targets', label: 'write both' },
    { source: 'targets', target: 'failures', label: 'can diverge' },
  ],
}
