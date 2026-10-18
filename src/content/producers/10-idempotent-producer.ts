import type { Section } from '../types'

// Plan §3.6 — idempotent production, its configuration constraints, and its deduplication boundary.
export const idempotentProducer: Section = {
  id: 'idempotent-producer',
  title: 'The idempotent producer',
  scene: 'idempotent-producer',
  focus: 'retry',
  slide: `## The idempotent producer

With idempotence, each producer gets a **producer id**, and each batch carries a **sequence number** per partition. The broker uses them to recognise a retry.

### What it fixes
- The lost-ack retry arrives with sequence 12 again, so **no second copy** is written
- Batches cannot land out of order within a partition
- It is **on by default** in Kafka 4.1
- Readers **never see** the duplicate
- The broker tracks recent **sequence numbers** per producer id and partition

### Its constraints and boundary
- It needs **acks=all**, retries enabled, and at most 5 requests in flight
- Setting acks=1 without asking for idempotence **silently switches it off**
- It covers only **one producer instance**
- Duplicates from a restart or a re-send need an **eventId**: the next section`,
  narration:
    "Idempotence is Kafka's answer to both problems you have just seen. When it is on, the broker assigns each producer a producer id, and the producer numbers its batches for each partition: twelve, thirteen, and so on. Now replay the lost acknowledgement. The retry arrives carrying sequence twelve again. The broker has already appended twelve, so it recognises the retry, writes nothing, and simply replies with success. One send, one record. The same sequence numbers stop reordering, because the broker will not accept thirteen before twelve. It is switched on by default in Kafka four point one, but it has conditions: acks must be all, retries must be enabled, and there may be at most five requests in flight. Here is the trap. If you set acks to one, and do not explicitly ask for idempotence, the producer quietly switches idempotence off, with only an informational log line. If you do explicitly enable it, the same setting is a configuration error instead. Finally, the boundary. Idempotence only covers retries inside one producer instance. A restarted application gets a new producer id, and a deliberate re-send gets a new sequence number.",
}
