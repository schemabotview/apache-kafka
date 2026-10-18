import type { Scene } from '@graphlearning/flow'

// §6.8 — replaying last week's orders through the pricer. The output only matches the original if
// the logic is deterministic, reference data is versioned, and side effects are suppressed.
export const replayCorrectness: Scene = {
  id: 'replay-correctness',
  title: 'Replaying correctly',
  flow: 'TB',
  nodes: [
    {
      id: 'risks',
      kind: 'table',
      label: 'Replaying 11 October through the pricer',
      sub: 'what can make a replay differ from the original run',
      headers: ['Source of difference', 'Example', 'Remedy'],
      values: [
        ['current time', 'Instant.now() in a discount', 'use occurredAt'],
        ['reference data', "today's prices, not last week's", 'look up as of event time'],
        ['randomness', 'random coupon codes', 'derive from eventId'],
        ['side effects', 'emails sent again', 'suppress in replay mode'],
      ],
    },
    {
      id: 'checks',
      label: 'Before any replay',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'c-scope', label: 'Bounded', sub: 'offsets or times', pattern: 'service', icon: 'ruler' },
        { id: 'c-dedupe', label: 'Deduplicated', sub: 'readers use eventId', pattern: 'service', icon: 'fingerprint' },
        { id: 'c-quiet', label: 'Quiet', sub: 'effects switched off', pattern: 'service', icon: 'power' },
      ],
    },
  ],
  edges: [{ source: 'risks', target: 'checks', label: 'so check' }],
}
