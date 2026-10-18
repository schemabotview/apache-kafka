import type { Scene } from '@graphlearning/flow'

// §10.1 — the orders workload written down as numbers, which every later estimate depends on. All
// figures are assumptions for this example, stated so they can be checked and changed.
export const workloadModel: Scene = {
  id: 'workload-model',
  title: 'A workload model',
  flow: 'TB',
  nodes: [
    {
      id: 'model',
      kind: 'table',
      label: 'The orders workload — assumptions, not measurements',
      sub: 'write these down before sizing anything',
      headers: ['Dimension', 'Value', 'Why it matters'],
      values: [
        ['average rate', '200 records/s', 'storage and steady load'],
        ['peak rate', '2 000 records/s, sale days', 'partitions and headroom'],
        ['record size', '1 KiB average', 'bytes, not records, fill disks'],
        ['fan-out', '3 consumer groups', 'reads are 3× the writes'],
        ['key skew', 'top SKU 5% of orders', 'hot partitions'],
        ['retention', '7 days', 'disk and replay horizon'],
      ],
    },
    {
      id: 'sources',
      label: 'Where the numbers come from',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 's-history', label: 'Order history', sub: 'last year, by hour', pattern: 'storage', icon: 'history' },
        { id: 's-sample', label: 'Sample records', sub: 'real sizes, serialized', pattern: 'storage', icon: 'ruler' },
        { id: 's-plans', label: 'Business plans', sub: 'next sale, growth', pattern: 'user', icon: 'calendar' },
      ],
    },
  ],
  edges: [{ source: 'model', target: 'sources', dashed: true, label: 'based on' }],
}
