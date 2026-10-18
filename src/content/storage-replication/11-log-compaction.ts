import type { Section } from '../types'

// Plan §5.8 — log compaction, keys, and tombstones.
export const compaction: Section = {
  id: 'log-compaction',
  title: 'Log compaction',
  scene: 'compaction',
  focus: 'after',
  slide: `## Log compaction

A **compacted** topic keeps the **latest record for each key**, instead of keeping everything for a period of time. It suits current state, such as order status.

### What the cleaner does
- Older records for a key are **removed**, so 0, 1 and 2 go
- The latest per key **survives**, at its original offset
- Offsets are **never renumbered**, so gaps are normal
- Every record in a compacted topic **needs a key**; keyless records are rejected

### Deleting a key
- A **tombstone**, a record with a null value, marks a key as deleted
- It is kept for a while, so readers **see the delete**, then removed
- A topic can use **compact and delete** together, to cap its age as well
- A new reader can rebuild **all current state** by reading from the beginning`,
  narration:
    "Retention by time suits event streams. Some topics are better thought of as current state, such as the latest status of every order, and for those Kafka offers log compaction. Set the cleanup policy to compact, and instead of deleting by age, the broker keeps the latest record for each key. Here is the order status topic before and after the log cleaner has run. Order ten forty-one had placed, then paid, so the placed record at offset one is removed and paid survives at offset three. Order ten forty-three only has one record, so it stays. Notice that surviving records keep their original offsets. Nothing is renumbered, so gaps in offsets are completely normal in a compacted topic. Deleting a key needs a special record, a tombstone: the key with a null value. Order ten forty had placed, then shipped, then a tombstone. After cleaning, only the tombstone remains, and it is kept for a while, so that slow readers still see the delete, before it is removed as well. A topic can also combine compact and delete, which keeps the latest value per key, but only for a limited age.",
}
