import type { Scene } from '@graphlearning/flow'

// §3.7 — a duplicate idempotence cannot see: the application itself publishes the same order twice.
// Both records carry the same eventId, which is what lets a reader recognise the second one.
export const businessDuplicates: Scene = {
  id: 'business-duplicates',
  title: 'Duplicates idempotence cannot see',
  flow: 'TB',
  nodes: [
    {
      id: 'log',
      kind: 'table',
      label: 'orders, partition 1',
      sub: 'checkout retried after a delivery timeout',
      headers: ['Offset', 'Key', 'eventId', 'Event'],
      values: [
        ['7', 'o-1041', '7f3c…6a13', 'PAID'],
        ['8', 'o-1043', '2b91…c470', 'PLACED'],
        ['9', 'o-1041', '7f3c…6a13', 'PAID'],
      ],
    },
    {
      id: 'policy',
      label: 'A bounded publish policy',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-validate', label: 'Validate first', sub: 'bad data never retries', pattern: 'service', icon: 'shieldcheck' },
        { id: 'p-same-id', label: 'Same eventId', sub: 'on every re-send', pattern: 'service', icon: 'fingerprint' },
        { id: 'p-bound', label: 'Bounded retries', sub: 'then park and alert', pattern: 'warn', icon: 'bell' },
        { id: 'p-readers', label: 'Readers dedupe', sub: 'by eventId', pattern: 'storage', icon: 'funnel' },
      ],
    },
  ],
  edges: [{ source: 'log', target: 'policy', label: 'so the publisher' }],
}
