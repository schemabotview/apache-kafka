import type { Scene } from '@graphlearning/flow'

// §3.3 — the producer settings that trade latency for throughput, what each one buys and what it
// costs. None of them changes what a successful send means.
export const throughputLatency: Scene = {
  id: 'throughput-latency',
  title: 'Trading latency for throughput',
  flow: 'TB',
  nodes: [
    {
      id: 'settings',
      kind: 'table',
      label: 'Producer settings that shape batches',
      sub: 'Kafka 4.1 defaults in brackets',
      headers: ['Setting', 'Raise it to get', 'At the cost of'],
      values: [
        ['linger.ms (5)', 'fuller batches', 'up to that much delay'],
        ['batch.size (16 KB)', 'fewer, larger requests', 'memory per partition'],
        ['compression.type (none)', 'less network and disk', 'producer CPU'],
        ['buffer.memory (32 MiB)', 'longer broker hiccups', 'heap in every producer'],
      ],
    },
    {
      id: 'codecs',
      label: 'compression.type options',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-lz4', label: 'lz4, snappy', sub: 'fast, moderate ratio', pattern: 'service', icon: 'zap' },
        { id: 'c-zstd', label: 'zstd, gzip', sub: 'smaller, more CPU', pattern: 'storage', icon: 'package' },
      ],
    },
  ],
  edges: [{ source: 'settings', target: 'codecs', label: 'compression' }],
}
