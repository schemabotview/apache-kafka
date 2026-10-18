import type { Section } from '../types'

// Plan §6.1 — at-most-once and at-least-once as processing/commit order choices.
export const deliverySemantics: Section = {
  id: 'delivery-semantics',
  title: 'At most once and at least once',
  scene: 'delivery-semantics',
  focus: 'choices',
  slide: `## At most once and at least once

Delivery guarantees are not switches. They describe **the order** in which a consumer commits and does its work, judged by what a crash in between costs.

### The two orders
- **Commit, then process**: a crash in between loses the work, so **at most once**
- **Process, then commit**: a crash in between repeats the work, so **at least once**
- Every consumer has one of these orders, whether it was chosen or not

### The usual goal
- Losing an order is rarely acceptable, so most systems choose **at least once**
- Then the real work is making a repeat **harmless**
- "Exactly once" always needs a **scope**: once for what, and where
- The rest of this chapter builds that scope, piece by piece`,
  narration:
    "Delivery guarantees sound like settings you switch on. They are not. They describe the order in which a consumer does two things, committing its offset and doing its work, judged by what a crash between those two steps costs. Commit first, then process, and a crash in between means the restarted consumer starts after the record. The order is never shipped. That is at most once: nothing is repeated, but things can be lost. Process first, then commit, and a crash in between means the restarted consumer reads the record again. The order is shipped twice. That is at least once: nothing is lost, but things can be repeated. Every consumer has one of these two orders, whether anyone chose it deliberately or not. For order processing, losing an order is rarely acceptable, so almost every system chooses at least once. The real engineering work is then making a repeat harmless. And whenever someone claims exactly once, the useful question is: once for what, and where? Exactly once always has a scope. This chapter builds that scope one piece at a time, starting inside Kafka and then moving outward.",
}
