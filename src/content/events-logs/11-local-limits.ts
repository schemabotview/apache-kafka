import type { Section } from '../types'

// Plan §1.6 — local-only configuration, explicit topic creation, safe cleanup, and the limits of a single broker.
export const localLimits: Section = {
  id: 'local-limits',
  title: 'The limits of one local broker',
  scene: 'local-limits',
  focus: 'cannot',
  slide: `## The limits of one local broker

This cluster is enough to see **records, partitions and groups** working. It cannot show what makes Kafka reliable.

### What it cannot show
- One broker holds **one copy** of every partition, so its loss is data loss
- There is no **replication, failover or rebalancing** of partitions
- Those need several brokers, and are chapter 5's subject
- A demo that looks fast here says nothing about **production** load

### Habits to keep from day one
- Keep it **localhost only**: it is plaintext, with no authentication
- **Create topics explicitly**: auto-creation is on by default, so a typo silently makes a new topic
- Reset by deleting its data directories, which **deletes every topic**`,
  narration:
    "Before moving on, be clear about what this little cluster is and is not. It is one process, holding one copy of every partition. That is plenty to see records, keys, partitions, consumer groups and replay working, which is everything in this chapter. What it cannot show is the part that makes Kafka dependable. With one broker, losing that broker means losing the data, and there is nothing to fail over to, no replication, no leader election, and no moving partitions between machines. All of that needs several brokers, and it is chapter five's subject. Three habits are worth forming now. Keep it on localhost, because this configuration is plaintext with no authentication at all. Create topics explicitly, because automatic topic creation is switched on by default, and a mistyped topic name in a producer will silently create a brand new topic with default settings. And when you want a clean slate, stop everything and delete the data directories, knowing that this deletes every topic. Next, the course turns to designing events and topics around their business meaning.",
}
