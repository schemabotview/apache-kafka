import type { Scene } from '@graphlearning/flow'

// §5.8 — a compacted topic of order statuses, before and after the cleaner runs. The latest record
// per key survives; a tombstone (null value) marks a key for removal. Offsets never change.
export const compaction: Scene = {
  id: 'compaction',
  title: 'Log compaction',
  flow: 'TB',
  nodes: [
    {
      id: 'before',
      kind: 'table',
      label: 'order-status, before cleaning',
      sub: 'cleanup.policy = compact',
      headers: ['Offset', 'Key', 'Value'],
      values: [
        ['0', 'o-1040', 'PLACED'],
        ['1', 'o-1041', 'PLACED'],
        ['2', 'o-1040', 'SHIPPED'],
        ['3', 'o-1041', 'PAID'],
        ['4', 'o-1043', 'PLACED'],
        ['5', 'o-1040', 'null: tombstone'],
      ],
    },
    {
      id: 'after',
      kind: 'table',
      label: 'After cleaning',
      sub: 'latest per key; offsets unchanged',
      headers: ['Offset', 'Key', 'Value'],
      values: [
        ['3', 'o-1041', 'PAID'],
        ['4', 'o-1043', 'PLACED'],
        ['5', 'o-1040', 'tombstone, for now'],
      ],
    },
  ],
  edges: [{ source: 'before', target: 'after', label: 'log cleaner' }],
}
