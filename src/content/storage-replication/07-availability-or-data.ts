import type { Section } from '../types'

// Plan §5.5 — the availability/data-loss trade-off of unclean leader election.
export const availabilityLoss: Section = {
  id: 'availability-or-data',
  title: 'Availability or acknowledged data',
  scene: 'availability-loss',
  focus: 'choice',
  slide: `## Availability or acknowledged data

When only an **out-of-sync** replica survives, there are two choices, and **unclean.leader.election.enable** decides which. The default is **false**.

### The two outcomes
- **Off**: the partition stays offline until a safe replica returns; nothing is lost
- **On**: it comes back at once, led by broker 1, and offsets 10 and 11 are **lost**

### What goes wrong after an unclean election
- New writes **reuse** offsets 10 and 11 for different records
- Consumers that already read the old 10 and 11 hold data the log **no longer has**
- If the old leader returns, it **truncates** its copies to match
- Choose it only where availability truly matters **more than the data**
- It can be set **per topic**, so one metrics topic need not weaken the rest`,
  narration:
    "Sometimes the only replica left is one that was out of sync. Here, broker one survives, but it stopped at offset nine, while the leader had already acknowledged offsets up to eleven. There are two options, and the setting unclean leader election enable chooses between them. With it off, the default, the partition stays offline until the old leader, or another safe replica, comes back. That might take minutes, or hours if hardware has to be replaced. But nothing acknowledged is lost. With it on, broker one becomes leader immediately, and the partition is available again. The cost is that offsets ten and eleven, both acknowledged to the producer, are gone for good. It is worse than it sounds, because of what happens next. New writes are given offsets ten and eleven again, for different records. Consumers that had already read the old ten and eleven now hold data the log no longer contains, and their committed offsets point at records that changed. If the old leader eventually returns, it truncates its log to match the new leader. So enable it only where availability genuinely matters more than the data, such as some metrics streams.",
}
