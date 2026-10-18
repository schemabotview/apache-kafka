import type { Scene } from '@graphlearning/flow'

// §2.2 — four candidate keys for the orders topic, each judged on what it keeps in order and how
// evenly it spreads load. Region is the trap: three values cannot spread across six partitions.
export const keyChoices: Scene = {
  id: 'key-choices',
  title: 'Choosing a key',
  cols: 2,
  nodes: [
    {
      id: 'k-order',
      label: 'Key: order id',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'k-order-keeps', label: 'Keeps', sub: 'one order in order', pattern: 'service', icon: 'circlecheck' },
        { id: 'k-order-spread', label: 'Spread', sub: 'even: many orders', pattern: 'service', icon: 'scale' },
      ],
    },
    {
      id: 'k-customer',
      label: 'Key: customer id',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'k-customer-keeps', label: 'Keeps', sub: 'all of one customer', pattern: 'service', icon: 'circlecheck' },
        { id: 'k-customer-spread', label: 'Spread', sub: 'uneven if a few buy a lot', pattern: 'warn', icon: 'scale' },
      ],
    },
    {
      id: 'k-region',
      label: 'Key: region',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'k-region-keeps', label: 'Keeps', sub: 'a whole region in order', pattern: 'service', icon: 'globe' },
        { id: 'k-region-spread', label: 'Spread', sub: '3 values, at most 3 partitions', pattern: 'warn', icon: 'scale' },
      ],
    },
    {
      id: 'k-none',
      label: 'No key',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'k-none-keeps', label: 'Keeps', sub: 'nothing in order', pattern: 'warn', icon: 'ban' },
        { id: 'k-none-spread', label: 'Spread', sub: 'even across partitions', pattern: 'service', icon: 'scale' },
      ],
    },
  ],
  edges: [],
}
