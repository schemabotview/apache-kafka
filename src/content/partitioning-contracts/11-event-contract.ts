import type { Section } from '../types'

// Plan §2.7 — event identifiers, sensitive fields, and contract validation.
export const eventContract: Section = {
  id: 'event-contract',
  title: 'Event ids, sensitive fields and validation',
  scene: 'event-contract',
  focus: 'checks',
  slide: `## Ids, sensitive fields and validation

A schema fixes the **shape** of an event. A good contract also fixes what the fields **mean**, and what must never be in them.

### Fields every event should carry
- An **eventId**, unique per event, so readers can recognise a **duplicate**
- **occurredAt**, the event time, set by the writer
- The **entity id** that is also the key, here *orderId*
- An **eventType** when one topic carries several kinds of event

### What to keep out, and check
- No card numbers or personal details: refer to the customer **by id**
- Retention keeps every copy for days, and a log cannot **edit one record** later
- **Validate** before producing, because the broker will not`,
  narration:
    "A schema fixes the shape of an event. A good contract goes further and fixes what the fields mean, and what must never appear in them. Three fields earn a place in almost every event. An event id, unique to this one event, so that a reader who receives the same event twice can recognise the duplicate. Chapter three shows why duplicates happen even when nothing is wrong. An occurred at timestamp, the event time, set by the writer when the thing happened, for the reasons from the section on time. And the entity id that is also the key, here the order id. Just as important is what stays out. This event refers to the customer by id. It does not carry their name, address or card number. Retention keeps every copy of every record for days or longer, often replicated to other systems, and you cannot reach into a log and edit a single record later. Sensitive data put into an event is very hard to take back. Finally, validate events before producing them, against the schema and against these rules, because the broker will accept whatever it is given.",
}
