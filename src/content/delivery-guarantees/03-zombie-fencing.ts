import type { Section } from '../types'

// Plan §6.2 — transactional identity, epochs, and fencing.
export const fencing: Section = {
  id: 'zombie-fencing',
  title: 'Fencing zombie instances',
  scene: 'fencing',
  focus: 'timeline',
  slide: `## Fencing zombie instances

A **zombie** is an instance presumed dead that comes back and keeps working. The **transactional.id** and its **epoch** stop it from committing anything.

### The timeline
- Instance A is mid-transaction at **epoch 4**, then pauses for a long GC
- B starts with the **same transactional.id**: the coordinator aborts A's work and moves to **epoch 5**
- B commits at epoch 5; when A wakes, its commit at epoch 4 is **rejected**

### What it depends on
- A **stable** transactional.id for each piece of work, not a random one
- The fenced instance gets **ProducerFencedException**, and must close
- Without fencing, A and B could both commit the **same input**
- A's unfinished records were **aborted**, so read_committed readers never see them`,
  narration:
    "Transactions need one more piece to be safe: protection from zombies. A zombie is an instance everyone believes is dead, but which comes back and carries on working. It is a real risk. A long garbage collection pause, or a network partition, can make a healthy instance look dead for long enough that its work is given to a replacement. Here is how Kafka handles it. Instance A is in the middle of a transaction, using transactional id order pricer zero, at epoch four. It pauses. Instance B starts as its replacement, with the same transactional id, and calls init transactions. The coordinator aborts whatever A had in progress, and moves the id to epoch five. B processes the batch and commits, with epoch five, and it is accepted. Then A wakes up, unaware of any of this, and tries to commit with epoch four. The coordinator rejects it. A is fenced. It receives a producer fenced exception, and the only correct response is to close and stop. All of this depends on the transactional id being stable, the same id for the same piece of work, rather than a fresh random id on every start.",
}
