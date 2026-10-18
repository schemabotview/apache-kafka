import type { Section } from '../types'

// Plan §2.1 — topic ownership, naming, and the settings readers depend on.
export const topicOwnership: Section = {
  id: 'topic-ownership-naming',
  title: 'Ownership and naming',
  scene: 'topic-ownership',
  focus: 'card',
  slide: `## Ownership and naming

Once other teams read a topic, it is an **interface**, as binding as an API, from its first event.

### One owner per topic
- One team **writes** it and approves every change
- Readers depend on its key, schema, partition count and retention
- Changing any of them is a change to **every reader**, whether or not they were told
- Readers never write to it; a correction is a **new event** from the owner

### Names that say what is inside
- Name the **domain and entity**, such as *shop.orders*, not a team or an application
- Keep the name stable; a new meaning deserves a **new topic**
- Only a **breaking** change gets a new name, such as *shop.orders.v2*
- This course keeps the short name *orders*`,
  narration:
    "As soon as a second team reads a topic, that topic has become an interface, just as binding as an API. It needs an owner. Here, the checkout team is the only writer of the orders topic, and it is the team that answers when something about it goes wrong, and that approves any change. Look at what readers are quietly depending on. Fulfilment depends on the key, because the key is what keeps one order's events in order. Analytics depends on the schema to understand every field. Anyone who needs to replay depends on the retention period being long enough. Change any of these, and you have changed something for every reader, whether or not they were told. The name matters too. A good name says what is inside, a domain and an entity, such as shop dot orders, rather than which team or application happens to write it today, because teams and applications get renamed and replaced. Keep the name stable, and if the meaning of the data changes, publish a new topic rather than quietly repurposing the old one. In the rest of this course the examples keep the short name orders, for readability.",
}
