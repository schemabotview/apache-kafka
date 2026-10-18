import type { Section } from '../types'

// Plan §7.1 — standalone and distributed execution.
export const distributedMode: Section = {
  id: 'distributed-workers',
  title: 'Standalone and distributed workers',
  scene: 'distributed-mode',
  focus: 'cluster',
  slide: `## Standalone and distributed workers

Connect runs in two modes. They use the same connectors, but they differ in **where state lives** and **what survives** a failure.

### Standalone
- A **single** worker, configured from local files
- Source offsets are kept in a **local file**
- If the process dies, **everything stops** until it is restarted

### Distributed
- Several workers form a **group**, coordinated through Kafka
- Connectors are managed through the **REST API** on any worker
- Configs, offsets and status are stored in **Kafka topics**
- When a worker dies, its tasks are **reassigned** to the others
- Workers need **no shared disk**: everything they need is in Kafka`,
  narration:
    "Connect can run in two modes, and the choice is mostly about where state lives and what survives a failure. In standalone mode there is a single worker, configured from properties files on its local disk, and it keeps source offsets in a local file. It is simple, which makes it good for development and for a few special cases, such as an agent on one particular machine. But if the process dies, every connector it was running stops until someone restarts it. In distributed mode, several workers join a group, coordinated through Kafka in much the same way as a consumer group. Connectors are created and managed through a REST API, which any worker will accept. Connector configurations, source offsets and task status are all stored in Kafka topics, so no single worker holds anything that cannot be recovered. And when a worker dies, the group rebalances, and its tasks are started again on the remaining workers. Here, worker three fails, and its task moves to worker one. That is why distributed mode is the normal choice for production, even when a single worker would have enough capacity.",
}
