import type { Section } from '../types'

// Plan §10.3 — partition and replica planning, and the costs of excess partitions.
export const partitionPlanning: Section = {
  id: 'partition-planning',
  title: 'Planning partitions',
  scene: 'partition-planning',
  focus: 'calc',
  slide: `## Planning partitions

The partition count sets a group's **maximum parallelism**, so size it from the **slowest consumer** at **peak**, then add room to grow.

### The calculation
- Peak traffic: **2 000** records a second
- One fulfilment member handles **100** a second, measured
- So the group needs **20** members, and so 20 partitions
- Choose **24**, so growth does not force the key moves of chapter 2

### Why not just choose 500
- Each partition costs **files** and **memory** on every replica
- Failover has more **leaders** to move
- Traffic spreads thinner, so batches get **smaller**
- Re-measure the per-member rate after **code changes**; it drifts
- Brokers have practical **limits** on partitions each; check before going large`,
  narration:
    "Chapter two showed that adding partitions later moves keys, and chapter four showed that the partition count caps a group's parallelism. So it is worth sizing the count deliberately, from the slowest consumer, at peak. Peak traffic is two thousand records a second. Fulfilment is the slowest consumer, because each order involves a warehouse system, and one member was measured handling about one hundred records a second. So at peak, the group needs twenty members working at once, which means at least twenty partitions. Choosing twenty-four leaves room to grow without repartitioning, and divides evenly among a few broker counts. Why not choose five hundred and never think about it again? Because partitions are not free. Every partition has files, segments and indexes, on every one of its replicas. Producers and consumers hold buffers for each partition they use. When a broker fails, every partition it led needs a new leader, so failover has more work to do. And with traffic spread across more partitions, each partition's batches are smaller, which costs efficiency. A count based on measurement, with headroom, beats a big round number.",
}
