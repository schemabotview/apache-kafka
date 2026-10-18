import type { Section } from '../types'

// Plan §5.8 — why compaction cleanup is not immediate, and what readers must expect.
export const compactionTiming: Section = {
  id: 'compaction-timing',
  title: 'Why compaction is not immediate',
  scene: 'compaction-timing',
  focus: 'conditions',
  slide: `## Why compaction is not immediate

Compaction is a **background** job with conditions. A compacted topic shows the latest value per key **eventually**, not at every moment.

### When the cleaner acts
- Only **closed** segments are cleaned, never the active one
- A partition waits until half its log is **dirty**, not yet cleaned
- **delete.retention.ms**, 1 day, keeps tombstones for slow readers
- **min.compaction.lag.ms** can keep recent values longer, if a reader needs them

### What readers must expect
- **Several values** for one key, until the cleaner runs
- **Null values**, which mean "this key was deleted"
- Compaction is not **erasure**: old values can linger for days
- Downstream copies keep old values regardless of what the cleaner does`,
  narration:
    "It would be easy to assume a compacted topic only ever holds one value per key. It does not, because compaction is a background job that only runs under certain conditions. The cleaner never touches the active segment, so recent records always include every update until that segment closes, by default after seven days or one gibibyte. It also waits until enough of a partition is dirty, meaning written since the last clean, half of it by default, because cleaning is expensive. Min compaction lag can hold records back for longer still, and tombstones are kept for delete retention milliseconds, one day by default, so that a reader that was briefly behind still sees the delete. So readers of a compacted topic must expect several values for the same key, and handle them by keeping the latest. They must expect null values, and treat them as deletions rather than crashing. And one point matters for governance in chapter nine. Compaction is not erasure. An old value, including personal data, can remain on disk for days after a newer value was written, and in any copies already made downstream.",
}
