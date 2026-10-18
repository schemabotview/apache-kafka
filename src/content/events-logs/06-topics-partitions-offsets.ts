import type { Section } from '../types'

// Plan §1.3 — topics, partitions and offsets: per-partition order, key routing.
export const topicPartitions: Section = {
  id: 'topics-partitions-offsets',
  title: 'Topics, partitions and offsets',
  scene: 'topic-partitions',
  focus: 'p1',
  slide: `## Topics, partitions and offsets

A **topic** is a named stream, split into **partitions**. Each partition is its own ordered log, with its own offsets counting from 0.

### What the key decides
- The default partitioner hashes the **key**, modulo the partition count
- Every record for o-1041 therefore lands in **partition 1**
- That keeps one order's events **in order**: *PLACED* before *PAID*
- Records **without a key** are spread across partitions, so they get no ordering promise

### What offsets do not tell you
- Offset 1 means different records in different partitions
- There is **no order across partitions**, only within each one
- A design that needs a total order has to get it from **keys and topic choices**, which is the next chapter`,
  narration:
    "A topic is a named stream of records, orders in this case, but it is not stored as one long log. It is split into partitions, three here, and each partition is its own ordered log with its own offsets, each counting up from zero. When checkout sends a record with a key, the default partitioner hashes the key and takes the result modulo the number of partitions. These are the real results for these keys: o-ten forty lands in partition zero, ten forty-one in partition one, and ten forty-two in partition two. Because the same key always hashes to the same partition, every event about order ten forty-one lands in partition one, in the order it was written, so placed always comes before paid. That is the ordering guarantee Kafka gives, and it is per partition. Now look at what offsets do not tell you. Offset one in partition zero and offset one in partition one are unrelated records. There is no single order across the whole topic, and if your design needs one, that need has to be dealt with in how you choose keys and topics, which is exactly where the next chapter starts.",
}
