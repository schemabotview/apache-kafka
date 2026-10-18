import type { Scene } from '@graphlearning/flow'

// §5.7 — time-based retention deletes whole closed segments. A segment goes only when its NEWEST
// record is past retention, so data is kept a little longer than retention.ms, never shorter.
export const retention: Scene = {
  id: 'retention',
  title: 'Retention deletes whole segments',
  flow: 'TB',
  nodes: [
    {
      id: 'segments',
      kind: 'table',
      label: 'orders-1 on 18 October, retention.ms = 7 days',
      sub: 'a segment is deleted when its newest record is older than 7 days',
      headers: ['Segment', 'Records from', 'Newest record', 'Status'],
      values: [
        ['from 0', '1 Oct', '8 Oct', 'deleted'],
        ['from 5120', '8 Oct', '12 Oct', 'kept: 6 days old'],
        ['from 9877 (active)', '12 Oct', 'now', 'kept: never deleted'],
      ],
    },
    {
      id: 'horizon',
      label: 'The replay horizon',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'h-earliest', label: 'Earliest', sub: 'oldest offset kept: 5120', pattern: 'storage', icon: 'history' },
        { id: 'h-bytes', label: 'Size limit', sub: 'retention.bytes: none', pattern: 'storage', icon: 'scale' },
        { id: 'h-lag', label: 'A slow group', sub: 'past it: data gone', pattern: 'warn', icon: 'skull' },
      ],
    },
  ],
  edges: [{ source: 'segments', target: 'horizon', label: 'defines' }],
}
