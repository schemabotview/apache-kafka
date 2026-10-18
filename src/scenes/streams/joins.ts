import type { Scene } from '@graphlearning/flow'

// §8.6 — the two joins this course uses. A stream-table join looks up the current value; a
// stream-stream join pairs events within a time window. Both need co-partitioned inputs.
export const joins: Scene = {
  id: 'joins',
  title: 'Stream-table and stream-stream joins',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      label: 'Two kinds of join',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'st',
          label: 'Stream-table: orders ⋈ customers',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'st-what', label: 'Looks up', sub: "customer's current tier", pattern: 'service', icon: 'search' },
            { id: 'st-when', label: 'No window', sub: 'value at that moment', pattern: 'storage', icon: 'clock' },
          ],
        },
        {
          id: 'ss',
          label: 'Stream-stream: orders ⋈ payments',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'ss-what', label: 'Pairs events', sub: 'same key, both sides', pattern: 'service', icon: 'link' },
            { id: 'ss-when', label: 'Within 10 min', sub: 'JoinWindows', pattern: 'storage', icon: 'clock' },
          ],
        },
      ],
    },
    {
      id: 'copart',
      label: 'Co-partitioning: required for both',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'c-key', label: 'Same key', sub: 'customer id both sides', pattern: 'warn', icon: 'key' },
        { id: 'c-count', label: 'Same count', sub: 'of partitions', pattern: 'warn', icon: 'hash' },
        { id: 'c-hash', label: 'Same hashing', sub: 'same partitioner', pattern: 'warn', icon: 'share' },
      ],
    },
  ],
  edges: [{ source: 'kinds', target: 'copart', label: 'both need' }],
}
