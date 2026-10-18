import type { Section } from '../types'

// Plan §10.4 — producer batching/compression and consumer fetch/processing trade-offs.
export const clientTradeoffs: Section = {
  id: 'client-tradeoffs',
  title: 'Producer and consumer trade-offs',
  scene: 'client-tradeoffs',
  focus: 'consumer',
  slide: `## Producer and consumer trade-offs

The consumer's fetch settings **mirror** the producer's batching settings: wait a little longer, and get **fuller, cheaper** requests.

### The consumer side
- **fetch.min.bytes**: the broker waits until at least this much data is ready
- **fetch.max.wait.ms**: but never longer than this, 500 ms by default
- **max.partition.fetch.bytes**: up to 1 MiB per partition per fetch
- **max.poll.records**: how many records each poll() hands the loop

### Where time actually goes
- Fetching is usually **fast**; processing is usually the bottleneck
- Measure **handler time** before tuning any fetch setting`,
  narration:
    "Chapter three covered the producer's side of the latency and throughput trade-off: linger and batch size decide how full each batch is, and compression trades CPU for bytes. The consumer has the mirror image of those settings. Fetch min bytes tells the broker not to answer a fetch until at least that much data is ready. The default is one byte, which means answer immediately. Fetch max wait caps how long the broker will wait for that amount, five hundred milliseconds by default. Raise the minimum, and fetches become fuller and cheaper, at the cost of a little delay when traffic is light. Max partition fetch bytes caps how much one fetch returns for each partition, one mebibyte by default. And max poll records caps how many records each poll hands to the loop. Here is the practical caution. For most applications, fetching is not the bottleneck. Processing is: the database write, the call to the warehouse system, the business logic. So before tuning any fetch setting, measure how long the handler takes per record. Tuning fetches for a consumer that is busy processing changes nothing at all.",
}
