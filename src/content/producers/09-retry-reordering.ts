import type { Section } from '../types'

// Plan §3.5 — ordering without idempotence: retried batches overtaking later ones.
export const retryReorder: Section = {
  id: 'retry-reordering',
  title: 'Retries can reorder',
  scene: 'retry-reorder',
  focus: 'events',
  slide: `## Retries can reorder

Retries can change **order** as well as count. Without idempotence, two batches in flight to one partition can land the wrong way round.

### How it happens
- Batch A carries o-1041 **PLACED**, batch B carries o-1041 **PAID**
- A fails because the leader just moved; B, sent right behind it, succeeds
- A is retried and lands **after** B: PAID before PLACED
- Each record is stored **exactly once**; only the order is wrong

### Keeping order
- With **idempotence on**, sequence numbers keep order with up to **5 requests** in flight
- Without it, only **one** request in flight keeps order, at a real cost in throughput
- The defaults already prevent this; it appears when idempotence is **switched off**`,
  narration:
    "Retries can change the order of records as well as their number. To keep throughput up, a producer sends a new request to a partition's leader before the previous one has been answered, up to five requests in flight by default. Here, batch A carries order ten forty-one placed, and batch B, sent right behind it, carries ten forty-one paid. Batch A fails, because the leader has just moved. Batch B arrives a moment later, at the new leader, and succeeds, at offset two. Then batch A is retried, and succeeds, at offset three. Both records are in the log, each exactly once, but the order is wrong. Any reader now sees the order paid before it was placed, which is precisely the per-key ordering the key was chosen to protect. There are two ways to prevent this. With idempotence on, which is the default, each batch carries a sequence number. The broker refuses to accept batch B before batch A, so order is kept with up to five requests in flight. Without idempotence, the only protection is allowing a single request in flight at a time, which costs a great deal of throughput.",
}
