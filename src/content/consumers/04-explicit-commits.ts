import type { Section } from '../types'

// Plan §4.3 — explicit commits after processing, and the choice between commit styles.
export const explicitCommit: Section = {
  id: 'explicit-commits',
  title: 'Committing explicitly',
  scene: 'explicit-commit',
  focus: 'code',
  slide: `## Committing explicitly

Switching **auto-commit off** puts the commit exactly where the code says. The usual place is right after a batch has been fully processed.

### The pattern
- Set **enable.auto.commit** to false
- Process every record from the poll, **completely**
- Call **commitSync()**, which commits the positions just reached

### Choosing a commit style
- **commitSync()** waits, retries and throws, so failures are visible
- **commitAsync()** does not wait; a failed commit is covered by the next one
- Commit **per batch**, not per record: each commit is a write to Kafka
- Either way the guarantee is **at least once**: a crash can still repeat a batch`,
  narration:
    "To control the crash window, most applications switch auto-commit off and commit explicitly, at the one point where it is safe. Set enable auto commit to false. Process every record returned by the poll, completely, including any database writes. Then call commit sync. With no arguments, it commits the positions the consumer has just reached, which means everything returned by that poll. Commit sync waits for the broker to confirm, retries what can be retried, and throws if the commit fails, so a failure is visible to the code. Commit async does not wait. It is faster, and if one asynchronous commit fails, the next successful one covers it, which is why it is common to commit asynchronously in the loop and synchronously once on shutdown. Whichever you use, commit per batch rather than per record, because every commit is itself a write to Kafka. And be clear about the guarantee you have bought. Committing after processing means a crash can still repeat a batch, so this is at least once. Making that repetition harmless is chapter six's subject.",
}
