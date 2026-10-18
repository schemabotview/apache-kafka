import type { Scene } from '@graphlearning/flow'

// §6.1 — at-most-once and at-least-once are not settings; they are the order in which a consumer
// commits and does its work, judged by what a crash in between costs.
export const deliverySemantics: Scene = {
  id: 'delivery-semantics',
  title: 'Delivery semantics are an ordering choice',
  flow: 'TB',
  nodes: [
    {
      id: 'choices',
      label: 'Two orders for the same two steps',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'at-most',
          label: 'At most once',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'm1', label: '1. Commit', sub: 'offset moves on', pattern: 'storage', icon: 'circlecheck' },
            { id: 'm2', label: '2. Process', sub: 'ship the order', pattern: 'service', icon: 'package' },
            { id: 'm3', label: 'Crash between', sub: 'order never shipped', pattern: 'warn', icon: 'skull' },
          ],
        },
        {
          id: 'at-least',
          label: 'At least once',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'l1', label: '1. Process', sub: 'ship the order', pattern: 'service', icon: 'package' },
            { id: 'l2', label: '2. Commit', sub: 'offset moves on', pattern: 'storage', icon: 'circlecheck' },
            { id: 'l3', label: 'Crash between', sub: 'shipped twice', pattern: 'warn', icon: 'copy' },
          ],
        },
      ],
    },
    { id: 'goal', label: 'Usual goal', sub: 'at least once, with harmless repeats', pattern: 'service', icon: 'shieldcheck' },
  ],
  edges: [{ source: 'choices', target: 'goal', label: 'so' }],
}
