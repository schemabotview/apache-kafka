import type { Scene } from '@graphlearning/flow'

// §4.6 — Kafka 4.x has two consumer group protocols. The client default is still classic; the
// consumer protocol moves assignment and liveness settings to the broker.
export const groupProtocols: Scene = {
  id: 'group-protocols',
  title: 'Two consumer group protocols',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'group.protocol: classic or consumer',
      sub: 'classic is the client default in Kafka 4.1',
      headers: ['Aspect', 'classic', 'consumer'],
      values: [
        ['assignment decided by', 'a member (the leader)', 'the broker'],
        ['assignor setting', 'partition.assignment.strategy', 'group.remote.assignor'],
        ['session timeout set', 'by the client: 45 s', 'by the broker: 45 s'],
        ['heartbeat interval set', 'by the client: 3 s', 'by the broker: 5 s'],
        ['rebalance', 'whole group, or cooperative', 'incremental, per member'],
      ],
    },
    {
      id: 'traps',
      label: 'When switching',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-reject', label: 'Rejected', sub: 'classic-only settings fail at start-up', pattern: 'warn', icon: 'ban' },
        { id: 't-same', label: 'Unchanged', sub: 'poll, commit, offsets', pattern: 'service', icon: 'circlecheck' },
        { id: 't-opt', label: 'Opt in', sub: 'set group.protocol to consumer', pattern: 'network', icon: 'pencil' },
        { id: 't-broker', label: 'Broker owns', sub: 'timeouts and the assignor', pattern: 'storage', icon: 'server' },
      ],
    },
  ],
  edges: [{ source: 'compare', target: 'traps', label: 'so' }],
}
