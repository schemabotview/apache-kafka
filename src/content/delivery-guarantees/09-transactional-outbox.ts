import type { Section } from '../types'

// Plan §6.6 — the transactional outbox and CDC pattern.
export const outbox: Section = {
  id: 'transactional-outbox',
  title: 'The transactional outbox',
  scene: 'outbox',
  focus: 'db',
  slide: `## The transactional outbox

Write the event **into the database**, in the **same transaction** as the order. Publishing to Kafka becomes a separate step that can safely be retried.

### How it works
- Checkout inserts the order **and** an **outbox** row, in one database transaction
- A **relay** reads committed outbox rows and publishes them, in order
- The relay is often **CDC**: it reads the database's change log, covered in chapter 7

### What it guarantees
- No order without its event, and **no event without its order**
- Publishing is **at least once**, so readers dedupe by **eventId**
- The event appears **after** the commit, typically within seconds
- Delete published outbox rows, so the table does **not grow** forever`,
  narration:
    "The transactional outbox removes the dual write by turning two writes into one. Checkout writes the order row and the event into the same database, in a single database transaction. The event goes into an outbox table: its type, its key, its payload, and its event id. Either both rows commit, or neither does, so there can never be an order without its event, or an event without its order. Publishing to Kafka then becomes a separate step, done by a relay. The relay reads outbox rows that have been committed, in order, and publishes each one to the orders topic. Often the relay is change data capture, which reads the database's own change log rather than querying the table, and chapter seven looks at how that works. If the relay crashes after publishing a row but before recording its progress, it publishes that row again on restart. So publishing is at least once, and readers deduplicate by event id, which the outbox row carries unchanged. The price is a short delay. The event reaches Kafka after the database commit, typically within seconds, rather than at the same instant.",
}
