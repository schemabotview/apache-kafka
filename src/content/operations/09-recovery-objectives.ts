import type { Section } from '../types'

// Plan §11.6 — recovery objectives, retention gaps, backups, and restoration validation.
export const rpoRto: Section = {
  id: 'recovery-objectives',
  title: 'Recovery objectives',
  scene: 'rpo-rto',
  focus: 'objectives',
  slide: `## Recovery objectives

**RPO** is how much data a scenario may lose; **RTO** is how long it may take to recover. Each scenario needs both, checked against what the design **actually delivers**.

### Reading the table
- Losing a broker or a **zone** costs no data, thanks to RF 3 and min ISR 2
- Losing a **region** costs up to the mirroring lag, about 20 seconds
- **Bad data** is recovered by replay, but only within the 7-day retention

### Gaps to plan for
- Replicas copy **mistakes** too: replication is not a backup
- Restoring Kafka is not enough: **sinks** and databases must match
- An objective never **rehearsed** is a guess
- Agree the objectives with the **business**, not only with engineers
- Validate a restore by **reading** the restored data, not by its file size`,
  narration:
    "Recovery objectives turn vague hopes into numbers that can be checked. The recovery point objective, or RPO, is how much data a scenario may lose. The recovery time objective, or RTO, is how long recovery may take. The useful exercise is to list scenarios, give each an objective, and compare it with what the design actually delivers. Losing one broker, or even a whole availability zone, costs no acknowledged data, because replication factor three across three zones, with min in-sync replicas two, keeps two copies of everything. Losing a whole region costs up to the mirroring lag, about twenty seconds of orders, and recovery takes as long as a manual failover and reconciliation. Bad data, such as a bug that wrote wrong prices for an hour, is recovered by fixing the bug and replaying, but only while the source records are within the seven-day retention. Then list the gaps honestly. Replication copies mistakes as faithfully as good data, so it is not a backup. Restoring Kafka is not enough if sink databases disagree with it. And an objective that has never been rehearsed is only a guess.",
}
