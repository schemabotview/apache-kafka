import type { Scene } from '@graphlearning/flow'

// §11.2 — what a reassignment preview tells you, and why "rollback" is just another reassignment
// that copies data again.
export const reassignmentLimits: Scene = {
  id: 'reassignment-limits',
  title: 'Previews and rollback limits',
  flow: 'TB',
  nodes: [
    {
      id: 'preview',
      kind: 'table',
      label: 'The generated plan for orders, before executing',
      sub: 'save the current assignment: it is the rollback plan',
      headers: ['Partition', 'Current replicas', 'Proposed replicas'],
      values: [
        ['orders-0', '1, 2, 3', '4, 2, 3'],
        ['orders-1', '2, 3, 1', '2, 4, 1'],
        ['orders-2', '3, 1, 2', '3, 1, 4'],
      ],
    },
    {
      id: 'limits',
      label: 'Limits of rolling back',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-again', label: 'Copies again', sub: 'rollback is a reassignment', pattern: 'warn', icon: 'repeat' },
        { id: 'l-time', label: 'Takes as long', sub: 'same data, same throttle', pattern: 'warn', icon: 'clock' },
        { id: 'l-cancel', label: 'Cancel', sub: '--cancel stops one in progress', pattern: 'network', icon: 'ban' },
        { id: 'l-small', label: 'Move in batches', sub: 'a few partitions at a time', pattern: 'service', icon: 'boxes' },
      ],
    },
  ],
  edges: [{ source: 'preview', target: 'limits', label: 'and know' }],
}
