import type { Section } from '../types'

// Plan §11.8 — the integrated order architecture: contracts, deployment, and failures.
export const orderArchitecture: Section = {
  id: 'order-architecture',
  title: 'The integrated order architecture',
  scene: 'order-architecture',
  focus: 'kafka',
  slide: `## The integrated order architecture

Every piece of the orders platform now has a **reason**, traced back to a failure it prevents. This is the course in one picture.

### Writing
- Checkout writes orders with an **outbox**, so no event is ever lost
- A **CDC** connector publishes them, at least once

### Kafka
- **orders** is keyed by order id, so each order stays in sequence
- **RF 3, min ISR 2**, KRaft, and an ACL per service
- A **dead-letter** topic holds poison records

### Reading
- Each application is its **own group**, and deduplicates by **eventId**
- Sales totals come from **Kafka Streams** windows
- **Freshness**, replication and dead-letter depth are watched, with owners`,
  narration:
    "This is the whole course in one picture: the orders platform, with every piece justified by a failure it prevents. On the writing side, checkout saves each order and its event in one database transaction, using the outbox from chapter six, so no order can exist without its event. A change data capture connector, from chapter seven, publishes outbox rows to Kafka, at least once. In Kafka, the orders topic is keyed by order id, from chapter two, so each order's events stay in sequence, with twenty-four partitions from the capacity plan in chapter ten. The cluster uses replication factor three and min in-sync replicas two, from chapter five, runs in KRaft mode, and gives every service its own principal and ACLs, from chapter nine. A dead letter topic keeps poison records from blocking their partitions. On the reading side, fulfilment, sales totals and notifications are each their own consumer group, so they progress independently, and each one treats a repeat as harmless, by deduplicating on event id or by making its effects idempotent. Sales totals are computed by a Kafka Streams application, with windows and grace, from chapter eight.",
}
