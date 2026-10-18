import type { Section } from '../types'

// Plan §6.2 — Kafka transactions: identity, atomic output, and offset commits.
export const transactionsApi: Section = {
  id: 'kafka-transactions',
  title: 'Kafka transactions',
  scene: 'transactions-api',
  focus: 'atomic',
  slide: `## Kafka transactions

A **transactional producer** can write to several partitions and commit a consumer's offsets, all as **one atomic unit**.

### The loop
- **initTransactions()** registers the **transactional.id** once, at start-up
- Each batch runs inside **beginTransaction()** and **commitTransaction()**
- **sendOffsetsToTransaction()** puts the input offsets into the same transaction
- On error, **abortTransaction()** discards outputs and offsets together

### What it guarantees
- Output records and input offsets become visible **together, or not at all**
- A crash mid-transaction leaves **nothing** to clean up
- It only covers **Kafka topics**, never a database or an API call
- A transaction left open is aborted after **transaction.timeout.ms**, 60 s`,
  narration:
    "Kafka transactions solve the consume, process and produce pattern: read orders, compute something, and write results to another topic. A transactional producer is configured with a transactional id, and it calls init transactions once, at start-up. Then each batch runs inside a transaction. Begin transaction. Send every output record, here priced orders. Then, and this is the key step, send offsets to transaction, which adds the consumer group's input offsets to the same transaction. Finally, commit transaction. Either all of it becomes visible together, the output records and the input offsets, or none of it does. If anything fails, abort transaction discards the outputs and the offsets together, and the loop rewinds to the last committed position and tries again. A crash halfway through a transaction leaves nothing half done to clean up, because the coordinator will abort it. A transaction that stays open too long is aborted too, after the transaction timeout, sixty seconds by default. Keep the scope in mind, though. A transaction covers Kafka topics and Kafka offsets. It never reaches a database write or a call to another service.",
}
