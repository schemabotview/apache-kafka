import type { Section } from '../types'

// Plan §8.4 — aggregations, local state stores, and changelogs.
export const stateStores: Section = {
  id: 'state-stores',
  title: 'State stores and changelogs',
  scene: 'state-stores',
  focus: 'store',
  slide: `## State stores and changelogs

An aggregate needs to remember running totals. Kafka Streams keeps them in a **local state store**, and backs every update up to a **changelog topic**.

### Where state lives
- Each task has its own store, **RocksDB** on local disk by default
- Reads and updates are **local**, so they are fast
- Every update is also written to a **compacted changelog** topic

### Why both
- The local store is fast, but it **disappears** with its machine
- The changelog is durable, and holds the **latest value per key**
- Together they give fast state that can be **rebuilt** anywhere
- A **cache** batches updates, so not every change reaches the changelog
- Local disk needs real **capacity**: RocksDB keeps the whole store`,
  narration:
    "An aggregate has to remember something between records: the running total for each SKU and window. Kafka Streams keeps that in a state store. Each task has its own store, and by default it is RocksDB, an embedded key-value database on the instance's local disk. Because the store is local, reading and updating a total is fast, with no network call to a remote database. But local disk alone is fragile. If the machine is lost, the store goes with it. So every update to the store is also written to a changelog topic in Kafka, named after the application id. It is compacted, so it holds the latest value for each key, here each SKU and window: mug blue in the nine o'clock window went from twenty-four to thirty-six. The local store gives speed, and the changelog gives durability. Together, they give state that is fast to use, and that can be rebuilt on any other machine. This is the same idea as the KTable from two sections ago. A changelog topic is just a table, stored in Kafka. The next section shows the rebuild happening.",
}
