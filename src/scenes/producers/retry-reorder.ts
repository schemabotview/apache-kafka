import type { Scene } from '@graphlearning/flow'

// §3.5 — two batches in flight to the same partition without idempotence. The first fails and is
// retried after the second has succeeded, so PAID lands before PLACED.
export const retryReorder: Scene = {
  id: 'retry-reorder',
  title: 'Retries can reorder',
  flow: 'TB',
  nodes: [
    {
      id: 'inflight',
      label: 'Two batches in flight to partition 1',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'batch-a', label: 'Batch A', sub: 'o-1041 PLACED', pattern: 'service', icon: 'package' },
        { id: 'batch-b', label: 'Batch B', sub: 'o-1041 PAID', pattern: 'service', icon: 'package' },
      ],
    },
    {
      id: 'events',
      label: 'What the broker sees',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'e1', label: 'A fails', sub: 'leader just moved', pattern: 'warn', icon: 'ban' },
        { id: 'e2', label: 'B succeeds', sub: 'offset 2: PAID', pattern: 'storage', icon: 'circlecheck' },
        { id: 'e3', label: 'A retried', sub: 'offset 3: PLACED', pattern: 'storage', icon: 'repeat' },
      ],
    },
    {
      id: 'fixes',
      label: 'Keeping order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'f-idem', label: 'Idempotence on', sub: 'order kept, up to 5 in flight', pattern: 'service', icon: 'hash' },
        { id: 'f-one', label: '1 in flight', sub: 'no idempotence: slower but ordered', pattern: 'network', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'inflight', target: 'events', label: 'max.in.flight > 1' },
    { source: 'events', target: 'fixes', label: 'avoid with' },
  ],
}
