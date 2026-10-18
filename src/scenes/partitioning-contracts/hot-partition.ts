import type { Scene } from '@graphlearning/flow'

// §2.2 — keying by region on a 3-partition topic. murmur2 sends eu AND us to partition 1, apac to
// partition 2, and nothing to partition 0: the busiest two regions share one partition.
export const hotPartition: Scene = {
  id: 'hot-partition',
  title: 'A hot partition',
  flow: 'TB',
  nodes: [
    { id: 'producer', label: 'Checkout', sub: 'key = region', pattern: 'service', icon: 'server' },
    {
      id: 'topic',
      label: 'orders-by-region — 3 partitions',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p0', label: 'Partition 0', sub: 'no region hashes here: idle', pattern: 'storage', icon: 'harddrive' },
        { id: 'p1', label: 'Partition 1', sub: 'eu + us: 80% of orders', pattern: 'warn', icon: 'harddrive' },
        { id: 'p2', label: 'Partition 2', sub: 'apac: 20% of orders', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'group',
      label: 'Group: fulfilment — 3 members',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm0', label: 'Member A', sub: 'nothing to do', pattern: 'service', icon: 'package' },
        { id: 'm1', label: 'Member B', sub: 'falling behind', pattern: 'warn', icon: 'package' },
        { id: 'm2', label: 'Member C', sub: 'mostly idle', pattern: 'service', icon: 'package' },
      ],
    },
    { id: 'fix', label: 'Adding members', sub: 'does not help: one reader per partition', pattern: 'warn', icon: 'users' },
  ],
  edges: [
    { source: 'producer', target: 'topic', label: 'hash(region) mod 3' },
    { source: 'topic', target: 'group', label: 'one member per partition' },
    { source: 'group', target: 'fix', dashed: true },
  ],
}
