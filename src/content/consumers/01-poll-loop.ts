import type { Section } from '../types'

// Plan §4.1 — the Java consumer lifecycle: subscribe, poll, deserialize, process, and close.
export const pollLoop: Section = {
  id: 'poll-loop',
  title: 'The consumer poll loop',
  scene: 'poll-loop',
  focus: 'code',
  slide: `## The consumer poll loop

A **KafkaConsumer** does nothing on its own. The application drives it from a loop, and the loop's pace is part of the contract with the group.

### The lifecycle
- Configure a **group.id** and two **deserializers**, then **subscribe** to topics
- Each **poll()** fetches a batch of records, up to 500 by default
- Process them **in order**, then poll again
- **close()** leaves the group cleanly, so its partitions move at once

### Rules that follow
- A KafkaConsumer is **not thread-safe**: one thread drives each consumer
- A loop that stops polling for **5 minutes** is treated as failed
- Deserialization happens inside poll(), so a bad record **fails the poll**`,
  narration:
    "Consuming in Java looks like producing at first, with a few properties and a client object, but the shape of the code is different. A Kafka consumer does nothing by itself. The application drives it from a loop. Configure a group id, which names the application, and two deserializers, which turn bytes back into keys and values. Subscribe to the topic. Then loop: each call to poll fetches a batch of records, up to five hundred by default, from the partitions this member owns. Process them, in order, and poll again. When the application stops, close leaves the group cleanly, so its partitions can be handed to another member straight away rather than after a timeout. Three rules follow from this design. Unlike the producer, a consumer is not thread-safe, so exactly one thread drives each consumer. The loop's pace matters: a member that stops calling poll for five minutes is treated as failed, and loses its partitions. And deserialization happens inside poll, so a record that cannot be deserialized makes poll itself fail. Chapter six deals with such poison records.",
}
