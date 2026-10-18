import type { Scene } from '@graphlearning/flow'

// §3.6 — how the broker recognises a retried batch: a producer id plus a per-partition sequence
// number. The boundary is the producer instance; a restarted application gets a new id.
export const idempotentProducer: Scene = {
  id: 'idempotent-producer',
  title: 'How idempotence deduplicates',
  flow: 'TB',
  nodes: [
    {
      id: 'retry',
      kind: 'table',
      label: 'The lost-ack retry, idempotence on',
      sub: 'producer id 4021, partition 1',
      headers: ['Batch', 'Sequence', 'Broker does'],
      values: [
        ['o-1041 PAID', '12', 'appends at offset 7'],
        ['same batch, retried', '12', 'recognises 12: no new copy'],
        ['o-1043 PAID', '13', 'appends at offset 8'],
      ],
    },
    {
      id: 'needs',
      label: 'Needs, all defaults in Kafka 4.1',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'n-acks', label: 'acks=all', sub: 'not 0 or 1', pattern: 'service', icon: 'circlecheck' },
        { id: 'n-retries', label: 'retries > 0', sub: 'default: no limit', pattern: 'service', icon: 'repeat' },
        { id: 'n-inflight', label: 'In flight ≤ 5', sub: 'per connection', pattern: 'service', icon: 'hash' },
      ],
    },
    {
      id: 'boundary',
      label: 'Outside its boundary',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'b-restart', label: 'App restarts', sub: 'new producer id', pattern: 'warn', icon: 'power' },
        { id: 'b-resend', label: 'App re-sends', sub: 'new sequence number', pattern: 'warn', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'retry', target: 'needs', label: 'works when' },
    { source: 'needs', target: 'boundary', label: 'but not for' },
  ],
}
