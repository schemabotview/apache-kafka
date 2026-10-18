import type { Section } from '../types'

// Plan §2.2 — keys determine routing: entity ordering versus parallelism.
export const keyChoices: Section = {
  id: 'choosing-keys',
  title: 'Choosing a key',
  scene: 'key-choices',
  focus: 'k-order',
  slide: `## Choosing a key

The key decides two things at once: **which records stay in order** together, and **how evenly** the load spreads across partitions.

### The trade-off
- **Order id** keeps each order in sequence and spreads well, because there are many orders
- **Customer id** keeps a customer's orders together, but a few large customers concentrate load
- **Region** has only a handful of values, so most partitions get **nothing**
- **No key** spreads evenly, but keeps **nothing** in order

### A practical rule
- Key by the **entity whose events must stay ordered**
- Then check the key has **many values**, with roughly similar traffic each
- If two needs conflict, they may belong in **two topics** with different keys`,
  narration:
    "Choosing the key is choosing two things at once: which records stay in order relative to each other, and how evenly the work spreads across partitions. Take the four candidates for the orders topic. The order id keeps every event about one order in sequence, and because there are thousands of orders, it spreads the load evenly. That is why it is the default choice for this example. The customer id keeps all of a customer's orders together, which is useful if readers need a customer's history in order. But if a handful of business customers place most of the orders, their partitions carry far more than their share. Region is the trap. It looks like a sensible grouping, but there are only three values, so at most three partitions ever receive anything, however many the topic has. And with no key at all, records are spread evenly, but nothing at all is kept in order. The practical rule is to key by the entity whose events must stay ordered, and then to check that the key has many values with roughly similar traffic. The next section shows what happens when it does not.",
}
