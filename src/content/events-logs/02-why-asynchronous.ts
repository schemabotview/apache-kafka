import type { Section } from '../types'

// Plan §1.1 — the need for asynchronous communication, shown as the coupling a direct call chain creates.
export const whyAsynchronous: Section = {
  id: 'why-asynchronous',
  title: 'Why asynchronous communication',
  scene: 'sync-vs-log',
  focus: 'l-log',
  slide: `## Why asynchronous communication

When checkout calls every interested service directly, each of those services becomes part of placing an order, and its failures become checkout's failures.

### The cost of calling directly
- If **fulfilment is down**, checkout fails, even though the order was valid
- If **analytics is slow**, every shopper waits for it
- Adding **notifications** means changing and redeploying checkout

### What a retained log changes
- Checkout **appends once** and returns to the shopper
- Each reader keeps **its own position** and catches up when it can
- A reader added later can still read **the events it missed**
- The price: results are **eventually** visible, not immediately`,
  narration:
    "Here is the same order handled two ways. In the top picture, checkout calls each interested service directly, one after another. That looks simple, but it quietly makes every one of those services part of placing an order. If fulfilment is down, checkout fails, even though nothing was wrong with the order. If analytics is slow, every shopper waits for analytics. And when the business wants receipts emailed, someone has to change checkout and redeploy it. In the bottom picture, checkout appends one event to a log and immediately returns to the shopper. The log keeps that event. Fulfilment reads it when it is ready, analytics catches up later, and a notifications service added next month can still read orders that arrived before it existed. Nobody waits for anybody. That is what asynchronous means here: the writer and the readers no longer have to be available, or fast, at the same moment. The price is that results are no longer immediate, and the rest of this course is largely about managing that price carefully.",
}
