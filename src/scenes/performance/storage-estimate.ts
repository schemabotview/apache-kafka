import type { Scene } from '@graphlearning/flow'

// §10.2 — a worked storage estimate with units at every step, and the things it leaves out.
// 200 × 1 KiB × 86 400 s = 16.5 GiB/day; × 7 = 115 GiB; ÷ 2 compression = 58 GiB; × RF 3 = 173 GiB.
export const storageEstimate: Scene = {
  id: 'storage-estimate',
  title: 'A storage estimate',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'Disk for the orders topic',
      sub: 'every step carries its unit',
      headers: ['Step', 'Calculation', 'Result'],
      values: [
        ['ingress', '200 records/s × 1 KiB', '200 KiB/s'],
        ['per day', '200 KiB/s × 86 400 s', '16.5 GiB/day'],
        ['retention', '16.5 GiB/day × 7 days', '115 GiB'],
        ['compression', '÷ 2, measured on samples', '58 GiB'],
        ['replication', '× replication factor 3', '173 GiB, cluster-wide'],
        ['per broker', '÷ 3 brokers, if balanced', '58 GiB each'],
      ],
    },
    {
      id: 'excluded',
      label: 'Not included — add separately',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'x-other', label: 'Other topics', sub: 'priced-orders, internal topics', pattern: 'warn', icon: 'scroll' },
        { id: 'x-segment', label: 'Active segments', sub: 'kept past retention', pattern: 'warn', icon: 'file' },
        { id: 'x-growth', label: 'Growth', sub: 'next year’s volume', pattern: 'warn', icon: 'barchart' },
        { id: 'x-headroom', label: 'Headroom', sub: 'never plan to fill disks', pattern: 'warn', icon: 'gauge' },
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'excluded', label: 'plus' }],
}
