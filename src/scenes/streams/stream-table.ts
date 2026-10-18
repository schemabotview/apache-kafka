import type { Scene } from '@graphlearning/flow'

// §8.2 — the same records read two ways. As a KStream each record is an event; as a KTable each
// record is an update to the latest value for its key.
export const streamTable: Scene = {
  id: 'stream-table',
  title: 'KStream and KTable',
  flow: 'TB',
  nodes: [
    {
      id: 'records',
      kind: 'table',
      label: 'order-status topic',
      sub: 'four records, in offset order',
      headers: ['Offset', 'Key', 'Value'],
      values: [
        ['0', 'o-1041', 'PLACED'],
        ['1', 'o-1043', 'PLACED'],
        ['2', 'o-1041', 'PAID'],
        ['3', 'o-1043', 'CANCELLED'],
      ],
    },
    {
      id: 'views',
      label: 'Read two ways',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'as-stream',
          kind: 'table',
          label: 'As a KStream',
          sub: 'every record is an event',
          headers: ['Event'],
          values: [['o-1041 PLACED'], ['o-1043 PLACED'], ['o-1041 PAID'], ['o-1043 CANCELLED']],
        },
        {
          id: 'as-table',
          kind: 'table',
          label: 'As a KTable',
          sub: 'latest value per key',
          headers: ['Key', 'Now'],
          values: [['o-1041', 'PAID'], ['o-1043', 'CANCELLED']],
        },
      ],
    },
  ],
  edges: [{ source: 'records', target: 'views', label: 'interpretation' }],
}
