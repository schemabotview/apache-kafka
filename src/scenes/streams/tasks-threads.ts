import type { Scene } from '@graphlearning/flow'

// §8.1 — how a Streams application scales. One task per input partition; tasks are spread over the
// threads of every running instance that shares the same application.id.
export const tasksThreads: Scene = {
  id: 'tasks-threads',
  title: 'Tasks, threads and instances',
  flow: 'TB',
  nodes: [
    { id: 'topic', label: 'orders', sub: '3 partitions: tasks 0_0 to 0_2', pattern: 'storage', icon: 'scroll' },
    {
      id: 'instances',
      label: 'application.id sales-totals — 2 instances',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'i1',
          label: 'Instance 1, 2 threads',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 't1', label: 'Thread 1', sub: 'task 0_0', pattern: 'service', icon: 'gears' },
            { id: 't2', label: 'Thread 2', sub: 'task 0_1', pattern: 'service', icon: 'gears' },
          ],
        },
        {
          id: 'i2',
          label: 'Instance 2, 2 threads',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 't3', label: 'Thread 1', sub: 'task 0_2', pattern: 'service', icon: 'gears' },
            { id: 't4', label: 'Thread 2', sub: 'idle: no task left', pattern: 'warn', icon: 'gears' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'topic', target: 'instances', label: 'tasks spread over threads' }],
}
