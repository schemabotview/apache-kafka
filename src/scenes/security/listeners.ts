import type { Scene } from '@graphlearning/flow'

// §9.2 — one broker with three named listeners. Clients use the address the broker ADVERTISES in
// metadata, not the one they bootstrapped with, so each audience needs its own reachable address.
export const listeners: Scene = {
  id: 'listeners',
  title: 'Listeners and advertised addresses',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'broker 1 — server.properties (excerpt)',
      label: `listeners=INTERNAL://:9092,EXTERNAL://:9094,CONTROLLER://:9093
advertised.listeners=INTERNAL://kafka-1.internal:9092,\\
    EXTERNAL://kafka-1.shop.example:9094
listener.security.protocol.map=INTERNAL:SASL_SSL,\\
    EXTERNAL:SASL_SSL,CONTROLLER:SSL
inter.broker.listener.name=INTERNAL
controller.listener.names=CONTROLLER`,
    },
    {
      id: 'audiences',
      label: 'Who connects where',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'l-internal', label: 'INTERNAL', sub: 'apps in the data centre, replication', pattern: 'service', icon: 'network' },
        { id: 'l-external', label: 'EXTERNAL', sub: 'partners outside', pattern: 'external', icon: 'globe' },
        { id: 'l-controller', label: 'CONTROLLER', sub: 'controller quorum only', pattern: 'storage', icon: 'brain' },
      ],
    },
    { id: 'rule', label: 'The rule', sub: 'advertised address must be reachable by its audience', pattern: 'warn', icon: 'search' },
  ],
  edges: [
    { source: 'config', target: 'audiences', label: 'defines' },
    { source: 'audiences', target: 'rule', dashed: true },
  ],
}
