import type { Section } from '../types'

// Plan §3.5 — timeouts, retries, and ambiguous outcomes: the lost acknowledgement.
export const lostAck: Section = {
  id: 'lost-acknowledgement',
  title: 'A lost acknowledgement',
  scene: 'lost-ack',
  focus: 'timeline',
  slide: `## A lost acknowledgement

Some failures leave the producer **unable to know** whether a record was stored. The lost acknowledgement is the classic case.

### The timeline
- The broker appends o-1041 PAID at offset 7, but the **reply is lost**
- After **request.timeout.ms**, 30 s, the producer cannot tell this from a send that never arrived
- It retries, so without idempotence the broker stores a **second copy** at offset 8
- The callback then reports a single **success**

### What it teaches
- A timeout is an **unknown** outcome, not a failure
- Retries turn "maybe lost" into "**maybe duplicated**"
- Turning retries **off** does not help: the first copy may already be stored
- **delivery.timeout.ms**, 120 s, caps all retries; after it the outcome is **still unknown**`,
  narration:
    "Some failures leave the producer genuinely unable to know what happened, and the lost acknowledgement is the classic one. This timeline has idempotence switched off, to show the underlying problem. The producer sends order ten forty-one paid. The broker appends it at offset seven, and replies. But the reply is lost on the network. From the producer's side, nothing comes back. After the request timeout, thirty seconds by default, it has to decide what to do, and it cannot tell this situation apart from one where the batch never reached the broker at all. Both look exactly the same: silence. Retries are on, so it sends the same batch again. The broker has no way to recognise it, and appends a second copy at offset eight. This time the reply arrives, and the callback reports a single success. The application believes it published once. The log contains the event twice. There are two lessons here. A timeout is an unknown outcome, not a failure. And retrying turns maybe lost into maybe duplicated. The next sections show how Kafka removes this particular duplicate, and which duplicates it cannot remove.",
}
