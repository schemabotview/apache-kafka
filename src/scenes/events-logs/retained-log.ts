import type { Scene } from '@graphlearning/flow'

// §1.2 — one partition of the orders log with two readers at different positions. Nothing is
// removed when a reader moves on; retention, not reading, is what eventually deletes records.
export const retainedLog: Scene = {
  id: 'retained-log',
  title: 'Reading does not delete',
  flow: 'TB',
  nodes: [
    { id: 'fulfilment', label: 'Fulfilment', sub: 'next to read: offset 4', pattern: 'service', icon: 'package' },
    {
      id: 'log',
      label: 'orders log — records stay after they are read',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r0', label: 'offset 0', sub: 'o-1040 PLACED', pattern: 'storage', icon: 'file' },
        { id: 'r1', label: 'offset 1', sub: 'o-1047 PLACED', pattern: 'storage', icon: 'file' },
        { id: 'r2', label: 'offset 2', sub: 'o-1040 PAID', pattern: 'storage', icon: 'file' },
        { id: 'r3', label: 'offset 3', sub: 'o-1047 PAID', pattern: 'storage', icon: 'file' },
        { id: 'r4', label: 'offset 4', sub: 'o-1040 SHIPPED', pattern: 'storage', icon: 'file' },
        { id: 'r5', label: 'offset 5', sub: 'next append goes here', pattern: 'external', icon: 'pencil' },
      ],
    },
    { id: 'analytics', label: 'Analytics', sub: 'next to read: offset 1', pattern: 'service', icon: 'barchart' },
    { id: 'retention', label: 'Retention', sub: 'deletes old records by age or size', pattern: 'warn', icon: 'trash' },
  ],
  edges: [
    { source: 'fulfilment', target: 'log', label: 'position 4' },
    { source: 'log', target: 'analytics', label: 'position 1' },
    { source: 'analytics', target: 'retention', dashed: true, label: 'not the reader' },
  ],
}
