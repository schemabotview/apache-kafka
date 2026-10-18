import type { Section } from '../types'

// Plan §5.7 — time and size retention, segment deletion, and replay horizons.
export const retention: Section = {
  id: 'retention-and-replay',
  title: 'Retention and the replay horizon',
  scene: 'retention',
  focus: 'segments',
  slide: `## Retention and the replay horizon

Retention deletes **whole closed segments**, never individual records. The default keeps **7 days** by time, with **no size limit**.

### How a segment is chosen
- A segment goes when its **newest** record is older than retention.ms
- The **active** segment is never deleted, however old its records are
- So data lives **somewhat longer** than retention, never shorter

### The replay horizon
- The **earliest offset** still kept is how far back anyone can replay
- **retention.bytes** adds a size limit per partition, if set
- A group that falls behind the horizon **loses** the records it had not read
- Set retention from the longest **outage** a reader must survive, not from disk alone`,
  narration:
    "Retention is how a topic forgets, and it works on whole segments, never on individual records. The defaults keep seven days by time, with no limit on size. Here is how the broker decides. It looks at each closed segment, and deletes it once the newest record in it is older than the retention period. It is the eighteenth of October. The first segment's newest record is from the eighth, ten days ago, so the whole segment is deleted. The second segment's newest record is six days old, so it stays, including records that are now ten days old themselves. The active segment is never deleted at all, however old its records are. So data lives somewhat longer than the retention setting, never shorter. The earliest offset still kept defines the replay horizon: how far back any group, or any replay, can go. Retention bytes adds a size limit per partition, if you set one, which is useful when disk, rather than time, is the constraint. And the risk from chapter one returns here. A consumer group that falls behind the horizon does not just lag. The records it had not read are gone.",
}
