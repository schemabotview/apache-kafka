import type { Scene } from '@graphlearning/flow'

// §1.3 — the orders topic as three partitions, each with its own offsets. The partition numbers are
// the real ones: murmur2 of each key, modulo 3, as Kafka's default partitioner computes it.
export const topicPartitions: Scene = {
  id: 'topic-partitions',
  title: 'A topic is a set of partitions',
  flow: 'TB',
  nodes: [
    { id: 'producer', label: 'Checkout', sub: 'sends keyed orders', pattern: 'service', icon: 'server' },
    {
      id: 'topic',
      label: 'Topic: orders — 3 partitions',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'p0',
          label: 'Partition 0',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'p0-0', label: 'offset 0', sub: 'o-1040 PLACED', pattern: 'storage' },
            { id: 'p0-1', label: 'offset 1', sub: 'o-1047 PLACED', pattern: 'storage' },
          ],
        },
        {
          id: 'p1',
          label: 'Partition 1',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'p1-0', label: 'offset 0', sub: 'o-1041 PLACED', pattern: 'storage' },
            { id: 'p1-1', label: 'offset 1', sub: 'o-1043 PLACED', pattern: 'storage' },
            { id: 'p1-2', label: 'offset 2', sub: 'o-1041 PAID', pattern: 'storage' },
          ],
        },
        {
          id: 'p2',
          label: 'Partition 2',
          pattern: 'group',
          cols: 1,
          children: [{ id: 'p2-0', label: 'offset 0', sub: 'o-1042 PLACED', pattern: 'storage' }],
        },
      ],
    },
    {
      id: 'reading',
      label: 'What a reader can rely on',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'same-key', label: 'Same key, in order', sub: 'o-1041 PLACED before PAID', pattern: 'service', icon: 'circlecheck' },
        { id: 'no-global', label: 'No global order', sub: 'across partitions', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'producer', target: 'topic', label: 'partition = hash(key) mod 3' },
    { source: 'topic', target: 'reading', label: 'read' },
  ],
}
