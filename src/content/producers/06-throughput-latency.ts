import type { Section } from '../types'

// Plan §3.3 — compression and the throughput/latency trade-offs of batching settings.
export const throughputLatency: Section = {
  id: 'throughput-latency',
  title: 'Trading latency for throughput',
  scene: 'throughput-latency',
  focus: 'settings',
  slide: `## Trading latency for throughput

Larger batches mean fewer requests, better compression and higher throughput, paid for with **a little latency** and **memory**.

### The settings that shape batches
- **linger.ms**: wait longer, and batches fill up more
- **batch.size**: allow larger batches per partition
- **compression.type**: compress whole batches, trading producer CPU for less network and disk

### What they do not change
- None of them changes **what success means**; that is acks, next
- Compression works on batches, so it gains little when batches are tiny
- Batches stay compressed on the broker and in consumer fetches, saving on **every hop**
- Leave the topic's own **compression.type** as *producer*, or brokers recompress
- Measure under **real traffic** before tuning; chapter 10 shows how`,
  narration:
    "Once batching is clear, the throughput settings follow naturally. Larger batches mean fewer requests for the same data, better compression, and more throughput from the same brokers. The cost is a little latency, and some memory. Linger milliseconds is the main lever. Waiting a little longer gives each batch time to fill, which matters most at moderate traffic. Batch size sets how large a batch for one partition may grow. Compression type compresses whole batches. The broker stores them compressed and consumers decompress them, so compression saves network and disk on every hop, at the cost of CPU in the producer and consumers. L Z four and snappy are fast with a moderate ratio. Z standard and gzip squeeze harder for more CPU. Two cautions. None of these settings changes what a successful send means. That is the acks setting, which comes next. And compression works on batches, so when batches are tiny, because linger is zero or traffic is very light, it achieves very little. As always with tuning, measure under realistic traffic before changing anything. Chapter ten covers how.",
}
