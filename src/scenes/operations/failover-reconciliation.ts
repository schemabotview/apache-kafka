import type { Scene } from '@graphlearning/flow'

// §11.5 — fulfilment fails over from eu-west to us-east. Mirroring is asynchronous, so the newest
// orders may not have arrived, and translated offsets lag, so some orders repeat.
export const failoverReconciliation: Scene = {
  id: 'failover-reconciliation',
  title: 'Failover needs reconciliation',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'eu-west is lost at 10:00:00',
      sub: 'last checkpoint 09:59:00; mirroring 20 s behind',
      headers: ['Orders placed', 'In us-east?', 'Fulfilment after failover'],
      values: [
        ['before 09:59:00', 'yes', 'skipped: the last checkpoint covers them'],
        ['09:59:00 to 09:59:40', 'yes', 'read again: shipped twice without dedupe'],
        ['09:59:40 to 10:00:00', 'no: not yet mirrored', 'missing until eu-west returns'],
      ],
    },
    {
      id: 'reconcile',
      label: 'Reconcile, then continue',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-dedupe', label: 'Dedupe', sub: 'by eventId: chapter 6', pattern: 'service', icon: 'fingerprint' },
        { id: 'r-gap', label: 'Find the gap', sub: 'compare with the order database', pattern: 'service', icon: 'search' },
        { id: 'r-replay', label: 'Replay the gap', sub: 'when eu-west returns', pattern: 'service', icon: 'repeat' },
        { id: 'r-decide', label: 'Decide in advance', sub: 'who may fail over, and when', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [{ source: 'timeline', target: 'reconcile', label: 'so' }],
}
