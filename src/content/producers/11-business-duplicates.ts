import type { Section } from '../types'

// Plan §3.7 — business duplicate events, validation failures, and bounded retry policies.
export const businessDuplicates: Section = {
  id: 'business-duplicates',
  title: 'Business duplicates and retry policy',
  scene: 'business-duplicates',
  focus: 'policy',
  slide: `## Business duplicates and retry policy

Idempotence removes the producer's own retries. It cannot see the application **publishing the same event twice**, for example after a delivery timeout.

### Two records, one payment
- Offsets 7 and 9 both say o-1041 **PAID**
- Kafka sees two different sends; only the **same eventId** shows they are one event
- Readers must **deduplicate by eventId**, which chapter 6 builds on

### A bounded publish policy
- **Validate** before sending: invalid data is never worth retrying
- Re-send with the **same eventId**, never a new one
- Expect this in normal operation: timeouts happen during ordinary **broker restarts**
- **Bound** retries by time, then park the event and alert a person`,
  narration:
    "Idempotence removes duplicates caused by the producer's own retries. It cannot help with a duplicate the application creates itself. Here is the common way that happens. Checkout publishes order ten forty-one paid, and the callback reports a delivery timeout. Remember, that means unknown, not failed. In fact, the record was stored at offset seven. Checkout, believing it failed, publishes the event again, through a new send with a new sequence number, and it is stored again at offset nine. Kafka did nothing wrong. It received two separate sends. The only thing that reveals the truth is that both records carry the same event id, because checkout re-sent the same event rather than building a new one. So this is the publishing policy worth adopting. Validate before sending, because a record that fails validation will fail every time, and retrying it only delays the alert. On a re-send, always reuse the event id. Bound retries by time, and when they run out, park the event somewhere durable and alert a person, rather than retrying forever. And design readers to deduplicate by event id, which is where chapter six picks up.",
}
