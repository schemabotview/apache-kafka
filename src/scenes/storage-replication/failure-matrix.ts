import type { Scene } from '@graphlearning/flow'

// §5.3 — the standard durable setting, RF 3 with min.insync.replicas 2 and acks=all, against each
// number of in-sync replicas. Two copies are required before any write is acknowledged.
export const failureMatrix: Scene = {
  id: 'failure-matrix',
  title: 'RF 3, min ISR 2, acks=all',
  flow: 'TB',
  nodes: [
    {
      id: 'matrix',
      kind: 'table',
      label: 'replication.factor 3 · min.insync.replicas 2 · acks=all',
      sub: 'what each number of in-sync replicas allows',
      headers: ['In-sync', 'Writes', 'Reads', 'Acknowledged data'],
      values: [
        ['3', 'accepted', 'served', 'on 3 brokers'],
        ['2', 'accepted', 'served', 'on 2 brokers'],
        ['1', 'refused: not enough replicas', 'served', 'safe, nothing new'],
        ['0', 'refused', 'refused: no leader', 'safe if a replica returns'],
      ],
    },
    {
      id: 'roles',
      label: 'Who sets what',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-rf', label: 'Topic', sub: 'replication factor 3', pattern: 'storage', icon: 'copy' },
        { id: 'r-isr', label: 'Topic or cluster', sub: 'min.insync.replicas 2', pattern: 'storage', icon: 'shieldcheck' },
        { id: 'r-acks', label: 'Producer', sub: 'acks=all', pattern: 'service', icon: 'server' },
        { id: 'tolerates', label: 'Together', sub: 'one broker can fail safely', pattern: 'service', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [{ source: 'matrix', target: 'roles', label: 'set by' }],
}
