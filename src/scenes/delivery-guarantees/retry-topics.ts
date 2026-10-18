import type { Scene } from '@graphlearning/flow'

// §6.7 — a poison record moved aside so the partition keeps flowing. Moving it costs ordering: the
// next event for the same order can be processed before the retried one.
export const retryTopics: Scene = {
  id: 'retry-topics',
  title: 'Retry topics and quarantine',
  flow: 'TB',
  nodes: [
    { id: 'main', label: 'orders consumer', sub: 'o-1041 PAID fails', pattern: 'service', icon: 'package' },
    {
      id: 'paths',
      label: 'Where a failing record goes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-retry', label: 'orders-retry', sub: 'try again after 1 min', pattern: 'network', icon: 'clock' },
        { id: 'p-dlq', label: 'orders-dlq', sub: 'quarantine after 3 tries', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'reorder',
      kind: 'table',
      label: 'The cost: o-1041 is now out of order',
      sub: 'main topic keeps flowing while PAID waits',
      headers: ['Time', 'Processed', 'From'],
      values: [
        ['09:14:05', 'o-1041 PAID fails', 'orders'],
        ['09:14:30', 'o-1041 SHIPPED', 'orders'],
        ['09:15:05', 'o-1041 PAID', 'orders-retry'],
      ],
    },
  ],
  edges: [
    { source: 'main', target: 'paths', label: 'on failure' },
    { source: 'paths', target: 'reorder', label: 'but' },
  ],
}
