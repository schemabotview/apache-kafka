import type { Scene } from '@graphlearning/flow'

// §5.6 — the two planes of a KRaft cluster. Controllers agree on metadata through their own
// replicated log; brokers follow that log and serve the data plane.
export const kraftPlanes: Scene = {
  id: 'kraft-planes',
  title: 'Metadata plane and data plane',
  flow: 'TB',
  nodes: [
    {
      id: 'metadata',
      label: 'Metadata plane — controller quorum',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c1', label: 'Controller 1', sub: 'active: decides', pattern: 'service', icon: 'brain' },
        { id: 'c2', label: 'Controller 2', sub: 'voter, hot standby', pattern: 'network', icon: 'brain' },
        { id: 'c3', label: 'Controller 3', sub: 'voter, hot standby', pattern: 'network', icon: 'brain' },
      ],
    },
    {
      id: 'log',
      kind: 'table',
      label: 'Metadata log',
      sub: 'replicated across the controllers',
      headers: ['Record', 'Example'],
      values: [
        ['topic created', 'orders, 3 partitions'],
        ['partition changed', 'orders-1 leader 2, ISR 2, 3'],
        ['broker registered', 'broker 4 joined'],
      ],
    },
    {
      id: 'data',
      label: 'Data plane — brokers',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b1', label: 'Broker 1', sub: 'follows the log', pattern: 'storage', icon: 'harddrive' },
        { id: 'b2', label: 'Broker 2', sub: 'leads orders-1', pattern: 'storage', icon: 'harddrive' },
        { id: 'b3', label: 'Broker 3', sub: 'follows the log', pattern: 'storage', icon: 'harddrive' },
      ],
    },
  ],
  edges: [
    { source: 'metadata', target: 'log', label: 'majority agrees, appends' },
    { source: 'log', target: 'data', label: 'brokers fetch and apply' },
  ],
}
