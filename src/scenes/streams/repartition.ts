import type { Scene } from '@graphlearning/flow'

// §8.3 — stateless steps run where the record already is. Changing the key before grouping forces a
// repartition: Streams writes to an internal topic keyed by the new key, and reads it back.
export const repartition: Scene = {
  id: 'repartition',
  title: 'Stateless steps and repartitioning',
  flow: 'LR',
  nodes: [
    {
      id: 'stateless',
      label: 'Sub-topology 0: no shuffle',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'in', label: 'orders', sub: 'key: order id', pattern: 'storage', icon: 'scroll' },
        { id: 'filter', label: 'filter', sub: 'keep PAID', pattern: 'service', icon: 'funnel' },
        { id: 'rekey', label: 'groupBy(sku)', sub: 'new key: must regroup', pattern: 'warn', icon: 'swap' },
      ],
      edges: [
        { source: 'in', target: 'filter' },
        { source: 'filter', target: 'rekey' },
      ],
    },
    {
      id: 'regrouped',
      label: 'Sub-topology 1: by SKU',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'internal', label: 'Repartition topic', sub: 'keyed by sku', pattern: 'storage', icon: 'scroll' },
        { id: 'agg', label: 'aggregate', sub: 'each SKU in one task', pattern: 'service', icon: 'sigma' },
        { id: 'out', label: 'sales-per-sku', sub: 'running totals', pattern: 'storage', icon: 'scroll' },
      ],
      edges: [
        { source: 'internal', target: 'agg' },
        { source: 'agg', target: 'out' },
      ],
    },
  ],
  edges: [{ source: 'stateless', target: 'regrouped', label: 'write by sku, read back' }],
}
