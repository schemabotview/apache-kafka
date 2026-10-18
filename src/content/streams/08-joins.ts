import type { Section } from '../types'

// Plan §8.6 — stream-table and stream-stream joins: keys, co-partitioning, and time boundaries.
export const joins: Section = {
  id: 'joins',
  title: 'Joining streams and tables',
  scene: 'joins',
  focus: 'kinds',
  slide: `## Joining streams and tables

Kafka Streams joins records **by key**. A **stream-table** join looks up current state; a **stream-stream** join pairs events that happen close together.

### Two kinds
- **Orders ⋈ customers**: each order looks up the customer's **current** tier
- No window: a later change to the customer does **not** revisit old orders
- **Orders ⋈ payments**: pairs an order and its payment within **10 minutes**
- A stream-stream join always needs a **JoinWindows**

### Co-partitioning
- Both inputs need the **same key**, the same **partition count** and the same partitioner
- Otherwise matching records sit in **different tasks**, and never meet
- A **GlobalKTable** is copied to every instance, so it needs no co-partitioning
- Re-keying one side to match the other forces a **repartition**`,
  narration:
    "Kafka Streams joins records by key, and there are two kinds of join worth knowing well. A stream-table join enriches each event with current state. Here, each order looks up its customer in a customers table, to find their loyalty tier. There is no window. The order is joined with whatever value the table holds at the moment the order is processed. If the customer's tier changes a minute later, the old order is not revisited. A stream-stream join pairs events from two streams that relate to each other in time. Here, each order is paired with its payment, provided they happened within ten minutes of each other. Because either side could arrive first, both sides are buffered for the window, so a stream-stream join always needs a join window. Both joins share one hard requirement: co-partitioning. The two inputs must use the same key, have the same number of partitions, and use the same partitioner, so that matching records land in the same partition number, and so in the same task. If they do not, matching records sit in different tasks, and simply never meet. Streams checks partition counts, but keys are your responsibility.",
}
