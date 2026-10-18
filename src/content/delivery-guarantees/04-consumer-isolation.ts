import type { Section } from '../types'

// Plan §6.3 — consumer isolation, committed visibility, and transaction blocking implications.
export const isolation: Section = {
  id: 'consumer-isolation',
  title: 'Consumer isolation',
  scene: 'isolation',
  focus: 'levels',
  slide: `## Consumer isolation

Transactional records are written to the log **before** they are committed. The consumer's **isolation.level** decides whether it sees them early.

### The two levels
- **read_uncommitted**, the default, returns everything, **including aborted** records
- **read_committed** returns only records from committed transactions
- Readers of transactional output must set **read_committed**

### The blocking effect
- read_committed stops at the **last stable offset**: the first still-open transaction
- Here it returns 20, skips aborted 21, then **waits at 22**, although 23 is committed
- A stuck transaction delays readers for up to its **timeout**
- Kafka Streams with exactly-once sets **read_committed** for you`,
  narration:
    "Transactional records are written into the log as they are sent, before anyone knows whether the transaction will commit. So a consumer has to decide whether to see them early, and that is the isolation level. Read uncommitted, which is the default, returns everything in the log, including records from transactions that were later aborted. For readers of transactional output, that defeats the purpose, so they must set read committed. Read committed only returns records from committed transactions, and silently skips aborted ones. Look at partition one of priced orders. A read committed consumer receives offset twenty, from a committed transaction. It skips twenty-one, which was aborted. Then it reaches twenty-two, from a transaction that is still open, and it stops. It cannot know yet whether twenty-two will commit, and to keep records in order it will not jump ahead to twenty-three, even though that transaction has committed. This position is the last stable offset. The consequence for design is that one slow or stuck transaction holds back every read committed reader of that partition, for up to the transaction timeout. Keep transactions short.",
}
