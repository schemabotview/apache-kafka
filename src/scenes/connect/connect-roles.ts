import type { Scene } from '@graphlearning/flow'

// §7.1 — the pieces of Kafka Connect: workers run connectors, connectors split their work into
// tasks, and tasks move records between Kafka and an external system.
export const connectRoles: Scene = {
  id: 'connect-roles',
  title: 'Workers, connectors and tasks',
  flow: 'TB',
  nodes: [
    { id: 'db', label: 'Orders database', sub: 'external system', pattern: 'external', icon: 'database' },
    {
      id: 'worker',
      label: 'Connect worker — a JVM process',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'source',
          label: 'Source connector: orders-cdc',
          pattern: 'group',
          cols: 1,
          children: [{ id: 'src-task', label: 'Task 0', sub: 'reads the change log', pattern: 'service', icon: 'gears' }],
        },
        {
          id: 'sink',
          label: 'Sink connector: orders-search',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'sink-t0', label: 'Task 0', sub: 'partitions 0 and 1', pattern: 'service', icon: 'gears' },
            { id: 'sink-t1', label: 'Task 1', sub: 'partition 2', pattern: 'service', icon: 'gears' },
          ],
        },
      ],
    },
    { id: 'kafka', label: 'orders topic', sub: 'between the two', pattern: 'storage', icon: 'scroll' },
    { id: 'search', label: 'Search index', sub: 'external system', pattern: 'external', icon: 'search' },
  ],
  edges: [
    { source: 'db', target: 'worker', label: 'source pulls' },
    { source: 'worker', target: 'kafka', label: 'writes and reads' },
    { source: 'kafka', target: 'search', label: 'sink pushes' },
  ],
}
