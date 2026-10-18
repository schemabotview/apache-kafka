import type { Scene } from '@graphlearning/flow'

// §7.7 — a sink task writes to the warehouse, then dies before its consumer offsets are committed.
// On restart it writes the same records again: harmless with upserts, not with plain inserts.
export const sinkRepeat: Scene = {
  id: 'sink-repeat',
  title: 'A sink restart repeats writes',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'orders-warehouse task 1, partition 1',
      sub: 'offsets are committed periodically, not per write',
      headers: ['Step', 'Task', 'Warehouse'],
      values: [
        ['1', 'committed offset 30', ''],
        ['2', 'writes offsets 30 to 39', '10 rows written'],
        ['3', 'worker dies before committing 40', ''],
        ['4', 'restarts from offset 30', '30 to 39 written again'],
      ],
    },
    {
      id: 'modes',
      label: 'What the repeat does',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'm-insert', label: 'Plain insert', sub: 'duplicate rows', pattern: 'warn', icon: 'copy' },
        { id: 'm-upsert', label: 'Upsert by key', sub: 'same rows, harmless', pattern: 'service', icon: 'circlecheck' },
        { id: 'm-check', label: 'Check per connector', sub: 'its documented guarantee', pattern: 'external', icon: 'search' },
        { id: 'm-eos', label: 'Exactly-once source', sub: 'distributed mode, if supported', pattern: 'network', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [{ source: 'timeline', target: 'modes', label: 'so' }],
}
