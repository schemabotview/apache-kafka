import type { Section } from '../types'

// Plan §8.4 — restoration of state after process loss.
export const restoration: Section = {
  id: 'state-restoration',
  title: 'Restoring state after a failure',
  scene: 'restoration',
  focus: 'steps',
  slide: `## Restoring state after a failure

When an instance dies, its tasks move, and each moved task must **rebuild its store** from the changelog before it processes anything.

### The sequence
- Instance 2 takes over task 0_1
- It reads the task's **changelog** and rebuilds the local store
- Then it resumes from the **committed offset**
- Restore time grows with **state size**, from seconds to many minutes

### What it does and does not do
- **num.standby.replicas** keeps a warm copy elsewhere, so takeover is quick
- With at_least_once, records after the last commit are **processed again**
- It restores **state**, never effects such as emails
- Plan for the restore time in **deployments**, not only in failures`,
  narration:
    "Here is what happens when an instance is lost. Its tasks are reassigned to the remaining instances, just as a consumer group reassigns partitions. Instance two is given task zero underscore one. But the task's state store lived on the lost machine's disk, so before it can process anything, instance two has to rebuild it. It reads the task's changelog topic from the beginning, and replays it into a new local store. Once the store is rebuilt, it resumes processing from the input's committed offset. How long that takes depends on how much state there is, from seconds for small stores to many minutes for large ones, and during that time the task produces nothing. Standby replicas address this. With num standby replicas set to one, another instance keeps a warm copy of each store, kept up to date from the changelog, so a takeover only needs a small catch-up. Two limits to keep in mind. With the default at least once guarantee, records processed after the last commit are processed again. And restoration rebuilds state, not effects. If the application sent emails, rebuilding a store does not make those emails safe to repeat.",
}
