import type { Scene } from '@graphlearning/flow'

// §6.3 — one partition holding committed, aborted and still-open transactional records, and what
// each isolation level returns. read_committed stops at the last stable offset.
export const isolation: Scene = {
  id: 'isolation',
  title: 'Consumer isolation levels',
  flow: 'TB',
  nodes: [
    {
      id: 'partition',
      kind: 'table',
      label: 'priced-orders, partition 1',
      sub: 'four transactions; commit and abort markers not shown',
      headers: ['Offset', 'Record', 'Transaction'],
      values: [
        ['20', 'o-1041 priced', 'T1: committed'],
        ['21', 'o-1043 priced', 'T2: aborted'],
        ['22', 'o-1050 priced', 'T3: still open'],
        ['23', 'o-1046 priced', 'T4: committed'],
      ],
    },
    {
      id: 'levels',
      label: 'What a consumer receives',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-uncommitted', label: 'Uncommitted', sub: 'the default: all four', pattern: 'warn', icon: 'circleslash' },
        { id: 'l-committed', label: 'Committed', sub: 'only 20, then waits', pattern: 'service', icon: 'lock' },
      ],
    },
    { id: 'lso', label: 'Waits at 22', sub: 'until T3 ends, up to its timeout', pattern: 'warn', icon: 'clock' },
  ],
  edges: [
    { source: 'partition', target: 'levels', label: 'isolation.level' },
    { source: 'levels', target: 'lso', dashed: true, label: 'last stable offset' },
  ],
}
