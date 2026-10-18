import type { Section } from '../types'

// Plan §8.3 — stateless filtering and mapping, and repartitioning after key changes.
export const repartition: Section = {
  id: 'repartitioning',
  title: 'Stateless steps and repartitioning',
  scene: 'repartition',
  focus: 'internal',
  slide: `## Stateless steps and repartitioning

**Stateless** operators like filter and mapValues handle each record on its own. Changing the **key** before grouping is different: it forces a **repartition**.

### Why regrouping needs a shuffle
- Orders arrive keyed by **order id**, spread over every partition
- Totals per **SKU** need all of one SKU's orders in **one task**
- Streams writes them to an internal **repartition topic**, keyed by SKU
- The next sub-topology reads that topic, so each SKU lands in **one place**

### What it costs
- An extra **write and read** of every record through Kafka
- Prefer **mapValues** to map when the key does not change
- A hot key, such as one SKU, becomes a hot **repartition** partition too`,
  narration:
    "Some operators need nothing but the record in front of them. Filter keeps or drops a record, and map values changes its value. These are stateless, and they run right where the record already is, inside the task that read it, with no extra cost. Grouping by a different key is another matter. Orders arrive keyed by order id, so the orders for one SKU are scattered across every partition, and therefore every task. To total sales per SKU, all of one SKU's orders have to end up in the same task. So when the key changes before grouping, Kafka Streams inserts a repartition step. It writes every record to an internal repartition topic, keyed by SKU, and the next sub-topology reads that topic back. Now the partitioner from chapter two guarantees that each SKU lands in exactly one partition, and so in one task. This is handled for you, but it is not free. Every record makes an extra round trip through Kafka, with the storage and latency that implies. So prefer map values over map whenever the key does not actually change, because map alone marks the stream for repartitioning.",
}
