import type { Scene } from '@graphlearning/flow'

// §8.6 — a windowed inner join of orders and payments, keyed by order id, 10 minutes apart at most.
// Only pairs inside the window produce output; unmatched records produce nothing.
export const joinOutputs: Scene = {
  id: 'join-outputs',
  title: 'What a windowed join emits',
  flow: 'TB',
  nodes: [
    {
      id: 'inputs',
      kind: 'table',
      label: 'Inputs, keyed by order id',
      sub: 'JoinWindows.ofTimeDifferenceAndGrace(10 min, 1 min)',
      headers: ['Stream', 'Key', 'Event time'],
      values: [
        ['orders', 'o-1041', '09:14'],
        ['payments', 'o-1041', '09:16'],
        ['orders', 'o-1043', '09:14'],
        ['payments', 'o-1043', '09:31'],
        ['orders', 'o-1050', '09:12'],
      ],
    },
    {
      id: 'outputs',
      kind: 'table',
      label: 'Inner join output',
      sub: 'one row per matched pair',
      headers: ['Key', 'Output', 'Why'],
      values: [
        ['o-1041', 'order + payment', '2 min apart'],
        ['o-1043', 'nothing', '17 min apart'],
        ['o-1050', 'nothing', 'no payment yet'],
      ],
    },
  ],
  edges: [{ source: 'inputs', target: 'outputs', label: 'join' }],
}
