import type { Section } from '../types'

// Plan §4.2 — consumer position, committed offsets, and the next record to read.
export const positions: Section = {
  id: 'positions-and-commits',
  title: 'Positions, commits and lag',
  scene: 'positions',
  focus: 'numbers',
  slide: `## Positions, commits and lag

Four numbers describe a group's progress on one partition. Mixing them up is the root of most consumer bugs.

### The four numbers
- The **position** is the next offset this member will **fetch**, kept in memory
- The **committed offset** is the next offset to read **after a restart**, stored in Kafka
- The **log end offset** is where the next record will be appended
- **Lag** is the log end offset minus the committed offset

### What they tell you
- A commit of 7 means "**offsets up to 6 are done**", not "7 is done"
- The position runs ahead of the commit while a batch is processed
- Only the committed offset **survives** a crash or a rebalance`,
  narration:
    "Four numbers describe how far a group has got through one partition, and mixing them up causes most consumer bugs. Here, offsets five and six are done, seven is being processed, and eight has not been fetched. The position is the next offset this member will fetch: eight. It lives only in the consumer's memory, and it moves forward every time poll returns records. The committed offset is the next offset the group should read after a restart: seven. It is stored in Kafka, in an internal topic, and it only moves when the application commits. The log end offset is where the next record will be appended: nine. And lag, the number monitoring dashboards show, is the log end offset minus the committed offset: two. The detail that trips people up is what a committed offset means. Committing seven does not mean seven is done. It means everything before seven is done, and seven is next. Notice also that the position always runs ahead of the commit while a batch is being processed, and only the committed offset survives a crash or a rebalance. That gap is exactly where the next section's failure windows live.",
}
