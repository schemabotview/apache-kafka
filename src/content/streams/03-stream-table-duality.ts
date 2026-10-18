import type { Section } from '../types'

// Plan §8.2 — KStream, KTable, changelog interpretation, and stream-table duality.
export const streamTable: Section = {
  id: 'stream-table-duality',
  title: 'KStream and KTable',
  scene: 'stream-table',
  focus: 'views',
  slide: `## KStream and KTable

The same topic can be read in two ways. A **KStream** treats each record as an **event**; a **KTable** treats each record as an **update** to its key.

### Two interpretations
- As a stream, all four records are events, and all four matter
- As a table, only the **latest value per key** matters: o-1041 is PAID
- A KTable is the topic read as a **changelog**

### The duality
- Aggregating a stream **produces** a table, such as a running total
- Every change to a table can be emitted as a **stream** of updates
- Choose by meaning: **events** to react to, or **current state** to look up
- A KTable topic is usually **compacted**, so it can be read from the start
- A KTable record with a **null value** deletes that key from the table`,
  narration:
    "The same records in a topic can be read in two different ways, and Kafka Streams gives each its own type. A KStream treats every record as an independent event. Read the order status topic as a stream, and all four records matter: two orders were placed, one was paid, one was cancelled. A KTable treats every record as an update to the value for its key, so only the latest value per key matters. Read the same topic as a table, and it says order ten forty-one is paid, and order ten forty-three is cancelled. The earlier records have been superseded. In other words, a KTable is a topic read as a changelog, which is exactly what a compacted topic from chapter five is designed to hold. The two are closely related, and this is called stream-table duality. Aggregating a stream produces a table, such as a running total per SKU. And every change to a table can itself be emitted as a stream of updates. So the choice between them is about meaning. Use a stream for events you need to react to, and a table for current state you need to look up.",
}
