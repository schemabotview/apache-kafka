import type { Section } from '../types'

// Plan §9.5 — least privilege for Connect and Streams internal topics and service identities.
export const internalTopicsAcls: Section = {
  id: 'internal-topic-acls',
  title: 'Least privilege for frameworks',
  scene: 'internal-topics-acls',
  focus: 'needs',
  slide: `## Least privilege for frameworks

Kafka Streams and Connect create **their own topics and groups**. Their names follow known patterns, so **prefixed ACLs** can cover exactly them.

### What they need
- **Streams**: topics and the group named after its **application.id**
- **Connect**: its internal topics and groups, which share the **connect-** prefix
- Prefixed ACLs grant those names, and **nothing beyond** them

### What to avoid
- **Cluster-wide Create**, which lets a service create any topic
- **Wildcard** topic ACLs, which let it read everything
- One **shared** principal for every connector, where avoidable
- Streams needs **Create** on its prefix, because it creates its own topics
- Check each framework's **documented ACL list**, such as Connect's for exactly-once`,
  narration:
    "Frameworks make least privilege slightly harder, because they create topics and groups of their own. Kafka Streams creates repartition and changelog topics, and Connect creates its configuration, offsets and status topics, plus a consumer group for every sink connector. The good news is that their names follow known patterns. Every internal topic of a Streams application starts with its application id, and its consumer group is named after it. Connect's internal topics and groups share the connect prefix by default. So prefixed ACLs can grant exactly those names, and nothing beyond them. The sales totals principal gets create, read and write on topics starting with sales totals, and read on the group with that name. Compare that with the shortcuts people reach for under deadline pressure. Cluster-wide create lets the service create any topic at all. A wildcard topic ACL lets it read every topic in the cluster, including ones holding sensitive data. And a single principal shared by every connector means one leaked secret opens every integration at once. Separate principals per connector take more setup, and are worth it where the cluster allows.",
}
