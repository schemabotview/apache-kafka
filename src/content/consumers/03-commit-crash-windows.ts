import type { Section } from '../types'

// Plan §4.3 — auto commits and explicit commits: crash windows and processing boundaries.
export const commitWindows: Section = {
  id: 'commit-crash-windows',
  title: 'Crash windows around commits',
  scene: 'commit-windows',
  focus: 'cases',
  slide: `## Crash windows around commits

What a crash costs depends on **where it lands** relative to the commit. Every consumer chooses an order, whether it means to or not.

### Reading the cases
- **Process, then commit**: a crash in between **replays** the batch
- **Commit, then process**: a crash in between **skips** the batch: data loss
- Crashing **after** a commit loses nothing and repeats nothing
- Replays are the **safe** failure: chapter 6 makes them harmless; a skip cannot be undone

### Where auto-commit fits
- It commits during **poll()**, every 5 s, for records the **previous** poll returned
- With processing **inside the loop**, that is process-then-commit: replays, no loss
- If records are handed to **other threads**, it can commit work not yet done`,
  narration:
    "A consumer can crash at any moment, and what that costs depends on where the crash lands relative to the commit. Take a batch of offsets seven to nine. If the consumer processes the batch and then commits ten, a crash after processing but before the commit means the restarted member reads from the old commit, seven, and processes the whole batch again. Nothing is lost, but work is repeated. A crash after the commit costs nothing at all. Now reverse the order. If the consumer commits ten first and then processes, a crash between the two means the restarted member starts at ten. Offsets seven to nine were never processed, and nothing will ever process them. That is data loss. So where does auto-commit fit? It runs inside poll, every five seconds, and it commits the offsets of the records the previous poll returned. If all processing happens inside the loop, before the next poll, that is effectively process then commit, so it replays and never loses. But if the loop hands records to other threads and polls straight away, auto-commit can commit records those threads have not finished.",
}
