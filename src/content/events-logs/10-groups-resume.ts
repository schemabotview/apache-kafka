import type { Section } from '../types'

// Plan §1.5 — two independent readers, and a disconnected reader that resumes from its committed offset.
export const readerResumes: Section = {
  id: 'groups-resume',
  title: 'Two groups, and a reader that resumes',
  scene: 'reader-resumes',
  focus: 'step-4',
  slide: `## Two groups, and a reader that resumes

Naming a **group** gives a consumer a memory: the group's **committed offsets** are stored in Kafka itself, not in the consumer.

### What the trace shows
- Both groups read all three orders, **independently**
- While fulfilment is stopped, analytics still sees o-1043
- On restart, fulfilment resumes at its committed offset and prints **only o-1043**

### Why it skipped the old orders
- **from-beginning** only applies to a group with **no committed offsets** yet
- Once a group has committed, its committed position wins
- To replay on purpose, an operator **resets** the group's offsets, which chapter 4 covers
- Stopping a reader loses nothing while its records are retained`,
  narration:
    "The previous consumer had no group name, so it got a random throwaway group and remembered nothing. This time each terminal names a group: fulfilment and analytics. A group's progress is stored in Kafka itself, as committed offsets, and that gives the consumer a memory. In step one, both groups start and both print all three orders, because they are independent. In step two, fulfilment is stopped, and as it shuts down it commits how far it got. In step three a new order arrives. O-ten forty-three hashes to partition one, where it becomes offset one. Analytics is running, so it prints it straight away. In step four, fulfilment is started again, with exactly the same command. It does not print all four orders. It resumes from its committed offsets and prints only the one it missed. The reason is that from beginning is only a fallback: it applies when the group has no committed offsets at all. Once a group has committed, its committed position wins. That is a disconnected reader catching up, and it is the behaviour that makes a log safe to depend on.",
}
