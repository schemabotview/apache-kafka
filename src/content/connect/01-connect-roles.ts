import type { Section } from '../types'

// Plan §7.1 — source and sink connectors, workers, and tasks.
export const connectRoles: Section = {
  id: 'connect-roles',
  title: 'Workers, connectors and tasks',
  scene: 'connect-roles',
  focus: 'worker',
  slide: `## Workers, connectors and tasks

**Kafka Connect** is a framework for moving data between Kafka and other systems **without writing client code**. Connectors are configured, not programmed.

### The pieces
- A **worker** is a JVM process that runs connectors
- A **source** connector reads an external system and writes to Kafka
- A **sink** connector reads Kafka and writes to an external system
- Each connector splits its work into **tasks**, which do the copying

### Who does what
- The framework handles **offsets, retries, scaling and restarts**
- The **plugin** knows the external system: its API, protocol and quirks
- Most plugins are **third-party**; Kafka ships only a few examples`,
  narration:
    "Kafka Connect is Kafka's framework for moving data between Kafka and other systems, without writing producer or consumer code yourself. Instead of programming the integration, you configure a connector. There are four pieces to know. A worker is a Java process that runs connectors. A source connector reads from an external system, here the orders database, and writes records into Kafka. A sink connector does the opposite: it reads from Kafka and writes into an external system, here a search index. And each connector splits its work into tasks, which do the actual copying. The orders search sink has two tasks, sharing the three partitions of the orders topic between them, much like members of a consumer group. The division of labour is the point of Connect. The framework handles the general problems: tracking offsets, retrying, scaling out across tasks, and restarting after failures. The connector plugin handles what is specific to the external system, its API, its protocol, and its quirks. One thing to be clear about from the start: most connector plugins are third-party software. Apache Kafka itself ships only a few, mostly as examples.",
}
