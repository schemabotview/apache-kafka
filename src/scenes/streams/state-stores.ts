import type { Scene } from '@graphlearning/flow'

// §8.4 — where an aggregate's state lives. Each task keeps a local store (RocksDB by default) and
// every update is also written to a compacted changelog topic, from which the store can be rebuilt.
export const stateStores: Scene = {
  id: 'state-stores',
  title: 'State stores and changelogs',
  flow: 'TB',
  nodes: [
    { id: 'input', label: 'Paid orders', sub: 'keyed by sku', pattern: 'storage', icon: 'scroll' },
    {
      id: 'task',
      label: 'Task 0_1 on instance 1',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'proc', label: 'aggregate', sub: 'adds each order', pattern: 'service', icon: 'sigma' },
        { id: 'store', label: 'Local store', sub: 'RocksDB on local disk', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'changelog',
      kind: 'table',
      label: 'Changelog topic (compacted)',
      sub: 'sales-totals-…-changelog',
      headers: ['Key', 'Value'],
      values: [
        ['mug-blue @ 09:00', '24.00'],
        ['mug-blue @ 09:00', '36.00'],
        ['tea-tin @ 09:00', '8.50'],
      ],
    },
  ],
  edges: [
    { source: 'input', target: 'task' },
    { source: 'task', target: 'changelog', label: 'every update' },
  ],
}
