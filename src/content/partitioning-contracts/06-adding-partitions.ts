import type { Section } from '../types'

// Plan §2.4 — partition-count changes and the consequences for key placement.
export const addingPartitions: Section = {
  id: 'adding-partitions',
  title: 'Adding partitions later',
  scene: 'adding-partitions',
  focus: 'after',
  slide: `## Adding partitions later

A topic's partition count can be **increased**, never decreased. The default partitioner computes **hash(key) mod n**, so changing n moves keys.

### What happens to orders from 3 to 4
- Four of these five keys now hash to a **different partition**; partitions 2 and 3 get other keys
- Existing records **stay where they are**; only new records go to the new place
- An order's old events and new events can sit in **two partitions**
- A reader can then see o-1041 **SHIPPED** before its **PAID** event

### Consequences
- Per-key ordering is broken **across the change**, briefly but really
- Choose the count **up front**, with room to grow; more partitions also cost the brokers memory and files
- Where ordering matters, quiesce writers or migrate to a **new topic** instead`,
  narration:
    "Partition counts are often picked casually and then increased when traffic grows. Kafka allows that, but only upwards: a topic's partition count can be increased and never decreased. The catch is in the partitioner. It computes the hash of the key, modulo the number of partitions, so changing the number of partitions changes the answer. These are the real placements for five orders. Going from three partitions to four, four of the five keys hash somewhere new. Only order ten forty-three stays put. Nothing already written moves. Existing records stay exactly where they are, and only new records follow the new placement. So consider order ten forty-one. Its placed and paid events are in partition one. Its shipped event, written after the change, lands in partition zero. A reader can now see shipped before paid, because the two events are in different partitions. That breaks per-key ordering across the change. It may be brief, but it is real. So choose a partition count up front with room to grow, and where ordering really matters, stop the writers during the change, or migrate to a new topic instead.",
}
