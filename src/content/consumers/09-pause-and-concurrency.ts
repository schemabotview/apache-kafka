import type { Section } from '../types'

// Plan §4.7 — pause/resume and bounded concurrency for slow processing.
export const boundedConcurrency: Section = {
  id: 'pause-and-concurrency',
  title: 'Pause, resume and bounded concurrency',
  scene: 'bounded-concurrency',
  focus: 'levers',
  slide: `## Pause, resume and bounded concurrency

The fix for slow work is to keep **polling on time** while doing less per poll, or doing it **in parallel**, without losing order or commits.

### The levers, simplest first
- Lower **max.poll.records**, so each batch finishes well inside 5 minutes
- **pause()** a partition whose work is backed up; poll() keeps the member alive
- **resume()** it once the work catches up

### Parallel work, done safely
- Use a **bounded** pool, so memory and connections cannot run away
- Route by **key**, so one order's events stay in order
- Commit only offsets whose records are **all done**, never past a gap
- Paused partitions stay **assigned**, so no other member takes them over
- Never just raise **max.poll.interval.ms** to hours: a stuck member goes unnoticed`,
  narration:
    "The fix for slow work is never to make the time limit longer and hope. It is to keep polling on time, either by doing less per poll, or by doing the work in parallel, without breaking ordering or commits. Start with the simplest lever. Lowering max poll records means each batch is smaller, so it finishes comfortably inside the five-minute limit. When the work itself has to happen elsewhere, the consumer can pause a partition. A paused partition is skipped by poll, but poll keeps being called, so the member stays in the group. Once the backlog clears, resume it, and fetching starts again. If you do process in parallel, three rules keep it safe. Use a bounded pool of workers, so a burst of records cannot exhaust memory or open thousands of database connections. Route records to workers by key, so all of one order's events go to the same worker and stay in order. And commit carefully: only up to the highest offset whose earlier records are all complete. Committing past a record that is still in progress brings back exactly the data loss window from earlier.",
}
