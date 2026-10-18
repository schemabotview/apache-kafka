import type { Section } from '../types'

// Plan §3.1 — the Java producer lifecycle, serializers, and resource cleanup.
export const producerLifecycle: Section = {
  id: 'producer-lifecycle',
  title: 'The producer lifecycle',
  scene: 'producer-lifecycle',
  focus: 'code',
  slide: `## The producer lifecycle

A **KafkaProducer** is a long-lived, thread-safe object. Create one per application, share it between threads, and close it once, on shutdown.

### Creating it
- **bootstrap.servers** names brokers to make first contact with, not every broker
- Two **serializers** turn the key and value into bytes
- Everything else has a default; Kafka 4.1 defaults are **safe**, not fast
- Set **client.id**, so broker logs and metrics can name this producer

### What it owns
- A background **sender thread**, network connections and a memory **buffer**
- Creating one per send wastes all of it and is a common performance bug
- **close()** waits for pending sends, then releases everything, so always close it
- One producer writes to **any number of topics**; there is no need for one per topic`,
  narration:
    "Publishing from Java starts with one object, the Kafka producer. It is designed to be long-lived and thread-safe, so the normal pattern is one producer per application, shared by every thread that publishes, and closed once, when the application shuts down. Creating it needs very little. Bootstrap servers is a list of brokers to make first contact with. It does not need to name every broker, because the producer discovers the rest. Then two serializers, one for the key and one for the value, which turn them into bytes. Everything else has a default, and in Kafka four point one those defaults favour safety over speed, which is the right starting point. Behind that small amount of code, the producer owns real resources: a background sender thread, network connections to the brokers it uses, and a memory buffer for records that have not been sent yet. That is why creating a new producer for every send is such a common performance bug. And it is why closing matters. Close waits for pending sends to finish, then releases everything. The try with resources block here does exactly that.",
}
