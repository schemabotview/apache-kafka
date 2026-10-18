import type { Scene } from '@graphlearning/flow'

// §2.4 — the same five keys before and after growing orders from 3 to 4 partitions. Every placement
// is murmur2(key) mod n: four of the five keys move, and only new records go to the new place.
export const addingPartitions: Scene = {
  id: 'adding-partitions',
  title: 'Adding partitions moves keys',
  flow: 'TB',
  nodes: [
    {
      id: 'before',
      label: 'Before: 3 partitions',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'b-p0',
          label: 'Partition 0',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'b-1040', label: 'o-1040', sub: 'hash mod 3 = 0', pattern: 'storage', icon: 'key' },
            { id: 'b-1047', label: 'o-1047', sub: 'hash mod 3 = 0', pattern: 'storage', icon: 'key' },
          ],
        },
        {
          id: 'b-p1',
          label: 'Partition 1',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'b-1041', label: 'o-1041', sub: 'hash mod 3 = 1', pattern: 'storage', icon: 'key' },
            { id: 'b-1043', label: 'o-1043', sub: 'hash mod 3 = 1', pattern: 'storage', icon: 'key' },
          ],
        },
        {
          id: 'b-p2',
          label: 'Partition 2',
          pattern: 'group',
          cols: 1,
          children: [{ id: 'b-1042', label: 'o-1042', sub: 'hash mod 3 = 2', pattern: 'storage', icon: 'key' }],
        },
      ],
    },
    {
      id: 'after',
      label: 'After: 4 partitions — new records only',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'a-p0',
          label: 'Partition 0',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'a-1041', label: 'o-1041', sub: 'moved from 1', pattern: 'warn', icon: 'swap' },
            { id: 'a-1042', label: 'o-1042', sub: 'moved from 2', pattern: 'warn', icon: 'swap' },
          ],
        },
        {
          id: 'a-p1',
          label: 'Partition 1',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'a-1040', label: 'o-1040', sub: 'moved from 0', pattern: 'warn', icon: 'swap' },
            { id: 'a-1043', label: 'o-1043', sub: 'stays in 1', pattern: 'service', icon: 'key' },
            { id: 'a-1047', label: 'o-1047', sub: 'moved from 0', pattern: 'warn', icon: 'swap' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'before', target: 'after', label: 'hash(key) mod 4' }],
}
