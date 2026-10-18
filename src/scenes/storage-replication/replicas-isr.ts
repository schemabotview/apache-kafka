import type { Scene } from '@graphlearning/flow'

// §5.2 — one partition with replication factor 3, its replicas on three brokers. Followers fetch from
// the leader like consumers; one that falls 30 s behind drops out of the in-sync replica set.
export const replicasIsr: Scene = {
  id: 'replicas-isr',
  title: 'Leaders, followers and the ISR',
  flow: 'TB',
  nodes: [
    { id: 'producer', label: 'Producer', sub: 'writes to the leader', pattern: 'service', icon: 'server' },
    {
      id: 'replicas',
      label: 'orders-1 — replication factor 3',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'leader', label: 'Broker 2', sub: 'leader, offset 10', pattern: 'storage', icon: 'harddrive' },
        { id: 'f1', label: 'Broker 3', sub: 'follower, offset 10', pattern: 'storage', icon: 'copy' },
        { id: 'f2', label: 'Broker 1', sub: 'follower, offset 4: 40 s behind', pattern: 'warn', icon: 'copy' },
      ],
    },
    {
      id: 'isr',
      kind: 'table',
      label: 'Partition state, as the controller records it',
      sub: 'replica.lag.time.max.ms = 30 s',
      headers: ['Field', 'Value'],
      values: [
        ['replicas', '2, 3, 1'],
        ['leader', '2'],
        ['in-sync replicas (ISR)', '2, 3'],
        ['out of sync', '1: catching up'],
      ],
    },
    {
      id: 'rules',
      label: 'ISR membership',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-leave', label: 'Leaves', sub: 'not caught up for 30 s', pattern: 'warn', icon: 'ban' },
        { id: 'r-join', label: 'Rejoins', sub: 'once caught up again', pattern: 'service', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [
    { source: 'producer', target: 'replicas', label: 'produce' },
    { source: 'replicas', target: 'isr', label: 'followers fetch, controller tracks' },
    { source: 'isr', target: 'rules', label: 'changes when' },
  ],
}
