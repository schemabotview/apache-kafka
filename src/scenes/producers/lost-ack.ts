import type { Scene } from '@graphlearning/flow'

// §3.5 — the classic ambiguous outcome: the broker stored the batch, the acknowledgement was lost,
// and the producer cannot tell that apart from a batch that never arrived.
export const lostAck: Scene = {
  id: 'lost-ack',
  title: 'A lost acknowledgement',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'Idempotence off: one send, two records',
      sub: 'enable.idempotence=false, retries on',
      headers: ['Time', 'Producer', 'Broker'],
      values: [
        ['0 ms', 'sends o-1041 PAID', ''],
        ['3 ms', '', 'appends it at offset 7'],
        ['3 ms', '', 'ack lost on the network'],
        ['30 s', 'request.timeout.ms expires', ''],
        ['30.1 s', 'retries the same batch', ''],
        ['30.1 s', '', 'appends it again at offset 8'],
        ['30.1 s', 'callback: success', ''],
      ],
    },
    {
      id: 'outcome',
      label: 'The producer could not know',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-same', label: 'Same timeout', sub: 'stored, or never arrived', pattern: 'warn', icon: 'search' },
        { id: 'o-dup', label: 'Two copies', sub: 'offsets 7 and 8', pattern: 'warn', icon: 'copy' },
      ],
    },
  ],
  edges: [{ source: 'timeline', target: 'outcome', label: 'result' }],
}
