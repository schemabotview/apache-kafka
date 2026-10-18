import type { Section } from '../types'

// Plan §5.3 — replication factor, minimum in-sync replicas, and acknowledgements together.
export const failureMatrix: Section = {
  id: 'durability-settings',
  title: 'Replication factor, min ISR and acks',
  scene: 'failure-matrix',
  focus: 'matrix',
  slide: `## Replication factor, min ISR and acks

Durability comes from **three settings together**. The common choice is replication factor **3**, **min.insync.replicas 2**, and **acks=all**.

### Reading the matrix
- With 3 or 2 in-sync replicas, every acknowledged write is on **at least two brokers**
- With only 1, writes are **refused** with NOT_ENOUGH_REPLICAS, but reads continue
- So one broker can fail **without losing data or writes**
- Refusing writes is **deliberate**: better to stop than to keep data one failure from loss

### Who sets what
- The **topic** sets its replication factor
- **min.insync.replicas** is a topic or cluster setting; its default is only 1
- Each **producer** chooses acks, so a producer using acks=1 opts out
- Replication factor 3 also triples **disk** use and replication traffic`,
  narration:
    "No single setting makes Kafka durable. Three settings work together, and they are owned by different people. The replication factor belongs to the topic. Min in-sync replicas is set on the topic, or for the whole cluster. And acks is chosen by each producer. The common durable combination is replication factor three, min in-sync replicas two, and acks all. Read the matrix row by row. With all three replicas in sync, writes are accepted, and every acknowledged record is on three brokers. Lose one broker, and writes are still accepted, now with two copies. That is the point of the combination: one broker can fail without losing data and without stopping writes. Lose a second, and only the leader is in sync. Now the leader refuses writes with a not enough replicas error, because it cannot guarantee two copies. Reads carry on. Nothing acknowledged has been lost. It is a deliberate choice to stop rather than to accept writes that are one failure away from loss. Notice the ownership problem too. A single producer configured with acks one quietly opts out of all of this.",
}
