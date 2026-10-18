import type { Section } from '../types'

// Plan §4.8 — starting offsets, and missing or expired commits.
export const startingOffsets: Section = {
  id: 'starting-offsets',
  title: 'Where a consumer starts',
  scene: 'starting-offsets',
  focus: 'd-no',
  slide: `## Where a consumer starts

A committed offset always wins. **auto.offset.reset** only matters when there is **no usable commit**, and its default can quietly skip data.

### When there is no usable commit
- A **new group** has never committed anything
- An empty group's offsets **expire** after 7 days by default
- A committed offset that retention has **deleted** is out of range

### What auto.offset.reset does then
- **latest**, the default, starts with **new records only**, skipping the backlog
- **earliest** starts from the oldest retained record
- **none** fails, so a person decides; often right for critical consumers
- It applies **per partition**, only where the commit is missing
- Set it **deliberately** for every group, rather than inheriting the default`,
  narration:
    "When a member is assigned a partition, it has to decide where to start reading. If the group has a committed offset, that always wins. The auto offset reset setting only matters when there is no usable commit, and there are three ways that happens. A brand new group has never committed anything. A group that has been empty, with no running members, for longer than the offset retention period, seven days by default, has its committed offsets deleted. And a committed offset can point at records that retention has already deleted, if the group fell too far behind. In each case, auto offset reset decides. Latest, the default, starts with records that arrive from now on, skipping everything already in the partition. That is right for a dashboard, and quietly wrong for fulfilment, which would never ship the backlog. Earliest starts from the oldest record still retained, so it can reprocess a great deal. None makes the consumer fail, so that a person decides. For a critical consumer, failing loudly is often better than silently skipping or silently replaying a week of orders.",
}
