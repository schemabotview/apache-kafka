import type { Section } from '../types'

// Plan §11.2 — broker addition, partition reassignment, throttling, and replica placement.
export const reassignment: Section = {
  id: 'partition-reassignment',
  title: 'Adding a broker and moving partitions',
  scene: 'reassignment',
  focus: 'cmds',
  slide: `## Adding a broker and moving partitions

A new broker joins the cluster **empty**. Kafka never moves existing partitions on its own, so they must be **reassigned** to it.

### The three steps
- **--generate** proposes a plan that spreads partitions over the listed brokers
- **--execute** starts copying, with a **--throttle** on replication traffic
- **--verify** reports progress, and **removes the throttle** when complete

### While it runs
- New replicas copy every byte of their partitions, which takes **time**
- The copy competes with clients for **disk and network**
- Forgetting --verify leaves the throttle in place, **slowing** later recovery
- Leadership moves to new replicas too, so **client load** shifts as well`,
  narration:
    "When the cluster needs more capacity, adding a broker is the obvious step, and it surprises people that the new broker starts out doing nothing at all. Kafka never moves existing partitions by itself. The new broker will only receive partitions created after it joined, unless existing ones are deliberately reassigned to it. The tool for that is kafka reassign partitions, and it works in three steps. Generate takes a list of topics and the brokers to spread them over, and proposes a plan. Execute starts carrying it out. For each partition that gains a replica on broker four, broker four copies every byte of that partition from the leader, so the throttle option caps how much bandwidth replication may use, here fifty megabytes a second, to protect clients. Verify reports progress, and once the reassignment has completed, it also removes the throttle. That last detail matters more than it seems. Forget to run verify, and the throttle stays in place, quietly limiting replication. The next time a broker fails and its replicas need to catch up, they catch up slowly, and the cluster stays under-replicated far longer than it should.",
}
