import type { Section } from '../types'

// Plan §6.7 — poison records, retry topics, quarantine, and ordering consequences.
export const retryTopics: Section = {
  id: 'poison-records',
  title: 'Poison records and retry topics',
  scene: 'retry-topics',
  focus: 'paths',
  slide: `## Poison records and retry topics

A **poison record** fails every time it is processed. Retried in place, it **blocks its partition** forever, and everything behind it waits.

### Moving it aside
- Send it to a **retry topic**, to be tried again after a delay
- After a few tries, move it to a **dead-letter topic** for a person to inspect
- The main partition **keeps flowing** meanwhile

### The ordering cost
- o-1041 **SHIPPED** is processed while its **PAID** event is still waiting
- Whatever reads the results must cope with events **out of order**
- Never retry **invalid** data: quarantine it at once, with the error attached
- Retry topics need their own **consumers**, offsets and monitoring
- A dead-letter topic nobody watches is **data loss** with extra steps`,
  narration:
    "Some records fail every time, however often they are retried: a malformed payload, a reference to a product that does not exist, a bug in the handler. These are poison records, and they are dangerous, because a consumer processes a partition in order. If it retries a poison record in place, it never gets past it, and every record behind it in the partition waits, possibly for days. The common fix is to move the record aside. On failure, the consumer publishes it to a retry topic, which is processed again after a delay, say a minute, in case the failure was temporary. After a few attempts, it goes to a dead letter topic, where it waits for a person to inspect it. The main partition keeps flowing the whole time. Notice the price. Order ten forty-one's paid event failed and went to the retry topic, and while it waited, the shipped event for the same order was processed from the main topic. The paid event is processed a minute later, out of order. So whatever consumes the results must cope with that. And never retry invalid data: quarantine it straight away, with the error attached.",
}
