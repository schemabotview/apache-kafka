import type { Section } from '../types'

// Plan §8.6 — join input and output tables for a windowed stream-stream join.
export const joinOutputs: Section = {
  id: 'join-outputs',
  title: 'What a windowed join emits',
  scene: 'join-outputs',
  focus: 'outputs',
  slide: `## What a windowed join emits

A windowed **inner** join emits a record only for pairs that **match within the window**. Everything else produces **nothing**, which is easy to overlook.

### Reading the tables
- o-1041: order at 09:14, payment at 09:16, **2 minutes** apart, so one output
- o-1043: payment 17 minutes after the order, **outside** the window: no output
- o-1050: no payment at all: no output

### Choosing the join
- An inner join cannot show **unmatched** orders
- A **left** or **outer** join emits them too, with an empty side
- To find unpaid orders, the absence is the signal: use a **left** join
- Left join results appear only once the **window closes** for the missing side
- Joins buffer both sides for the window, which needs **state** and changelogs`,
  narration:
    "It is worth tracing exactly what a windowed join produces, because the cases that produce nothing are the ones that cause surprises. The inputs are orders and payments, both keyed by order id, joined with a ten-minute window and one minute of grace. Order ten forty-one was placed at fourteen minutes past nine, and paid two minutes later. The two records are inside the window, so the inner join emits one output record, combining the order and the payment. Order ten forty-three was paid seventeen minutes after it was placed, outside the window, so the join emits nothing at all for it. And order ten fifty has no payment, so again nothing. An inner join only ever shows matches, which means it cannot show the most interesting case for this business: orders that were never paid. If you want unmatched records in the output, choose a left join, which emits every order, with the payment side empty when there is no match, or an outer join, which does the same for both sides. For finding unpaid orders, the absence of a match is the signal, so a left join is the tool.",
}
