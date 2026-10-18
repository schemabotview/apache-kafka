import type { Scene } from '@graphlearning/flow'

// §10.4 — the producer and consumer settings that trade latency for throughput, side by side, with
// Kafka 4.1 defaults. The producer side was chapter 3; the fetch side mirrors it.
export const clientTradeoffs: Scene = {
  id: 'client-tradeoffs',
  title: 'Producer and consumer trade-offs',
  flow: 'TB',
  nodes: [
    {
      id: 'producer',
      kind: 'table',
      label: 'Producer: how batches form',
      sub: 'chapter 3',
      headers: ['Setting', 'Default', 'Raise for'],
      values: [
        ['linger.ms', '5', 'fuller batches'],
        ['batch.size', '16 KiB', 'larger requests'],
        ['compression.type', 'none', 'less network and disk'],
      ],
    },
    {
      id: 'consumer',
      kind: 'table',
      label: 'Consumer: how fetches form',
      sub: 'the mirror image',
      headers: ['Setting', 'Default', 'Raise for'],
      values: [
        ['fetch.min.bytes', '1 byte', 'fuller fetches'],
        ['fetch.max.wait.ms', '500', 'longest wait for them'],
        ['max.partition.fetch.bytes', '1 MiB', 'larger per-partition reads'],
        ['max.poll.records', '500', 'more per loop, if fast'],
      ],
    },
    { id: 'rule', label: 'Measure first', sub: 'processing is usually slower', pattern: 'warn', icon: 'gauge' },
  ],
  edges: [
    { source: 'producer', target: 'consumer', label: 'mirrored by' },
    { source: 'consumer', target: 'rule', dashed: true },
  ],
}
