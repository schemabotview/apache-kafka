import type { Scene } from '@graphlearning/flow'

// §11.3 — the rolling upgrade from the Kafka 4.x upgrade notes: binaries first, one broker at a
// time, then a separate, one-way step that finalizes the metadata version.
export const rollingUpgrade: Scene = {
  id: 'rolling-upgrade',
  title: 'A rolling upgrade',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'Rolling upgrade to 4.1, from 3.3.x or later (KRaft)',
      sub: 'from the Kafka 4.1 upgrade notes',
      headers: ['Step', 'Action', 'Reversible?'],
      values: [
        ['1', 'read the release notes for every version crossed', '—'],
        ['2', 'one broker at a time: stop, upgrade, restart', 'yes'],
        ['3', 'wait for no under-replicated partitions', '—'],
        ['4', 'verify behaviour and performance', '—'],
        ['5', 'kafka-features upgrade --release-version 4.1', 'no: one-way'],
      ],
    },
    {
      id: 'checks',
      label: 'Version-specific checks',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'c-clients', label: 'Clients ≥ 2.1', sub: 'old protocols removed in 4.0', pattern: 'warn', icon: 'plug' },
        { id: 'c-streams', label: 'Streams 4.1.0', sub: 'known leak: use 4.1.1', pattern: 'warn', icon: 'bug' },
        { id: 'c-kraft', label: 'KRaft only', sub: 'ZooKeeper must be gone', pattern: 'warn', icon: 'brain' },
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'checks', label: 'before step 1' }],
}
