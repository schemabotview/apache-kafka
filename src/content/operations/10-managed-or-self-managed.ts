import type { Section } from '../types'

// Plan §11.7 — self-managed versus managed Kafka: responsibilities, cost, and portability.
export const managedOrSelf: Section = {
  id: 'managed-or-self-managed',
  title: 'Self-managed or managed Kafka',
  scene: 'managed-or-self',
  focus: 'split',
  slide: `## Self-managed or managed Kafka

A managed service takes over the **brokers**: hardware, patching, upgrades. It never takes over the **data design**, which stays yours either way.

### What moves to the provider
- Hardware, operating systems and **broker processes**
- **Upgrades** and patching, on the provider's schedule
- Part of **capacity**: you still choose a size

### What stays with you
- Topics, keys, partitions and **schemas**
- **ACLs** and the protection of sensitive data
- Consumer **correctness**: offsets, duplicates, replays

### Weigh as well
- **Cost**, **portability** of provider-only features, and **limits** on versions and configs
- Read the provider's **durability** settings: replication, zones, min ISR
- A managed cluster still needs your **runbooks** for your own applications`,
  narration:
    "Running Kafka yourself is not the only option, and managed Kafka services are common. The useful way to compare them is by responsibility. A managed service takes over the brokers: the hardware, the operating systems, the broker processes, and their monitoring. It takes over upgrades and patching, usually on the provider's schedule rather than yours. And it takes over part of capacity, although you still choose a size and pay for it. What never moves to the provider is the data design, which is most of this course. Topics, keys, partition counts and schemas are still your decisions, with the same consequences for ordering and evolution. ACLs, and the protection of sensitive data, are still yours. And consumer correctness, meaning commits, duplicates, replays and idempotent effects, is entirely yours, because it lives in your applications. Weigh three more things. Cost, comparing service fees with the staff time self-management really takes. Portability, because features only one provider offers make leaving harder. And limits, because a managed service may restrict versions or configuration settings that this course has relied on.",
}
