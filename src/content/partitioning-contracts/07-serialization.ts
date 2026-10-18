import type { Section } from '../types'

// Plan §2.5 — serialization and deserialization: bytes, JSON, and typed schema formats.
export const serialization: Section = {
  id: 'serialization',
  title: 'Serializers and bytes',
  scene: 'serialization',
  focus: 'broker',
  slide: `## Serializers and bytes

Kafka never sees an *OrderPlaced* object. A **serializer** turns it into bytes, the broker stores those bytes, and a **deserializer** turns them back.

### The broker does not check
- It accepts any bytes, so a malformed record is **stored like any other**
- Writer and reader must agree on the format, **outside Kafka**
- A bad record surfaces later, as a **failure in a reader**, often in another team
- Keys are serialized too, and **identical keys must produce identical bytes**, or they hash apart

### Choosing a format
- **JSON**: readable and universal, but nothing enforces its shape
- **Avro** and **Protobuf**: compact and typed, with a schema that defines each field
- Whichever you choose, it becomes part of the topic's **contract**`,
  narration:
    "Between the producer and the consumer, Kafka never sees an order. It sees bytes. In the producer application, a serializer turns the order object into bytes. The broker stores those bytes and hands them out again unchanged. In the consumer, a deserializer turns them back into an object, and that only works if it understands the format the serializer used. The important consequence is that the broker does not check anything. A record with malformed JSON, or the wrong fields, or even the wrong format entirely, is stored and replicated just like a good one. Nobody finds out until a reader tries to deserialize it and fails, possibly hours later, in a different team's application. So the writer and the reader have to agree on a format, and that agreement lives outside Kafka. JSON is the common starting point. It is readable and every language handles it, but nothing enforces its shape. Avro and Protobuf are compact binary formats with a schema that defines every field and its type. That schema is what makes the contract checkable, which is what the next sections are about.",
}
