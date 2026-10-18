import type { Section } from '../types'

// Plan §5.5 — leader failure and election choices.
export const leaderElection: Section = {
  id: 'leader-election',
  title: 'Electing a new leader',
  scene: 'leader-election',
  focus: 'order',
  slide: `## Electing a new leader

When a leader fails, the **controller** picks a new one. In Kafka 4.1 it tries the safe choices first, in a fixed order.

### The order of preference
- An **ISR member**: it has every acknowledged record
- An **ELR member**: a replica that left the ISR while it was still safe to elect
- The **last known leader**, if it comes back
- ELR, **Eligible Leader Replicas**, is on by default for new 4.1 clusters
- With an ISR member available, failover usually takes **seconds**

### If no safe replica is available
- By default the partition stays **offline**: reads and writes stop
- An **unclean** election would pick any replica, and lose data
- Clients see **NOT_LEADER** errors and retry while a new leader is chosen`,
  narration:
    "When the broker leading a partition fails, the partition has no leader, and nothing can be written to it or read from it until the controller elects a new one. The controller does not pick at random. In Kafka four point one it works through a fixed order of preference, safest first. First choice, any member of the ISR, because an in-sync replica has every record that was acknowledged. Second, a member of the ELR, the eligible leader replicas. These are replicas that dropped out of the ISR at a moment when the controller could prove they still had every acknowledged record, so they are safe to elect too. ELR is enabled by default on new clusters in four point one. Third, the last known leader, if it comes back. Usually the first choice works and failover takes seconds. But if none of these replicas is available, the default is to wait. The partition stays offline, refusing reads and writes, until a safe replica returns. The alternative, an unclean election, would bring the partition back with whatever an out-of-sync replica happens to have, which is the subject of the next section.",
}
