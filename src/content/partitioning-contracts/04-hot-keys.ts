import type { Section } from '../types'

// Plan §2.2 — hot keys: skewed keys concentrate load on one partition and one consumer.
export const hotPartition: Section = {
  id: 'hot-keys',
  title: 'Hot keys and hot partitions',
  scene: 'hot-partition',
  focus: 'p1',
  slide: `## Hot keys and hot partitions

Keyed by region, the default partitioner sends **eu and us to partition 1** and apac to partition 2. Partition 0 receives nothing at all.

### What skew does
- Assuming eu and us are **80%** of orders, one partition takes most of the load
- In the group, **one member** falls behind while the others are idle
- Lag grows on partition 1 only, so the backlog is **uneven**
- The broker leading partition 1 also carries more **disk and network** load

### What does not fix it
- **Adding members**: a partition is read by one member at a time
- Adding partitions: three key values still reach at most three partitions
- The fix is a **better key**, chosen before the data has history and readers depend on it`,
  narration:
    "Here is the region key in practice, and the partition numbers are real. With three partitions, the default partitioner's hash sends both eu and us to partition one, apac to partition two, and nothing at all to partition zero. Now assume, for this example, that eu and us together are eighty percent of the orders. Partition one carries most of the traffic. In the fulfilment group, the member that owns partition one falls further and further behind, while one member has nothing to do and the third is mostly idle. Lag is growing, but only on one partition. The tempting fix is to add more members to the group, and it does nothing, because a partition is read by only one member of a group at a time. The extra member just waits. Adding partitions does not rescue it either: three key values can still reach, at most, three partitions, and they might collide again. The real fix is a different key, and that is much easier to choose before the topic has years of history and readers depending on the current one. Chapter ten comes back to diagnosing hot partitions from metrics.",
}
