import type { Scene } from '@graphlearning/flow'

// §2.7 — what an order event carries beyond its business fields, and what it deliberately leaves
// out. The eventId is for readers to deduplicate; the customer appears by id, never by details.
export const eventContract: Scene = {
  id: 'event-contract',
  title: 'What goes into the contract',
  flow: 'TB',
  nodes: [
    {
      id: 'event',
      kind: 'code',
      filename: 'OrderPlaced — one event, as JSON',
      label: `{
  "eventId":    "7f3c9a2e-41d6-4b8e-9c1a-5e2f8d0b6a13",
  "eventType":  "OrderPlaced",
  "occurredAt": "2026-10-18T09:14:03Z",
  "orderId":    "o-1041",
  "customerId": "c-17",
  "total":      12.50
}`,
    },
    {
      id: 'checks',
      label: 'The contract around it',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-id', label: 'eventId', sub: 'unique per event, for deduplication', pattern: 'service', icon: 'fingerprint' },
        { id: 'c-time', label: 'occurredAt', sub: 'event time, set by the writer', pattern: 'service', icon: 'calendar' },
        { id: 'c-pii', label: 'No card data', sub: 'customer by id only', pattern: 'warn', icon: 'lock' },
        { id: 'c-validate', label: 'Validated', sub: 'before it is produced', pattern: 'service', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [{ source: 'event', target: 'checks', label: 'promised to readers' }],
}
