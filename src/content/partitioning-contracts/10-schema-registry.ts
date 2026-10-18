import type { Section } from '../types'

// Plan §2.7 — registry responsibilities, and the distinction between a schema registry and Apache Kafka.
export const schemaRegistry: Section = {
  id: 'schema-registry',
  title: 'What a schema registry does',
  scene: 'schema-registry',
  focus: 'registry',
  slide: `## What a schema registry does

A **schema registry** stores schema versions and checks each new one against a compatibility rule. It is an **ecosystem service** beside Kafka, not part of Apache Kafka.

### How a record finds its schema
- The producer's serializer **registers** the schema and gets an id
- Each record carries only that **id**, not the whole schema
- The consumer's deserializer **fetches** the schema by id, and caches it
- A version that fails the compatibility check is **rejected**, so the producer fails before writing

### What it does not do
- The broker still stores **opaque bytes** and checks nothing
- A producer that bypasses the registry can still write anything
- The registry becomes a **dependency**: plan for it being unavailable`,
  narration:
    "A schema registry is the usual way to make the contract enforceable. It stores every version of every schema, and it checks each new version against the compatibility rule before accepting it. It is worth being precise about what it is. It is a separate service in the Kafka ecosystem, such as Confluent Schema Registry or Apicurio. It is not part of Apache Kafka, and the broker knows nothing about it. Here is how a record finds its schema. The producer uses a registry-aware serializer. The first time it sends order placed version two, the serializer registers the schema and gets back an id, seven in this example. From then on, each record carries just a small header with that id, followed by the encoded order, rather than the whole schema. In Confluent's wire format that is one magic byte and four bytes of id. The consumer's deserializer reads the id, fetches schema seven once, and caches it. Notice what the registry does not do. The broker still stores opaque bytes and checks nothing. A producer that skips the registry-aware serializer can still write anything at all.",
}
