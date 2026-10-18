import type { Section } from '../types'

// Plan §11.5 — consumer failover, offset translation, and duplicate risk.
export const failoverReconciliation: Section = {
  id: 'failover-reconciliation',
  title: 'Failover needs reconciliation',
  scene: 'failover-reconciliation',
  focus: 'timeline',
  slide: `## Failover needs reconciliation

When eu-west is lost, fulfilment fails over to us-east. Because mirroring is asynchronous, failover is **never exact**: some orders **repeat**, and some are **missing**.

### Reading the timeline
- Orders before the last checkpoint are **skipped** correctly
- Orders between the checkpoint and the failure are read **again**
- The last 20 seconds of orders **never arrived**, and are missing

### Reconciling
- **Deduplicate** by eventId, so repeats are harmless
- Find the **gap** by comparing with the order database
- **Replay** the missing orders once eu-west returns
- Decide in advance **who** may fail over, and when
- Failing **back** later needs the same care, in the other direction
- Rehearse failover with real consumers, and **measure** the gap and the repeats`,
  narration:
    "Now suppose the eu west cluster is lost at ten o'clock, and fulfilment fails over to us east. Because mirroring is asynchronous, the failover cannot be exact, and the timeline shows how it goes wrong in both directions. The last checkpoint translated fulfilment's offsets as of nine fifty-nine. Orders placed before then were already processed, and the translated offsets correctly skip them. Orders placed between nine fifty-nine and nine fifty-nine and forty seconds were mirrored, but fulfilment's translated offsets do not reflect that it processed them, so it reads them again. Without deduplication, they ship twice. And orders from the last twenty seconds never reached us east at all, because mirroring was twenty seconds behind. They are missing until eu west comes back. So failover is always followed by reconciliation. Deduplicate by event id, from chapter six, so the repeats are harmless. Find the gap by comparing the order database with what fulfilment processed. Replay the missing orders once eu west returns. And decide in advance who is allowed to declare a failover, and under what conditions, because doing it too early creates more reconciliation work.",
}
