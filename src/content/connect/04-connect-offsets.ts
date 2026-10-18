import type { Section } from '../types'

// Plan §7.3 — source offsets, sink consumer offsets, and internal configuration and status topics.
export const connectOffsets: Section = {
  id: 'connect-offsets',
  title: 'Where Connect keeps its progress',
  scene: 'connect-offsets',
  focus: 'progress',
  slide: `## Where Connect keeps its progress

Source and sink connectors track progress in **different places**. Resetting either one means knowing which.

### Source connectors
- Their offsets describe a **position in the source**, such as a database log position
- Each connector defines its own format
- They are stored in the **connect-offsets** topic

### Sink connectors
- They are ordinary **consumer groups**, named **connect-** plus the connector name
- Their offsets are Kafka offsets, visible with the usual group tools

### The other internal topics
- **connect-configs** holds every connector config: one partition, compacted
- **connect-status** holds connector and task states`,
  narration:
    "A connector's progress lives in one of two quite different places, depending on its direction, and it is worth knowing which before you ever need to reset one. A source connector reads from an external system, so its offsets describe a position in that system, not in Kafka. For a database change data capture connector, that is a position in the database's log. For a file connector, it is a byte position in the file. Each connector defines its own format, and in distributed mode they are all stored in a compacted Kafka topic called connect offsets. A sink connector reads from Kafka, and under the hood it is an ordinary consumer group, named connect, dash, followed by the connector's name. So its offsets are normal Kafka offsets, and the consumer group tools from chapter four show its lag. Two more internal topics complete the picture. Connect configs holds every connector configuration. It must have exactly one partition, so that configuration changes are read in order, and it should be compacted. Connect status holds the state of every connector and task. Create all three deliberately, with the right settings, rather than leaving them to auto-creation.",
}
