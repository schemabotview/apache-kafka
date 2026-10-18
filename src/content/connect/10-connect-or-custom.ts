import type { Section } from '../types'

// Plan §7.8 — Connect versus custom clients, batch orchestration, and managed integrations.
export const connectOrCustom: Section = {
  id: 'connect-or-custom',
  title: 'Connect, custom code or something else',
  scene: 'connect-or-custom',
  focus: 'choice',
  slide: `## Connect, custom code or something else

Connect is the right tool when the job is **moving data** between Kafka and a system that already has a good connector. It is not the answer to every integration.

### Matching tool to job
- **Copying** a table into Kafka, or a topic into a warehouse: **Connect**
- **Business rules** and decisions: a custom consumer or stream processor
- A **nightly bulk** export: a batch job may be simpler
- SaaS to SaaS: a **managed integration** service

### What Connect still costs
- A cluster of workers to **run, upgrade and monitor**
- Connector plugins whose **versions** must match on every worker
- Evaluate a connector like any **dependency**: activity, licence, support
- Writing your own connector is possible; **maintaining** it is the real cost`,
  narration:
    "With all of that in mind, when is Connect actually the right choice? It is at its best when the job is moving data between Kafka and a system that already has a good, well-tested connector. Copying a database table into Kafka, or loading a topic into a warehouse, are its home ground. The connector handles the external system's quirks, and the framework handles offsets, retries and scaling. It is the wrong tool for business logic. Deciding whether an order qualifies for a discount, or reacting to a payment failure, belongs in a custom consumer or a stream processor, where the logic can be tested, versioned and reviewed like any other code. Not everything needs streaming either. A nightly bulk export can be simpler and cheaper as a batch job. And for moving data between two software-as-a-service products, a managed integration service may mean nobody on your team runs anything at all. Connect is also not free. It is a cluster of workers to run, upgrade and monitor, with connector plugins whose versions must match on every worker. Weigh that operational cost along with the convenience.",
}
