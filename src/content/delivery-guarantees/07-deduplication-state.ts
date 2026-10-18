import type { Section } from '../types'

// Plan §6.5 — deduplication state for external database writes.
export const dedupState: Section = {
  id: 'deduplication-state',
  title: 'Deduplication in your own database',
  scene: 'dedup-state',
  focus: 'sql',
  slide: `## Deduplication in your own database

When the effect is in **your own database**, record the **eventId in the same database transaction** as the effect. Both happen, or neither does.

### How it works
- Insert the eventId into a **processed_events** table with a unique key
- A **duplicate key** means the event was already handled: roll back and skip
- Otherwise apply the effect, and **commit both** together
- Commit the Kafka offset only **after** the database commit

### Crash anywhere, replay safely
- Before the database commit: **nothing** was kept, so it is redone
- After it: the eventId is found, so the replay is **skipped**
- Keep ids for at least the **replay horizon**, or old events look new`,
  narration:
    "When the effect is in a database you control, you can do better than hoping. Make the deduplication record part of the same database transaction as the effect itself. The pattern is simple. Begin a database transaction. Insert the event id into a processed events table, where the event id is a unique key. If that insert fails with a duplicate key, the event has already been handled, so roll back and skip it. Otherwise apply the effect, here reserving stock, and commit both together. Only after that commit, commit the Kafka offset. Now walk through crashes. A crash before the database commit leaves nothing behind, so the replay simply does the work. A crash after the database commit, but before the offset commit, means the event is read again, the insert hits the duplicate key, and it is skipped. Either way, the stock is reserved exactly once. The one thing to plan is how long to keep event ids. If they are deleted before a replay could reach the event again, an old event looks new. Keep them at least as long as the topic's retention, the replay horizon.",
}
