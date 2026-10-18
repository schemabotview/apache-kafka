import type { Scene } from '@graphlearning/flow'

// §3.3 — the record accumulator: one open batch per partition, filled until it is full or linger.ms
// has passed, all inside a fixed memory buffer. Values are the Kafka 4.1 producer defaults.
export const batching: Scene = {
  id: 'batching',
  title: 'Batches, linger and the buffer',
  flow: 'TB',
  nodes: [
    { id: 'app', label: 'send() calls', sub: 'many small records', pattern: 'service', icon: 'zap' },
    {
      id: 'buffer',
      label: 'buffer.memory = 32 MiB — one open batch per partition',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'batch0', label: 'orders-0', sub: '6 KB, filling', pattern: 'storage', icon: 'box' },
        { id: 'batch1', label: 'orders-1', sub: '16 KB: full, sent now', pattern: 'service', icon: 'package' },
        { id: 'batch2', label: 'orders-2', sub: '2 KB, 5 ms old: sent', pattern: 'service', icon: 'clock' },
      ],
    },
    {
      id: 'rules',
      label: 'A batch is sent when',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-size', label: 'It is full', sub: 'batch.size = 16 KB', pattern: 'network', icon: 'boxes' },
        { id: 'r-linger', label: 'It has waited', sub: 'linger.ms = 5', pattern: 'network', icon: 'clock' },
      ],
    },
    { id: 'full', label: 'Buffer full', sub: 'send() blocks up to max.block.ms, then fails', pattern: 'warn', icon: 'ban' },
  ],
  edges: [
    { source: 'app', target: 'buffer', label: 'append' },
    { source: 'buffer', target: 'rules' },
    { source: 'rules', target: 'full', dashed: true, label: 'if brokers fall behind' },
  ],
}
