import type { Section } from '../types'

// Plan §5.3 — acks=all with the default min.insync.replicas, and how the ISR can shrink to one.
export const minIsrOne: Section = {
  id: 'min-isr-default',
  title: 'Why min ISR 1 is not enough',
  scene: 'min-isr-one',
  focus: 'timeline',
  slide: `## Why min ISR 1 is not enough

**acks=all** waits for every replica in the ISR, and the ISR can **shrink**. With the default min.insync.replicas of **1**, it can shrink to the leader alone.

### The failure
- Both followers fall 30 s behind, so the ISR is **only the leader**
- acks=all now waits for **one copy**, and acknowledges o-1041 PAID
- The leader's disk fails: an acknowledged write is **gone**

### With min.insync.replicas = 2
- Step 3 is **refused**, and the producer retries until a follower catches up
- Writes pause; acknowledged data is **never** on fewer than two brokers
- Set it on the **cluster** or each topic; producers cannot set it
- Then **NOT_ENOUGH_REPLICAS** in producer logs is an alert, not noise`,
  narration:
    "It is tempting to think acks all alone makes writes durable. Look at what it actually means: wait for every replica in the ISR. And the ISR is not fixed. With the default min in-sync replicas of one, it is allowed to shrink all the way down to the leader alone. Walk through it. In step one, all three replicas are in sync and writes are copied everywhere. In step two, both followers fall behind, perhaps because of a slow disk or a network problem, and after thirty seconds they are removed from the ISR. Now acks all means wait for one replica, the leader itself. In step three, the producer sends order ten forty-one paid, and it is acknowledged with a single copy. In step four, the leader's disk fails. An acknowledged payment has disappeared, and the producer was told it succeeded. Now replay it with min in-sync replicas set to two. Step three is refused, with not enough replicas. The producer retries until a follower catches up. Writes pause for a while, but acknowledged data is never held on fewer than two brokers. And because producers cannot set this, it belongs on the cluster or the topic.",
}
