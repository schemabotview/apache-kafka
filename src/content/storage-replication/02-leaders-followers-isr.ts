import type { Section } from '../types'

// Plan §5.2 — leaders, followers, replica placement, and the in-sync replica set.
export const replicasIsr: Section = {
  id: 'leaders-followers-isr',
  title: 'Leaders, followers and the ISR',
  scene: 'replicas-isr',
  focus: 'isr',
  slide: `## Leaders, followers and the ISR

Each partition is copied to **replication factor** brokers. One copy is the **leader**; the others are **followers** that fetch from it.

### How replication works
- Producers write to the **leader**, and consumers normally read from it
- Followers **fetch** from the leader, much like consumers do
- Replicas are placed on **different brokers**, and ideally different racks or zones

### The in-sync replica set
- The **ISR** is the leader plus every follower that is keeping up
- A follower more than **30 s** behind is removed from it
- It rejoins once it has **caught up** with the leader
- Replica placement is decided when the topic is **created**, and kept until reassigned
- The **controller** records the ISR, so elections know which copies are complete`,
  narration:
    "Durability in Kafka comes from copying each partition to several brokers. The replication factor says how many copies there are, three in this example, and each copy lives on a different broker. Ideally those brokers are in different racks or availability zones, so that one power or network failure cannot take out every copy. One copy is the leader. Producers write to it, and consumers normally read from it. The others are followers. A follower stays up to date by fetching from the leader, in much the same way a consumer does, and appending what it receives to its own log. Now the most important idea in this chapter: the in-sync replica set, or ISR. It is the leader plus every follower that is keeping up. A follower that has not caught up with the leader for thirty seconds is removed from the set. Here, broker one has fallen behind at offset four, so the ISR is just brokers two and three. When broker one catches up, it rejoins. The controller records the ISR for every partition, because it answers the question every election needs answered: which copies are complete?",
}
