import type { Section } from '../types'

// Plan §2.1 — topic boundaries and event granularity: which events must share a topic.
export const topicBoundaries: Section = {
  id: 'topic-boundaries',
  title: 'Drawing topic boundaries',
  scene: 'topic-boundaries',
  focus: 'by-entity',
  slide: `## Drawing topic boundaries

A topic boundary is a decision about **ordering**. Kafka only orders records within one partition of one topic, so events that must be read in sequence have to live together.

### Splitting by event type
- *orders-placed*, *orders-paid* and *orders-shipped* are three separate logs
- A reader can see **PAID before PLACED** for the same order
- Each reader has to reassemble the lifecycle itself, buffering events until the earlier ones arrive
- Splitting **does** suit events that are never read together, such as clickstream and orders

### One topic for the lifecycle
- Every order event goes to *orders*, keyed by **order id**
- A **type field** says which event it is
- One order's events stay **in sequence**, at the cost of readers skipping types they do not need`,
  narration:
    "The first design decision for any event stream is where one topic ends and the next begins, and it is mostly a decision about ordering. Kafka keeps records in order only within a single partition of a single topic. Two topics are two unrelated logs. So look at the left-hand design, which feels tidy: one topic for placed orders, one for paid, one for shipped. A reader subscribed to all three can easily see the payment for an order before it sees the order itself, because nothing relates the position in one topic to the position in another. Every reader then has to buffer and reassemble the lifecycle on its own. The right-hand design puts every event about an order into one topic, keyed by the order id, with a field saying which kind of event each record is. Now one order's events always sit in one partition, in the order they were written. The price is that a reader interested only in shipments has to read past the other types and skip them. A useful rule of thumb: events that must be read in order relative to each other belong in the same topic, with the same key.",
}
