import type { Scene } from '@graphlearning/flow'

// §1.4 — the four roles in one picture: a producer, the brokers that store partitions, and two
// consumer groups that read the same topic without affecting each other.
export const clusterRoles: Scene = {
  id: 'cluster-roles',
  title: 'Brokers, producers and consumer groups',
  flow: 'TB',
  nodes: [
    { id: 'producer', label: 'Producer', sub: 'checkout service', pattern: 'service', icon: 'server' },
    {
      id: 'cluster',
      label: 'Kafka cluster — brokers store the partitions',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b1', label: 'Broker 1', sub: 'stores orders-0', pattern: 'storage', icon: 'harddrive' },
        { id: 'b2', label: 'Broker 2', sub: 'stores orders-1', pattern: 'storage', icon: 'harddrive' },
        { id: 'b3', label: 'Broker 3', sub: 'stores orders-2', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'groups',
      label: 'Two consumer groups, each reading every record',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'g-fulfil',
          label: 'Group: fulfilment',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'f1', label: 'Member A', sub: 'partitions 0 and 1', pattern: 'service', icon: 'package' },
            { id: 'f2', label: 'Member B', sub: 'partition 2', pattern: 'service', icon: 'package' },
          ],
        },
        {
          id: 'g-analytics',
          label: 'Group: analytics',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'a1', label: 'Member A', sub: 'partitions 0, 1 and 2', pattern: 'service', icon: 'barchart' },
          ],
        },
      ],
    },
  ],
  edges: [
    { source: 'producer', target: 'cluster', label: 'writes' },
    { source: 'cluster', target: 'groups', label: 'each group reads all' },
  ],
}
