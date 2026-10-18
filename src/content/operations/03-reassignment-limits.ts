import type { Section } from '../types'

// Plan §11.2 — reassignment previews and rollback limits.
export const reassignmentLimits: Section = {
  id: 'reassignment-limits',
  title: 'Previews and rollback limits',
  scene: 'reassignment-limits',
  focus: 'preview',
  slide: `## Previews and rollback limits

The generated plan is a **preview**: read it before executing. And save the **current assignment**, because it is your only rollback plan.

### Reading the preview
- Each partition gains a replica on **broker 4** and drops one elsewhere
- Leaders move too, so **client traffic** shifts

### Why rollback is expensive
- Rolling back is **another reassignment**, copying the data back again
- It takes about as **long** as the original, under the same throttle
- **--cancel** stops one still in progress

### Keeping it safe
- Move a **few partitions at a time**
- Pause between batches until under-replicated partitions is back to **zero**
- Schedule big moves for **quiet hours**, away from peaks and sales`,
  narration:
    "The plan that generate produces is a preview, and it is worth reading line by line before executing it. Here, each partition of the orders topic gains a replica on broker four, and gives one up elsewhere. Partition zero's preferred leader also moves to broker four, which means client traffic for that partition will shift to the new broker too. The tool also prints the current assignment, and that output deserves saving, because it is the only rollback plan you have. Rolling back is not an undo button. It is simply another reassignment, back to the old placement, so every byte that was copied to broker four is copied back again. It takes about as long as the original move, under the same throttle. If a reassignment is still in progress and causing trouble, cancel can stop it, which leaves partitions on whatever replicas they had reached. The safest habit follows from all of this. Move a few partitions at a time, rather than the whole cluster in one plan. Watch client latency and under-replicated partitions after each batch, and only continue once things are calm.",
}
