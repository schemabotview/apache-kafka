import type { Section } from '../types'

// Plan §7.7 — connector-specific delivery guarantees and external sink idempotency.
export const sinkRepeat: Section = {
  id: 'connector-guarantees',
  title: 'Connector delivery guarantees',
  scene: 'sink-repeat',
  focus: 'timeline',
  slide: `## Connector delivery guarantees

Connect does not give one guarantee for every connector. What a connector promises depends on **the plugin** and on **the external system**.

### Why sinks repeat writes
- A sink task writes records, then commits offsets **periodically**
- If its worker dies in between, the restarted task **writes them again**
- So most sinks are **at least once**

### Making repeats harmless
- **Upsert by key** instead of insert, so a repeat rewrites the same row
- **Exactly-once source** support exists, in distributed mode, for connectors that implement it
- Read each connector's **documented** guarantee; never assume one
- Test it by **killing a worker** mid-load, then counting rows in the target
- Exactly-once sinks need **read_committed** consumers for transactional topics`,
  narration:
    "It is tempting to assume that Connect provides one delivery guarantee for every connector. It does not. What a connector actually promises depends on the plugin's implementation, and on what the external system can do. Walk through a sink. Task one of the warehouse connector has committed offset thirty. It writes offsets thirty to thirty-nine into the warehouse, ten rows. Offsets are committed periodically, not after every write, and before the next commit, its worker dies. When the task restarts on another worker, it resumes from thirty, and writes the same ten records again. So most sink connectors are at least once. Whether that matters depends on how the sink writes. With plain inserts, the warehouse now has duplicate rows. With upserts by key, the repeat simply rewrites the same rows with the same values, and is harmless. That is why upsert modes exist in so many sink connectors. On the source side, Kafka supports exactly-once source connectors, in distributed mode only, but only for connectors that implement it. The rule is to read each connector's documented guarantee, and never assume one.",
}
