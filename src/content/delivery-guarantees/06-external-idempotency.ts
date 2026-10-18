import type { Section } from '../types'

// Plan §6.5 — external writes and idempotency keys: charge-then-commit versus commit-then-charge.
export const paymentFailures: Section = {
  id: 'external-idempotency',
  title: 'Charging a card safely',
  scene: 'payment-failures',
  focus: 'key',
  slide: `## Charging a card safely

A payment service is outside Kafka, so neither commit order is safe on its own. The fix lives in the **call itself**: an **idempotency key**.

### The failure table
- **Commit, then charge**: a crash in between means the customer is **never charged**
- **Charge, then commit**: a crash in between charges them **twice**
- Changing the order only changes **which** failure you get

### The idempotency key
- Charge first, sending the **eventId** as the idempotency key
- A repeated call with the same key returns the **first result**, without charging again
- It only works if the provider **supports** keys, and keeps them long enough
- Some providers keep keys only for **hours**, shorter than many replays`,
  narration:
    "Here is the plan's central example: charging a card when an order paid event arrives. The payment service is outside Kafka, so a transaction cannot help, and both commit orders fail. Commit first, then charge, and a crash between the two means the restarted consumer skips the event. The customer is never charged, and the order ships for free. Charge first, then commit, and a crash between them means the restarted consumer charges again. The customer is charged twice. Swapping the order only chooses which failure you get. The fix is not in the ordering. It is in the call. Charge first, then commit, but send an idempotency key with the charge, and use the event id as that key. Payment providers that support idempotency keys remember them. When the same key arrives a second time, they return the result of the first charge instead of charging again. Now the repeat after a crash is harmless: charged once. Two conditions apply, and both are worth checking with the provider. It must actually support idempotency keys, and it must remember them for longer than your longest possible replay.",
}
