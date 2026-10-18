import type { Scene } from '@graphlearning/flow'

// §3.1 — bootstrap servers are only a first contact. The producer asks for metadata, learns which
// broker leads each partition, and from then on sends each batch straight to that leader.
export const metadataDiscovery: Scene = {
  id: 'metadata-discovery',
  title: 'Finding the partition leaders',
  flow: 'TB',
  nodes: [
    { id: 'producer', label: 'Producer', sub: 'bootstrap: broker 1', pattern: 'service', icon: 'server' },
    {
      id: 'metadata',
      kind: 'table',
      label: 'Metadata response for orders',
      sub: 'cached, refreshed when it goes stale',
      headers: ['Partition', 'Leader', 'Address'],
      values: [
        ['0', 'broker 1', 'kafka-1:9092'],
        ['1', 'broker 2', 'kafka-2:9092'],
        ['2', 'broker 3', 'kafka-3:9092'],
      ],
    },
    {
      id: 'cluster',
      label: 'Each batch goes straight to its leader',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'b1', label: 'Broker 1', sub: 'o-1040 to partition 0', pattern: 'storage', icon: 'harddrive' },
        { id: 'b2', label: 'Broker 2', sub: 'o-1041 to partition 1', pattern: 'storage', icon: 'harddrive' },
        { id: 'b3', label: 'Broker 3', sub: 'o-1042 to partition 2', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    { id: 'stale', label: 'Leader moved?', sub: 'NOT_LEADER: refresh metadata and retry', pattern: 'warn', icon: 'repeat' },
  ],
  edges: [
    { source: 'producer', target: 'metadata', label: 'ask any broker' },
    { source: 'metadata', target: 'cluster', label: 'route by partition' },
    { source: 'cluster', target: 'stale', dashed: true },
  ],
}
