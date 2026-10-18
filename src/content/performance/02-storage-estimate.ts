import type { Section } from '../types'

// Plan §10.2 — estimating storage from ingress, retention, replication, and overhead assumptions.
export const storageEstimate: Section = {
  id: 'storage-estimate',
  title: 'A storage estimate',
  scene: 'storage-estimate',
  focus: 'steps',
  slide: `## A storage estimate

A storage estimate is a chain of multiplications. Writing the **unit at every step** is what catches the mistakes.

### The chain for orders
- **200 KiB/s** in, which is **16.5 GiB** a day
- Seven days of retention: **115 GiB**
- Halved by compression, measured on samples: **58 GiB**
- Tripled by replication: **173 GiB** across the cluster, about 58 GiB per broker

### What it leaves out
- Every **other topic**, including internal and changelog topics
- **Active segments**, which outlive retention
- **Growth** and **headroom**: never plan to fill a disk
- Compression ratios vary widely, so **measure** them on real batches
- Recheck the estimate once **real traffic** arrives
- Keys, headers and **batch overhead** add bytes the schema does not show`,
  narration:
    "A storage estimate is a chain of multiplications, and the way to keep it honest is to write the unit at every step. Here is the chain for the orders topic. Two hundred records a second, at one kibibyte each, is two hundred kibibytes per second. Multiply by eighty-six thousand four hundred seconds, and that is sixteen and a half gibibytes a day. Seven days of retention makes one hundred and fifteen gibibytes. Compression, which was measured on real sample records rather than assumed, halves that, to fifty-eight. Replication factor three triples it, to one hundred and seventy-three gibibytes across the cluster, or about fifty-eight per broker, if partitions are evenly balanced. Then be explicit about what the estimate leaves out, because that is where real clusters run out of disk. Every other topic, including priced orders, repartition topics and changelogs. Active segments, which are kept beyond the retention period, as chapter five showed. Growth over the next year. And headroom. Never plan to fill a disk, because a full disk on a broker takes its partitions offline, and recovery needs space to work in.",
}
