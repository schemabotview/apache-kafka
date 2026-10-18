import type { Section } from '../types'

// Plan §2.3 — partition-local offsets and order versus global order and business event time.
export const eventTime: Section = {
  id: 'order-and-event-time',
  title: 'Partition order and event time',
  scene: 'event-time',
  focus: 'partition',
  slide: `## Partition order and event time

Offsets record the order in which the broker **received** records. That is not always the order in which things **happened**.

### Three different clocks
- **Event time**: when the order was actually placed
- **Offset order**: when the broker appended the record
- **Processing time**: when a reader gets round to it, seconds or hours later
- Only event time belongs to the **business**; put it inside the event

### Reading the table
- o-1050 was placed at 09:12:58, but sent from a phone that was offline
- It arrives at **offset 3**, after events that happened later
- Anything that groups by time, such as sales per minute, must use **event time** and allow for late records
- Offset order is still right for **one order's lifecycle**, which the key keeps in sequence`,
  narration:
    "Offsets tell you the order in which the broker received records, and it is easy to assume that is the order in which things happened. It is not always. Look at partition one of the orders topic. The first three records are in time order: order ten forty-one placed, ten forty-three placed, and ten forty-one paid. Then comes offset three, order ten fifty, placed at twelve minutes fifty-eight seconds past nine, more than a minute before any of the records above it. It was placed from a phone that had lost its connection, and the app only sent it once it was back online. So there are three different clocks to keep apart. Event time is when the thing actually happened, and it should travel inside the event. Offset order is when the broker appended it. Processing time is when a reader gets round to handling it, which might be seconds or hours later. Ordering by offset is still correct for one order's lifecycle. But anything that groups by time, such as sales per minute, has to use event time and has to decide how long to wait for late records. Kafka Streams handles exactly this in chapter eight.",
}
