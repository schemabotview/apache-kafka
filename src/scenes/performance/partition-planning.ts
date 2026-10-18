import type { Scene } from '@graphlearning/flow'

// §10.3 — sizing the partition count from the slowest consumer's per-partition rate at peak, then
// the costs that stop "more partitions" from being free.
export const partitionPlanning: Scene = {
  id: 'partition-planning',
  title: 'Planning partitions',
  flow: 'TB',
  nodes: [
    {
      id: 'calc',
      kind: 'table',
      label: 'How many partitions for orders?',
      sub: 'driven by the slowest consumer at peak',
      headers: ['Input', 'Value'],
      values: [
        ['peak rate', '2 000 records/s'],
        ['fulfilment, per member', '100 records/s, measured'],
        ['members needed at peak', '2 000 ÷ 100 = 20'],
        ['partitions, with room to grow', '24'],
      ],
    },
    {
      id: 'costs',
      label: 'What each extra partition costs',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-files', label: 'Files', sub: 'segments and indexes per replica', pattern: 'warn', icon: 'folder' },
        { id: 'c-memory', label: 'Memory', sub: 'batches and buffers per partition', pattern: 'warn', icon: 'memory' },
        { id: 'c-failover', label: 'Failover work', sub: 'more leaders to move', pattern: 'warn', icon: 'repeat' },
        { id: 'c-batches', label: 'Smaller batches', sub: 'traffic spread thinner', pattern: 'warn', icon: 'boxes' },
      ],
    },
  ],
  edges: [{ source: 'calc', target: 'costs', label: 'but' }],
}
