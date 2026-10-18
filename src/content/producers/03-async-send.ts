import type { Section } from '../types'

// Plan §3.2 — asynchronous sends, callbacks, and what send() returning means.
export const asyncSend: Section = {
  id: 'async-send',
  title: 'Asynchronous sends and callbacks',
  scene: 'async-send',
  focus: 'timeline',
  slide: `## Asynchronous sends and callbacks

**send()** only places the record in the producer's buffer and returns. At that moment, **nothing has been confirmed** by any broker.

### Learning the outcome
- The **callback** runs once, with record metadata on success or an exception on failure
- The returned **Future** gives the same answer, if you wait for it
- Waiting on every send, one at a time, throws away batching

### Writing callbacks
- They run on the producer's **I/O thread**, so keep them short
- Slow work there delays **every other send** from this producer
- Record failures somewhere durable, so they can be handled **deliberately**`,
  narration:
    "The most important thing to understand about send is what it does not do. It does not wait for a broker. It serializes the record, places it in the producer's buffer, and returns, usually within microseconds. At that point nothing has been stored anywhere. The record is just waiting in memory. The outcome arrives later, in one of two ways. The callback you pass to send runs exactly once, with the record's topic, partition and offset if it was stored, or with an exception if it was not. Send also returns a future, which gives the same answer if you block on it. Blocking on every send, one at a time, is tempting because it feels safe, but it throws away batching and can cut throughput dramatically. Callbacks have one important rule. They run on the producer's own I O thread, the same thread that sends every batch. Anything slow in a callback, like a database call, holds up every other send from this producer. So keep callbacks short. Note the outcome, and when something failed, record it somewhere durable so it can be dealt with deliberately rather than lost.",
}
