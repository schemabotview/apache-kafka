import type { Section } from '../types'

// Plan §5.4 — high watermark, readable progress, and lagging replicas.
export const highWatermark: Section = {
  id: 'high-watermark',
  title: 'The high watermark',
  scene: 'high-watermark',
  focus: 'v-hw',
  slide: `## The high watermark

The leader may hold records that are **not yet safe**. The **high watermark** marks where safe records end, and consumers only read below it.

### How it is computed
- Each in-sync replica has a **log end offset**: its next offset to write
- The high watermark is the **lowest** of them: here 10
- Offsets 0 to 9 are on every in-sync replica, so they are **readable**
- It moves forward as followers **fetch**, and never moves backward

### What it means for readers
- Offsets 10 and 11 exist on the leader but are **hidden** for now
- A slow follower in the ISR therefore **delays** what consumers see
- A consumer never reads a record that a leader failover could **take back**
- Consumer lag is measured against it, not against the leader's last record`,
  narration:
    "The leader of a partition can hold records that are not yet safe, because its followers have not copied them. Kafka needs a way to keep consumers away from those records, and that is the high watermark. Each replica in the ISR has a log end offset, the offset it will write next. The leader and broker three are both at twelve. Broker one, still in sync but a little behind, is at ten. The high watermark is the lowest log end offset across the in-sync replicas: ten. Everything below it, offsets zero to nine, is on every in-sync replica, so it would survive the loss of any of them. Consumers can read it. Offsets ten and eleven are on the leader, and on broker three, but not yet on broker one. They are hidden from consumers until broker one catches up and the high watermark moves. This has two consequences worth remembering. A slow follower that is still in the ISR delays what every consumer can see. And in return, a consumer never reads a record that a leader failover could later take back. That is what makes what a consumer reads consistent across failures.",
}
