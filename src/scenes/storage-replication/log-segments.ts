import type { Scene } from '@graphlearning/flow'

// §5.1 — one partition on disk: a directory of segments, each a log file with two indexes. Only the
// newest, active segment is written to; the rest are closed and only ever read or deleted.
export const logSegments: Scene = {
  id: 'log-segments',
  title: 'A partition on disk',
  flow: 'TB',
  nodes: [
    {
      id: 'dir',
      label: 'Directory orders-1 — one partition',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'seg0',
          label: 'Segment from offset 0',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 's0-log', label: '.log', sub: 'the records, closed', pattern: 'storage', icon: 'file' },
            { id: 's0-idx', label: '.index', sub: 'offset to position', pattern: 'storage', icon: 'hash' },
            { id: 's0-time', label: '.timeindex', sub: 'time to offset', pattern: 'storage', icon: 'clock' },
          ],
        },
        {
          id: 'seg1',
          label: 'Segment from offset 5120',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 's1-log', label: '.log', sub: 'the records, closed', pattern: 'storage', icon: 'file' },
            { id: 's1-idx', label: '.index', sub: 'offset to position', pattern: 'storage', icon: 'hash' },
            { id: 's1-time', label: '.timeindex', sub: 'time to offset', pattern: 'storage', icon: 'clock' },
          ],
        },
        {
          id: 'active',
          label: 'Active segment from 9877',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'a-log', label: '.log', sub: 'appends go here', pattern: 'service', icon: 'pencil' },
            { id: 'a-idx', label: '.index', sub: 'offset to position', pattern: 'service', icon: 'hash' },
            { id: 'a-time', label: '.timeindex', sub: 'time to offset', pattern: 'service', icon: 'clock' },
          ],
        },
      ],
    },
    {
      id: 'why',
      label: 'Why it is fast',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'w-seq', label: 'Sequential', sub: 'appends at the end only', pattern: 'network', icon: 'sortarrows' },
        { id: 'w-cache', label: 'Page cache', sub: 'recent data read from memory', pattern: 'network', icon: 'memory' },
        { id: 'w-roll', label: 'Rolled', sub: 'new segment at 1 GiB or 7 days', pattern: 'network', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'dir', target: 'why', label: 'designed for' }],
}
