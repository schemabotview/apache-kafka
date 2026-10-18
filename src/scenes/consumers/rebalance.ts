import type { Scene } from '@graphlearning/flow'

// §4.5 — a third member joins and partition 2 moves to it. Work in flight on the old owner has to be
// finished or abandoned, and its offset committed, before the new owner starts reading.
export const rebalance: Scene = {
  id: 'rebalance',
  title: 'A rebalance moves a partition',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'Member 3 joins group fulfilment',
      sub: 'cooperative: only partition 2 moves, from member 2 to 3',
      headers: ['Step', 'Member 2', 'Member 3'],
      values: [
        ['1', 'owns 1 and 2, processing offset 41', 'starts, asks to join'],
        ['2', 'told: give up partition 2', 'waits'],
        ['3', 'onPartitionsRevoked: finish, commit 42', ''],
        ['4', 'keeps partition 1', 'assigned partition 2'],
        ['5', '', 'reads from committed 42'],
      ],
    },
    {
      id: 'risks',
      label: 'If step 3 is skipped',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-dup', label: 'Repeated work', sub: 'member 3 replays from an older commit', pattern: 'warn', icon: 'copy' },
        { id: 'k-both', label: 'Overlap', sub: 'member 2 workers still on offset 41', pattern: 'warn', icon: 'users' },
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'risks', label: 'without a revoke handler' }],
}
