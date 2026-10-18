import type { Section } from '../types'

// Plan §3.4 — acknowledgements and the meaning of broker acceptance.
export const acksLevels: Section = {
  id: 'acks',
  title: 'What acks means',
  scene: 'acks-levels',
  focus: 'levels',
  slide: `## What acks means

The **acks** setting decides when the broker reports success, and so what "success" actually guarantees. The default, since Kafka 3.0, is **acks=all**.

### The three levels
- **acks=0**: the producer does not wait, so a broker-side failure is never reported
- **acks=1**: the leader has written it, but a follower may not have it yet
- **acks=all**: every **in-sync replica** has it before the producer is told
- acks=all adds latency: the slowest in-sync follower sets the pace

### What acks=all still depends on
- "In-sync" can shrink to just the leader if followers fall behind
- **min.insync.replicas** sets the floor, and chapter 5 puts the two together
- Consumers only see a record once every in-sync replica has it, **whatever acks** says`,
  narration:
    "The acks setting answers a simple question: when does the broker tell the producer that a send succeeded? And because the callback reports success at that moment, it decides what success actually guarantees. With acks zero, the producer does not wait for any answer at all. It is the fastest, and it means a failure on the broker's side is never even reported. With acks one, the leader replies as soon as it has written the record to its own log. That sounds safe, but if the leader fails before its followers have copied the record, a follower becomes leader without it, and the record is gone, even though the producer was told it succeeded. With acks all, which has been the default since Kafka three point oh, the leader waits until every in-sync replica has the record, and only then replies. The picture shows that flow for three replicas. There is one subtlety to carry forward. The in-sync set is not fixed. If followers fall behind, it can shrink, in the worst case to the leader alone, and then acks all quietly means acks one. The setting that prevents that is min in-sync replicas, and chapter five puts the two together.",
}
