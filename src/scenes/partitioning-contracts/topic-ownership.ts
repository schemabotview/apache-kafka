import type { Scene } from '@graphlearning/flow'

// §2.1 — a topic as a published interface: one owning team, a name that says what it holds, and the
// settings and schema readers depend on. The values are this course's running example.
export const topicOwnership: Scene = {
  id: 'topic-ownership',
  title: 'A topic is an interface with an owner',
  flow: 'TB',
  nodes: [
    { id: 'owner', label: 'Checkout team', sub: 'the only writer', pattern: 'user', icon: 'users' },
    {
      id: 'card',
      kind: 'table',
      label: 'Topic: shop.orders',
      sub: 'what readers are promised',
      headers: ['Property', 'Value'],
      values: [
        ['name', '<domain>.<entity>, no team or app names'],
        ['owner', 'checkout team, on call for it'],
        ['events', 'OrderPlaced, OrderPaid, OrderShipped'],
        ['key', 'order id'],
        ['schema', 'OrderEvent, compatibility checked'],
        ['partitions', '3'],
        ['retention', '7 days'],
      ],
    },
    {
      id: 'readers',
      label: 'Readers depend on all of it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-fulfil', label: 'Fulfilment', sub: 'needs the key', pattern: 'service', icon: 'package' },
        { id: 'r-analytics', label: 'Analytics', sub: 'needs the schema', pattern: 'service', icon: 'barchart' },
        { id: 'r-replay', label: 'Replays', sub: 'need the retention', pattern: 'service', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'owner', target: 'card', label: 'owns and publishes' },
    { source: 'card', target: 'readers', label: 'contract' },
  ],
}
