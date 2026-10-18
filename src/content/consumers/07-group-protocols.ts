import type { Section } from '../types'

// Plan §4.6 — classic and consumer group protocols, and protocol-specific settings.
export const groupProtocols: Section = {
  id: 'group-protocols',
  title: 'Two group protocols',
  scene: 'group-protocols',
  focus: 'compare',
  slide: `## Two group protocols

Kafka 4 has two consumer group protocols, chosen with **group.protocol**. The client default in 4.1 is still **classic**.

### classic
- One member, the group **leader**, computes the assignment
- **session.timeout.ms** and **heartbeat.interval.ms** are client settings
- Rebalances involve the **whole group**, cooperatively or not

### consumer
- The **broker** computes the assignment, with **group.remote.assignor**
- Timeouts and heartbeats are **broker** settings; classic-only client settings are **rejected**
- Rebalances are **incremental**: only affected members do anything
- poll(), commits and offsets behave **the same** under both protocols`,
  narration:
    "Kafka four has two protocols for running a consumer group, and you choose between them with the group protocol setting. They behave the same from the poll loop's point of view: poll, commit and offsets all work identically. What differs is who coordinates the group. In the classic protocol, which is still the client's default in Kafka four point one, one member of the group is elected leader and computes the assignment for everyone, using the client's partition assignment strategy. The session timeout and heartbeat interval are client settings. And a rebalance involves the whole group, whether cooperatively or not. In the newer consumer protocol, the broker computes the assignment, using one of its own assignors, uniform or range, chosen with group remote assignor. Session timeout and heartbeat interval move to the broker too. Rebalances become incremental, so only the members affected by a change do anything. The practical trap when switching is this: settings that only make sense for classic, such as session timeout or assignment strategy, are rejected at start-up, so a configuration that worked yesterday fails to start.",
}
