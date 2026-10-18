import type { Section } from '../types'

// Plan §1.2 — why consuming a record does not delete it: readers hold positions, retention deletes.
export const retainedLog: Section = {
  id: 'reading-does-not-delete',
  title: 'Reading does not delete',
  scene: 'retained-log',
  focus: 'log',
  slide: `## Reading does not delete

In a queue, reading a message takes it away. In a Kafka log, reading only moves **the reader's own position** forward.

### Two readers, one log
- Fulfilment has read up to offset 3, so its **next offset is 4**
- Analytics is behind, with **next offset 1**
- Neither position changes the records, or the other reader
- A reader can move its position **back** and read records again

### What does remove records
- **Retention**: records older or larger than a configured limit are deleted
- It is set **per topic**, by time or by size
- It runs whether or not anyone has read them
- A reader that falls behind by more than the retention period **loses** the records it had not read`,
  narration:
    "This is the single idea that most separates Kafka from a message queue. In a queue, reading a message takes it away. In a Kafka log, reading takes nothing away. Each reader simply keeps a position, a number that says which record it will read next. Here, fulfilment has handled everything up to offset three, so its next offset is four. Analytics is far behind, and its next offset is one. Both of them are looking at exactly the same records, and neither position has any effect on the log or on the other reader. Analytics can be slow for an hour, and fulfilment never notices. So what does remove records? Retention. The topic is configured to keep records for a period of time, or up to a size, and once records fall outside that limit they are deleted, whether or not anyone ever read them. That has a consequence worth remembering already: a reader that falls further behind than the retention period does not just lag. It loses data, because the records it still needed are gone.",
}
