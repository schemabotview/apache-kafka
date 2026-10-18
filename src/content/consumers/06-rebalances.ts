import type { Section } from '../types'

// Plan §4.5 — rebalances, revocation, and in-flight work during ownership changes.
export const rebalance: Section = {
  id: 'rebalances',
  title: 'Rebalances and revocation',
  scene: 'rebalance',
  focus: 'steps',
  slide: `## Rebalances and revocation

A **rebalance** moves partitions when members join, leave or fail. The dangerous moment is the handover of a partition with **work in flight**.

### The handover
- Member 3 joins, and partition 2 must move from member 2
- In **onPartitionsRevoked**, member 2 finishes its work and **commits** 42
- Member 3 then starts reading at the committed offset
- Commit **inside** onPartitionsRevoked: once it returns, the partition is gone

### When it goes wrong
- Without that commit, member 3 replays from an **older** offset
- If member 2's workers are still busy, work **overlaps**
- The classic default, **range**, revokes every partition from every member during each rebalance
- **Cooperative** assignors, and the consumer protocol, move only what changes`,
  narration:
    "Assignments are not permanent. When a member joins, leaves, or is judged to have failed, the group rebalances, and partitions move. The risky moment is handing over a partition that still has work in flight. Walk through this one. Member three starts and joins the group fulfilment. The group decides partition two should move from member two to member three. Member two is processing offset forty-one. Before it gives the partition up, the consumer calls its rebalance listener, on partitions revoked. That is the place to finish or abandon the work in progress, and to commit, here forty-two. Only then does member three receive partition two, and it starts reading at the committed offset, exactly where member two stopped. Skip that step, and two things can go wrong. Member three starts from an older commit and repeats work. And if member two had handed records to worker threads, those workers may still be busy when member three starts, so the same orders are processed twice at once. One more detail: the classic protocol's default assignor, range, makes every member give up every partition during each rebalance, not just the one that moves.",
}
