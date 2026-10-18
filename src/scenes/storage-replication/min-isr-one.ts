import type { Scene } from '@graphlearning/flow'

// §5.3 — why acks=all alone is not enough. With the default min.insync.replicas = 1, the ISR can
// shrink to the leader alone, and acks=all then acknowledges a single copy.
export const minIsrOne: Scene = {
  id: 'min-isr-one',
  title: 'acks=all with min ISR 1',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'RF 3, acks=all, min.insync.replicas = 1 (the default)',
      sub: 'both followers fall behind, then the leader dies',
      headers: ['Step', 'ISR', 'What happens'],
      values: [
        ['1', '2, 3, 1', 'writes copied to all three'],
        ['2', '2', 'followers 30 s behind: ISR is the leader alone'],
        ['3', '2', 'o-1041 PAID acknowledged with one copy'],
        ['4', '—', "broker 2's disk fails: the only copy is gone"],
      ],
    },
    {
      id: 'compare',
      label: 'The same failure with min.insync.replicas = 2',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-refuse', label: 'Step 3 refused', sub: 'NOT_ENOUGH_REPLICAS', pattern: 'warn', icon: 'ban' },
        { id: 'c-safe', label: 'Nothing lost', sub: 'producer retries later', pattern: 'service', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [{ source: 'timeline', target: 'compare', label: 'instead' }],
}
