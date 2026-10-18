import type { Section } from '../types'

// Plan §10.7 — diagnosing hot partitions and growing backlogs.
export const hotPartitionLag: Section = {
  id: 'hot-partition-diagnosis',
  title: 'A skew more consumers cannot fix',
  scene: 'hot-partition-lag',
  focus: 'lag',
  slide: `## A skew more consumers cannot fix

Total lag hides **where** the lag is. Broken down per partition, this group's backlog is almost entirely on **partition 1**.

### Reading the breakdown
- Partitions 0 and 2 are a few records behind: **healthy**
- Partition 1 is **48 188** behind, and growing
- One partition, one member: this is a **skew**, not a capacity problem

### What helps
- Adding members **does not**: partition 1 can only have one reader
- A faster handler helps **that partition** today
- Find the hot key by **sampling** partition 1, then fix the key design
- The **total** lag alone would have suggested adding consumers
- Alert on **per-partition** lag, so skew is visible early`,
  narration:
    "A total lag figure hides where the lag actually is. This group's total lag is just over forty-eight thousand records, which looks like the whole group is struggling. Describe the group, and the per partition breakdown tells a different story. Partitions zero and two are a handful of records behind, completely healthy. Partition one is forty-eight thousand records behind, and still growing. That is not a capacity problem across the group. It is skew, concentrated on one partition, and so on the one member that owns it. This is exactly where the most common fix fails. Adding members to the group cannot help, because partition one can only ever have one reader within the group, as chapter four explained. The new members would sit idle. What does help? In the short term, making the handler faster helps that partition specifically. To understand the cause, sample records from partition one and look at the keys. Very often one key, such as a single product in a flash sale, or a single enormous business customer, is carrying far more than its share. The lasting fix is the key design from chapter two.",
}
