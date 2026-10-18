import type { Scene } from '@graphlearning/flow'

// §2.3 — partition 1 of the orders topic, in offset order, with each event's own timestamp. The
// mobile app's buffered event arrives after a later one: offset order is arrival order, not time.
export const eventTime: Scene = {
  id: 'event-time',
  title: 'Offset order is not time order',
  flow: 'TB',
  nodes: [
    {
      id: 'partition',
      kind: 'table',
      label: 'orders, partition 1 — in offset order',
      sub: 'event time is when it happened; offset is when it arrived',
      headers: ['Offset', 'Key', 'Event', 'Event time'],
      values: [
        ['0', 'o-1041', 'PLACED', '09:14:03'],
        ['1', 'o-1043', 'PLACED', '09:14:04'],
        ['2', 'o-1041', 'PAID', '09:14:05'],
        ['3', 'o-1050', 'PLACED', '09:12:58'],
        ['4', 'o-1043', 'PAID', '09:14:09'],
      ],
    },
    {
      id: 'clocks',
      label: 'Three different clocks',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-event', label: 'Event time', sub: 'when it happened', pattern: 'user', icon: 'calendar' },
        { id: 'c-offset', label: 'Offset order', sub: 'when the broker appended it', pattern: 'storage', icon: 'hash' },
        { id: 'c-process', label: 'Processing', sub: 'when a reader handles it', pattern: 'service', icon: 'clock' },
      ],
    },
    { id: 'late', label: 'o-1050 arrived late', sub: 'its phone was offline', pattern: 'warn', icon: 'history' },
  ],
  edges: [
    { source: 'partition', target: 'clocks', label: 'three readings' },
    { source: 'clocks', target: 'late', dashed: true },
  ],
}
