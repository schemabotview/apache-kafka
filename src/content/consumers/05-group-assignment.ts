import type { Section } from '../types'

// Plan §4.4 — consumer groups, partition assignment, idle members, and independent applications.
export const groupAssignment: Section = {
  id: 'group-assignment',
  title: 'Assigning partitions to members',
  scene: 'group-assignment',
  focus: 'fulfilment',
  slide: `## Assigning partitions to members

Within a group, every partition is assigned to **exactly one member**. That rule decides how far a group can scale.

### Members and partitions
- Three partitions can keep at most **three members** busy
- A fourth member gets **nothing**: it is an idle standby
- One member can own **several** partitions, as analytics does here
- Idle members still **heartbeat**, so they are ready to take over at once

### Groups stay independent
- **analytics** is a separate group, with its own assignment and offsets
- Adding members to fulfilment **changes nothing** for analytics
- So the partition count sets the **maximum parallelism** of every group
- Scaling past it needs **more partitions**, with the key moves from chapter 2`,
  narration:
    "Inside a group, Kafka assigns every partition to exactly one member. That single rule decides how far a group can scale. The orders topic has three partitions, so the fulfilment group can keep at most three members busy. Here it has four. Members one, two and three each own one partition, and member four gets nothing at all. It is not broken. It is an idle standby, which will take over a partition if another member leaves, but until then it does no work. The opposite also works. One member can own several partitions, as the analytics group shows: a single member reading all three. Groups remain completely independent of one another. Analytics has its own assignment and its own committed offsets. Adding members to fulfilment, or removing them, changes nothing for analytics. The practical consequence links back to chapter two. The partition count sets the maximum parallelism of every group that will ever read the topic. That is one reason to choose it with room to grow, rather than discovering the limit when a consumer group needs to scale.",
}
