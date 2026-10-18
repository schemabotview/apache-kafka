import type { Scene } from '@graphlearning/flow'

// §5.8 — why compaction is eventual. The cleaner skips the active segment, waits for enough dirty
// data, and keeps tombstones long enough for slow readers to see the delete.
export const compactionTiming: Scene = {
  id: 'compaction-timing',
  title: 'Why cleanup is not immediate',
  flow: 'TB',
  nodes: [
    {
      id: 'conditions',
      kind: 'table',
      label: 'When the cleaner touches a record',
      sub: 'topic settings, Kafka 4.1 defaults',
      headers: ['Condition', 'Setting', 'Default'],
      values: [
        ['segment is closed', 'segment.ms / segment.bytes', '7 days / 1 GiB'],
        ['enough is dirty', 'min.cleanable.dirty.ratio', '0.5'],
        ['old enough', 'min.compaction.lag.ms', '0'],
        ['tombstone kept for', 'delete.retention.ms', '1 day'],
      ],
    },
    {
      id: 'consequences',
      label: 'So readers see',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-dupes', label: 'Old values', sub: 'until the cleaner runs', pattern: 'warn', icon: 'history' },
        { id: 'c-tomb', label: 'Tombstones', sub: 'must handle null values', pattern: 'warn', icon: 'trash' },
        { id: 'c-latest', label: 'Latest value', sub: 'always kept per key', pattern: 'service', icon: 'circlecheck' },
        { id: 'c-erase', label: 'Not erasure', sub: 'old copies may linger', pattern: 'warn', icon: 'lock' },
      ],
    },
  ],
  edges: [{ source: 'conditions', target: 'consequences', label: 'so' }],
}
