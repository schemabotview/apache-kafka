import type { Scene } from '@graphlearning/flow'

// §1.1 — the three kinds of message an order system exchanges, drawn around one checkout. The
// command asks, the event records, the state summarises; the event is the one Kafka is built for.
export const eventCommandState: Scene = {
  id: 'event-command-state',
  title: 'Command, event, state',
  flow: 'TB',
  nodes: [
    { id: 'shopper', label: 'Shopper', sub: 'clicks Place order', pattern: 'user', icon: 'users' },
    {
      id: 'command',
      label: 'Command',
      sub: 'PlaceOrder — a request that can be refused',
      pattern: 'external',
      icon: 'pencil',
    },
    { id: 'checkout', label: 'Checkout service', sub: 'validates, decides', pattern: 'service', icon: 'server' },
    {
      id: 'event',
      label: 'Event',
      sub: 'OrderPlaced — a fact that already happened',
      pattern: 'network',
      icon: 'bell',
    },
    {
      id: 'readers',
      label: 'Who reacts, later and independently',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'fulfilment', label: 'Fulfilment', sub: 'picks and ships', pattern: 'service', icon: 'package' },
        { id: 'analytics', label: 'Analytics', sub: 'counts sales', pattern: 'service', icon: 'barchart' },
        { id: 'email', label: 'Notifications', sub: 'sends a receipt', pattern: 'service', icon: 'bell' },
      ],
    },
    {
      id: 'state',
      label: 'State',
      sub: 'order 1042: PLACED — the latest summary',
      pattern: 'storage',
      icon: 'database',
    },
  ],
  edges: [
    { source: 'shopper', target: 'command' },
    { source: 'command', target: 'checkout', label: 'asks' },
    { source: 'checkout', target: 'event', label: 'records' },
    { source: 'event', target: 'readers', label: 'published once' },
    { source: 'readers', target: 'state', label: 'derive', dashed: true },
  ],
}
