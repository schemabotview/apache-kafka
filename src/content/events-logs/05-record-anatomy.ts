import type { Section } from '../types'

// Plan §1.3 — records: keys, values, headers and timestamps, and where they land.
export const recordAnatomy: Section = {
  id: 'record-anatomy',
  title: 'Anatomy of a record',
  scene: 'record-anatomy',
  focus: 'record',
  slide: `## Anatomy of a record

A **record** is the unit Kafka stores and delivers. To Kafka, the key and value are only **bytes**; their meaning belongs to the applications on either side.

### What the producer sends
- A **key**: here the order id, which decides the partition
- A **value**: the event itself, often JSON or a typed schema
- Optional **headers** for metadata, such as the source channel
- A **timestamp**: the producer's creation time by default, or the broker's append time if the topic is set to use it

### Where it lands
- The **topic** is named by the producer
- The **partition** is chosen from the key by the partitioner
- The **offset** is assigned by the broker on append, and never changes
- Topic, partition and offset together **identify** one record exactly`,
  narration:
    "A record is the unit that Kafka stores and delivers, so it is worth knowing exactly what is in one. The producer supplies four things. The key, here the order identifier, is what decides which partition the record goes to, and that turns out to matter a great deal for ordering. The value is the event itself, often JSON, or a typed schema format, which comes up in the next chapter. Headers are optional key and value pairs for metadata, such as where the order came from. And the timestamp, which by default the producer sets to the time it created the record. Notice that Kafka does not interpret the key or the value. To the broker they are just bytes, and the meaning belongs entirely to the applications on either side. The second table is where the record ends up. The producer names the topic. The partition is chosen from the key. And the offset, the record's position in that partition, is assigned by the broker at the moment it appends the record. The producer never picks an offset, and once assigned, it never changes.",
}
