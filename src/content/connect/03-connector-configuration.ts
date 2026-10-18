import type { Section } from '../types'

// Plan §7.2 — connector configuration, converters, schemas, and plugin boundaries.
export const connectorConfig: Section = {
  id: 'connector-configuration',
  title: 'Configuring a connector',
  scene: 'connector-config',
  focus: 'request',
  slide: `## Configuring a connector

A connector is created by posting **JSON** to the REST API. Its settings come from **three layers**, and knowing which layer owns a setting saves hours.

### The three layers
- **Framework** settings: the name, **tasks.max** and the topics
- **Converters**: how Kafka bytes become structured records, and back
- **Plugin** settings: everything about the external system
- The plugin must be installed on **every worker** in the cluster

### Converters and schemas
- **JsonConverter** with schemas off expects plain JSON values
- The converter must match **how the topic was written**, or every record fails
- A schema registry needs its own **third-party** converter`,
  narration:
    "A connector is created by sending its configuration, as JSON, to the Connect REST API. This one is a sink that loads the orders topic into a warehouse database, and it uses a third-party JDBC connector, so the class name here is illustrative. It helps to see the settings as three layers. Framework settings belong to Connect itself: the connector's name, tasks max, which caps how many tasks it may run, and the topics to read. Converters decide how the bytes in Kafka become structured records the connector can work with, and back again. Here the key is a plain string, and the value is plain JSON, without an embedded schema. Everything else belongs to the plugin, such as the connection URL and the insert mode, and only that plugin's documentation can tell you what they mean. Two practical warnings. The plugin must be installed on every worker in the cluster, because a task can be scheduled onto any of them. And the converter must match how the topic was actually written. A converter expecting a different format fails every single record, which is one of the most common Connect problems in practice.",
}
