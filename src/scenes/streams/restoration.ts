import type { Scene } from '@graphlearning/flow'

// §8.4 — instance 1 dies. Its tasks move to instance 2, which rebuilds each store from the
// changelog before processing resumes. A standby replica makes that wait short.
export const restoration: Scene = {
  id: 'restoration',
  title: 'Restoring state after a failure',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'Instance 1 is lost; task 0_1 moves to instance 2',
      sub: 'num.standby.replicas = 0, the default',
      headers: ['Step', 'Instance 2'],
      values: [
        ['1', 'is assigned task 0_1'],
        ['2', 'reads the changelog from the start'],
        ['3', 'rebuilds the local store'],
        ['4', 'resumes from the committed offset'],
      ],
    },
    {
      id: 'notes',
      label: 'What to know',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'n-wait', label: 'Restore time', sub: 'grows with state size', pattern: 'warn', icon: 'clock' },
        { id: 'n-standby', label: 'Standby replica', sub: 'a warm copy elsewhere', pattern: 'service', icon: 'copy' },
        { id: 'n-repeat', label: 'At least once', sub: 'records after the commit repeat', pattern: 'warn', icon: 'repeat' },
        { id: 'n-effects', label: 'Not effects', sub: 'restores state, not emails', pattern: 'warn', icon: 'bell' },
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'notes', label: 'so' }],
}
