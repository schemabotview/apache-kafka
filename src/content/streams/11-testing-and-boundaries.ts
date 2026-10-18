import type { Section } from '../types'

// Plan §8.8 — topology tests, restart evidence, and Kafka Streams versus Spark/Flink boundaries.
export const testingBoundaries: Section = {
  id: 'testing-and-boundaries',
  title: 'Testing, and where Streams fits',
  scene: 'testing-boundaries',
  focus: 'compare',
  slide: `## Testing, and where Streams fits

A topology can be tested **without any broker**. **TopologyTestDriver** pipes records in with chosen timestamps and reads the outputs back, in milliseconds.

### What to test
- **Window boundaries**: records just inside and just outside grace
- **Late records** and out-of-order timestamps
- **Restart evidence**: stop and start an instance, then compare totals

### Choosing the tool
- **Kafka Streams** suits per-key services that live next to Kafka
- **Spark** and **Flink** run as separate clusters, with many sources and sinks
- Large analytics jobs often fit them better; Spark is in its **own course**
- Streams state is **per instance**: there is no shared store to query by default
- Its strength is operational: no extra cluster, just **another service**`,
  narration:
    "Stream processing code has a reputation for being hard to test. Kafka Streams makes it easier than you might expect, because a topology can be tested with no broker at all. Topology test driver runs the topology in memory. The test pipes input records in, each with a timestamp you choose, and reads the output topic back, and the whole test runs in milliseconds. That control over timestamps is what makes it valuable. Test window boundaries with records just inside and just outside the grace period. Test late and out-of-order records deliberately, because production will send them. Then gather restart evidence in a real environment: stop an instance mid-load, start it again, and check that the totals match a run with no failure. Finally, where does Kafka Streams fit? It is at its best for per-key processing services that live next to Kafka, read Kafka topics, and are deployed like any other service. Spark and Flink run as separate processing clusters, connect to many kinds of source and sink, and are often a better fit for large analytical jobs. Spark Structured Streaming is covered in its own course.",
}
