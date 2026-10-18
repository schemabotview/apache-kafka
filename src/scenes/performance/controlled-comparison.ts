import type { Scene } from '@graphlearning/flow'

// §10.8 — a controlled comparison: one change, the same workload, measured the same way. The perf
// tool generates load; the comparison is only as good as how similar the two runs are.
export const controlledComparison: Scene = {
  id: 'controlled-comparison',
  title: 'A controlled comparison',
  flow: 'TB',
  nodes: [
    {
      id: 'run',
      kind: 'code',
      filename: 'terminal — the same load, twice; only linger.ms differs',
      label: `$ bin/kafka-producer-perf-test.sh --topic perf-orders \\
    --num-records 1000000 --record-size 1024 --throughput 2000 \\
    --producer-props bootstrap.servers=kafka-1:9092 linger.ms=5

$ bin/kafka-producer-perf-test.sh --topic perf-orders \\
    --num-records 1000000 --record-size 1024 --throughput 2000 \\
    --producer-props bootstrap.servers=kafka-1:9092 linger.ms=20`,
    },
    {
      id: 'rules',
      label: 'Keep the comparison fair',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-one', label: 'One change', sub: 'everything else fixed', pattern: 'service', icon: 'ruler' },
        { id: 'r-same', label: 'Same load', sub: 'rate, size, keys, time', pattern: 'service', icon: 'repeat' },
        { id: 'r-pct', label: 'Percentiles', sub: 'p99, not only averages', pattern: 'service', icon: 'barchart' },
        { id: 'r-safe', label: 'Same guarantees', sub: 'acks and idempotence unchanged', pattern: 'warn', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [{ source: 'run', target: 'rules', label: 'only if' }],
}
