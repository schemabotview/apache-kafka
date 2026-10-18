import type { Section } from '../types'

// Plan §10.7 — diagnosing under-replicated partitions.
export const underReplicated: Section = {
  id: 'under-replicated-partitions',
  title: 'Under-replicated partitions',
  scene: 'under-replicated',
  focus: 'patterns',
  slide: `## Under-replicated partitions

**UnderReplicatedPartitions** counts partitions where some replica is out of sync. Above zero is worth investigating; the **pattern** says why.

### Reading the pattern
- All of **one broker's** partitions: that broker is down or restarting
- Followers on one broker lagging: its **disk or network** is slow
- Spread across **every** broker: cluster-wide load, or a big reassignment

### When it becomes urgent
- **UnderMinIsrPartitionCount** above zero: acks=all writes are **refused**
- **OfflinePartitionsCount** above zero: partitions have **no leader**
- Find the cause before restarting anything, or a slow broker becomes a **missing** one
- Short spikes during **rolling restarts** are expected; a lasting count is not`,
  narration:
    "Under-replicated partitions is one of the most important broker metrics. It counts partitions where at least one replica has fallen out of the in-sync set. Any value above zero deserves a look, but the number alone does not say why. The pattern across brokers does. If every partition with a replica on one particular broker is under-replicated, that broker is down or restarting, and the count should fall as it recovers. If the followers on one broker are lagging, but the broker is up, its disk or network is slow, and its follower fetch times will show it. If under-replication is spread across every broker, the cause is cluster-wide: heavy load, or a large partition reassignment copying data around. Two related metrics say when it has become urgent. Under min ISR partition count above zero means some partitions are below min in-sync replicas, so acks all writes to them are already being refused, as chapter five described. And offline partitions count above zero means partitions with no leader at all. Whatever the pattern, find the cause before restarting brokers, or a slow broker becomes a missing one.",
}
