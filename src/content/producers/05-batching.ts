import type { Section } from '../types'

// Plan §3.3 — batches, buffering, and the conditions that send a batch.
export const batching: Section = {
  id: 'batching',
  title: 'Batches, linger and the buffer',
  scene: 'batching',
  focus: 'buffer',
  slide: `## Batches, linger and the buffer

The producer never sends records one by one. It groups them into **one open batch per partition**, and sends a batch as one request.

### When a batch is sent
- When it reaches **batch.size**, 16 KB by default
- When it has waited **linger.ms**, which is 5 ms by default since Kafka 4.0
- Whichever comes first, so a quiet partition still sends within milliseconds
- Records join a batch **in send order**, so batching itself never reorders them

### When the buffer fills
- All open batches live in **buffer.memory**, 32 MiB by default
- If brokers fall behind, it fills, and **send() blocks**
- After **max.block.ms**, 60 s by default, the send fails instead
- Many partitions mean many **small** batches, which share the same buffer`,
  narration:
    "Underneath send, the producer is not sending records one at a time. For every partition it keeps one open batch, and each new record for that partition is appended to it. A batch is sent as a single request in one of two situations: when it reaches batch size, sixteen kilobytes by default, or when it has waited for linger milliseconds, which is five milliseconds by default since Kafka four point oh. Whichever happens first wins. So on this screen, partition one's batch is full and goes immediately, partition two's small batch has waited five milliseconds and goes too, and partition zero's batch is still filling. Even a very quiet partition sends within a few milliseconds. All of these open batches live inside a fixed memory buffer, thirty-two mebibytes by default. Normally it never comes close to full. But if the brokers slow down, or become unreachable, batches cannot leave, and the buffer fills. Then send stops returning immediately. It blocks, for up to max block milliseconds, sixty seconds by default, and then fails. That is the moment a slow cluster becomes a slow application.",
}
