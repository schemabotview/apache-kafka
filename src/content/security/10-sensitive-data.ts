import type { Section } from '../types'

// Plan §9.7 — sensitive event data, retention and deletion limits, and audit evidence.
export const sensitiveData: Section = {
  id: 'sensitive-data',
  title: 'Sensitive data and its limits',
  scene: 'sensitive-data',
  focus: 'limits',
  slide: `## Sensitive data and its limits

Once personal data is in a topic, removing it is **hard**. Kafka has no command to delete **one record** from a log.

### What each mechanism can do
- **Retention** removes old segments, but only on its schedule
- **Compaction** with a tombstone removes older values for a key, eventually
- Deleting a topic removes it, but not **mirrors, sinks or backups**

### Controls that work
- **Keep it out**: refer to customers by id, as chapter 2 advised
- **Encrypt** sensitive fields, and delete the key to make them unreadable
- Keep **audit evidence** of which principals read which topics
- Never **key** records by email or name: keys outlive compaction of values
- Treat a topic with personal data as a **regulated store**, with an owner`,
  narration:
    "Personal data in an event stream is far easier to add than to remove. Suppose a customer asks for their data to be deleted, and their details are in the orders topic. Kafka has no command to delete one record from a log. Retention removes whole segments, but only once they age out, on its own schedule. Compaction with a tombstone removes older values for a key, eventually, but only on compacted topics, and only when the cleaner runs. Deleting the topic removes everything in it, and still leaves every copy that has already left it: mirrored clusters, sink databases, search indexes and backups. So the controls that actually work happen earlier. The best is to keep sensitive data out of events in the first place, referring to customers by id, as chapter two advised. Where a sensitive field must travel, encrypt it, with a key per customer, and to forget the customer, delete their key, which makes every copy of the field unreadable at once. Give sensitive topics short retention. And keep audit evidence, from the authorizer's logs, of which principals read which topics, because questions about access always come later.",
}
