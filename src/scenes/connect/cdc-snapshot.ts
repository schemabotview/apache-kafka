import type { Scene } from '@graphlearning/flow'

// §7.6 — change data capture of the orders table: an initial snapshot of existing rows, then a
// stream of changes read from the database's log. Debezium is the usual (third-party) connector.
export const cdcSnapshot: Scene = {
  id: 'cdc-snapshot',
  title: 'Snapshot, then change stream',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'CDC of the orders table — what reaches Kafka',
      sub: 'a third-party CDC connector, e.g. Debezium',
      headers: ['Phase', 'Database event', 'Kafka record (key o-…)'],
      values: [
        ['snapshot', 'existing row o-1040', 'op: r (read)'],
        ['snapshot', 'existing row o-1041', 'op: r (read)'],
        ['streaming', 'UPDATE o-1041 status', 'op: u, before + after'],
        ['streaming', 'INSERT o-1050', 'op: c (create)'],
        ['streaming', 'DELETE o-1040', 'op: d, then a tombstone'],
      ],
    },
    {
      id: 'points',
      label: 'Points to check per source',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'p-handover', label: 'Handover', sub: 'snapshot to log, no gap', pattern: 'network', icon: 'merge' },
        { id: 'p-log', label: 'Log retained', sub: 'long enough on the DB', pattern: 'storage', icon: 'history' },
        { id: 'p-order', label: 'Ordering', sub: 'per row key, not global', pattern: 'warn', icon: 'sortarrows' },
      ],
    },
  ],
  edges: [{ source: 'timeline', target: 'points', label: 'depends on' }],
}
