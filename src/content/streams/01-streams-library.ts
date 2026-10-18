import type { Section } from '../types'

// Plan §8.1 — Kafka Streams as a Java library: topology and application identity.
export const salesTopology: Section = {
  id: 'streams-library',
  title: 'Kafka Streams is a library',
  scene: 'sales-topology',
  focus: 'code',
  slide: `## Kafka Streams is a library

**Kafka Streams** is a Java library for processing topics. There is no separate cluster: it runs **inside your application**, and uses Kafka for everything else.

### This topology
- Read **orders**, keep only **PAID** ones
- Regroup by **SKU**, then total each SKU in **5-minute windows**
- Write the running totals to **sales-per-sku**
- Each operator compiles down to ordinary **reads, writes and state**

### application.id
- It names the application's **consumer group**
- It prefixes every **internal topic** the application creates
- Instances that share it **share the work**, like members of a group
- Changing it starts a **new application**: no offsets, no state`,
  narration:
    "Kafka Streams is a Java library for processing data in Kafka topics, and the word library matters. There is no separate processing cluster to run. A Streams application is an ordinary Java program, deployed however you deploy your other services, and it uses Kafka itself for storage, coordination and recovery. The program describes a topology, a graph of operators. This one reads the orders topic, keeps only paid orders, regroups them by SKU, totals each SKU in five-minute windows, and writes the running totals to a topic called sales per SKU. Each operator compiles down to the ordinary things you already know: consumer reads, producer writes, and some local state. The single most important setting is the application id. It names the consumer group the application uses. It prefixes the name of every internal topic the application creates, such as repartition and changelog topics. And every running instance with the same application id shares the work, exactly like members of a consumer group. Change the application id, and to Kafka it is a brand new application, with no committed offsets and no state.",
}
