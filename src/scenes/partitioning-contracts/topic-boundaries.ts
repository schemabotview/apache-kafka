import type { Scene } from '@graphlearning/flow'

// §2.1 — the same order lifecycle split two ways. Events that must stay in order relative to each
// other have to share a topic and a key; splitting them by type gives up that ordering.
export const topicBoundaries: Scene = {
  id: 'topic-boundaries',
  title: 'Where to draw topic boundaries',
  cols: 2,
  nodes: [
    {
      id: 'by-type',
      label: 'One topic per event type',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 't-placed', label: 'orders-placed', sub: 'PLACED events', pattern: 'storage', icon: 'scroll' },
        { id: 't-paid', label: 'orders-paid', sub: 'PAID events', pattern: 'storage', icon: 'scroll' },
        { id: 't-shipped', label: 'orders-shipped', sub: 'SHIPPED events', pattern: 'storage', icon: 'scroll' },
        { id: 't-risk', label: 'No shared order', sub: 'PAID may be read before PLACED', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'by-entity',
      label: 'One topic for the lifecycle',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'e-orders', label: 'orders', sub: 'every order event', pattern: 'storage', icon: 'scroll' },
        { id: 'e-key', label: 'Key: order id', sub: 'one order, one partition', pattern: 'service', icon: 'key' },
        { id: 'e-type', label: 'Type field', sub: 'PLACED, PAID, SHIPPED', pattern: 'service', icon: 'tag' },
        { id: 'e-order', label: 'Order kept', sub: 'per order, in the log', pattern: 'service', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [],
}
