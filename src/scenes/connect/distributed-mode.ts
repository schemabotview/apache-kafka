import type { Scene } from '@graphlearning/flow'

// §7.1 — standalone versus distributed execution. In distributed mode the workers form a group and
// share connectors and tasks; when a worker dies its tasks are restarted elsewhere.
export const distributedMode: Scene = {
  id: 'distributed-mode',
  title: 'Standalone and distributed workers',
  flow: 'TB',
  nodes: [
    {
      id: 'modes',
      kind: 'table',
      label: 'Two ways to run Connect',
      sub: 'same connectors, different operation',
      headers: ['', 'Standalone', 'Distributed'],
      values: [
        ['workers', 'one process', 'a group of processes'],
        ['configuration', 'local properties files', 'REST API'],
        ['offsets stored in', 'a local file', 'a Kafka topic'],
        ['worker failure', 'everything stops', 'tasks move to others'],
        ['use for', 'development, edge cases', 'production'],
      ],
    },
    {
      id: 'cluster',
      label: 'Distributed: group connect-cluster',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'w1', label: 'Worker 1', sub: 'orders-cdc task 0', pattern: 'service', icon: 'server' },
        { id: 'w2', label: 'Worker 2', sub: 'orders-search task 0', pattern: 'service', icon: 'server' },
        { id: 'w3', label: 'Worker 3 fails', sub: 'its task 1 moves to worker 1', pattern: 'warn', icon: 'skull' },
      ],
    },
  ],
  edges: [{ source: 'modes', target: 'cluster', label: 'in production' }],
}
