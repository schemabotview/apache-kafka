import type { Section } from '../types'

// Plan §6.6 — dual-write failure between a database and Kafka.
export const dualWrite: Section = {
  id: 'dual-write',
  title: 'The dual-write problem',
  scene: 'dual-write',
  focus: 'failures',
  slide: `## The dual-write problem

Checkout must save the order **and** publish OrderPlaced. Two separate writes, to two systems, with **no transaction** spanning both.

### Every order of writes fails
- **Database first**: a crash after it saves the order but sends **no event**, so it never ships
- **Kafka first**: a crash after it sends an event for an order the database **does not have**
- Retries cannot close the gap: the crash can come **before** the retry
- try/catch does not help either: the **process** itself can die

### Why it is easy to miss
- It works in every test, and fails only when a **crash** lands in between
- The two systems then **disagree**, silently, until someone notices
- Finding it later needs **reconciliation**: comparing both sides for mismatches`,
  narration:
    "Now the producing side. When a customer places an order, checkout has to do two things: save the order in its database, and publish order placed to Kafka. They look like two lines of code. They are two separate writes, to two different systems, and there is no transaction that spans both. Try both orders. Write the database first, then publish. If checkout crashes between the two, the order is saved, but no event was ever published. Fulfilment never hears about it, and the order never ships. Publish first, then write the database. A crash between the two means fulfilment ships an order that the orders database has no record of. Retrying does not close the gap, because the crash can always land before the retry happens. This is the dual write problem, and it is easy to miss, because it works in every test. Nothing goes wrong until a crash lands in exactly the wrong millisecond in production. Then the two systems quietly disagree, with no error anywhere, until a customer complains. The fix is to stop writing to two places at once.",
}
