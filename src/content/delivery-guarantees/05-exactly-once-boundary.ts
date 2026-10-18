import type { Section } from '../types'

// Plan §6.4 — exactly-once Kafka read/process/write boundaries and their assumptions.
export const eosBoundary: Section = {
  id: 'exactly-once-boundary',
  title: 'Where exactly-once ends',
  scene: 'eos-boundary',
  focus: 'outside',
  slide: `## Where exactly-once ends

Kafka's **exactly-once** means one thing precisely: reading, processing and writing **Kafka topics**, with offsets committed in the same transaction.

### Inside the boundary
- Input offsets and output records commit **together**
- A retry after a failure produces **no duplicate output**
- It assumes **deterministic** processing: same input, same output
- Readers of the output must use **read_committed**, or they see aborted attempts

### Outside the boundary
- A **card charge**, an **email**, a **database row** are not in the transaction
- An abort cannot undo them, and a retry will **repeat** them
- So a Kafka transaction cannot atomically charge a payment service
- Kafka Streams offers the same guarantee with **one setting**, in chapter 8`,
  narration:
    "Exactly once is one of Kafka's most quoted features, and one of the most misread. Kafka's exactly once means something precise. When an application reads from Kafka topics, processes, and writes to Kafka topics, with its input offsets committed in the same transaction, each input record affects the output exactly once. A failure and retry produce no duplicate output, because the failed attempt was aborted as a whole. That holds under one assumption: that processing is deterministic, so a retried batch produces the same output as the first attempt would have. Now look outside the boundary. The pricer might also charge a card, send an email, or write a row to a database. None of those are part of the Kafka transaction. If the transaction aborts, the charge has still happened, and the email has still been sent. When the batch is retried, they happen again. So, to state it plainly, a Kafka transaction cannot atomically charge an external payment service. Everything outside Kafka needs its own protection against repeats, and the next two sections show the two standard techniques.",
}
