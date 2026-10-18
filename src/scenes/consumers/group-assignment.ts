import type { Scene } from '@graphlearning/flow'

// §4.4 — one group, three partitions, four members. Each partition has exactly one owner in the
// group, so the fourth member is idle; a second application is simply a second group.
export const groupAssignment: Scene = {
  id: 'group-assignment',
  title: 'Assigning partitions to members',
  flow: 'TB',
  nodes: [
    {
      id: 'topic',
      label: 'orders — 3 partitions',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p0', label: 'Partition 0', sub: 'one owner', pattern: 'storage', icon: 'harddrive' },
        { id: 'p1', label: 'Partition 1', sub: 'one owner', pattern: 'storage', icon: 'harddrive' },
        { id: 'p2', label: 'Partition 2', sub: 'one owner', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'fulfilment',
      label: 'Group fulfilment — 4 members',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'm1', label: 'Member 1', sub: 'partition 0', pattern: 'service', icon: 'package' },
        { id: 'm2', label: 'Member 2', sub: 'partition 1', pattern: 'service', icon: 'package' },
        { id: 'm3', label: 'Member 3', sub: 'partition 2', pattern: 'service', icon: 'package' },
        { id: 'm4', label: 'Member 4', sub: 'idle: no partition left', pattern: 'warn', icon: 'package' },
      ],
    },
    {
      id: 'analytics',
      label: 'Group analytics — 1 member',
      pattern: 'group',
      cols: 1,
      children: [{ id: 'a1', label: 'Member 1', sub: 'partitions 0, 1 and 2', pattern: 'service', icon: 'barchart' }],
    },
  ],
  edges: [
    { source: 'topic', target: 'fulfilment', label: 'split within a group' },
    { source: 'fulfilment', target: 'analytics', dashed: true, label: 'unaffected' },
  ],
}
