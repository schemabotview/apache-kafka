import type { Section } from '../types'

// Plan §1.1 — events, commands and state, and why asynchronous communication follows from them.
export const eventsCommandsState: Section = {
  id: 'events-commands-state',
  title: 'Events, commands and state',
  scene: 'event-command-state',
  focus: 'event',
  slide: `## Events, commands and state

A shop exchanges three different kinds of message about one order, and they behave very differently. Kafka is built around one of them.

### Three kinds of message
- A **command** asks for something: *PlaceOrder* can still be refused
- An **event** records a fact: *OrderPlaced* has already happened
- **State** is the latest summary: order 1042 is *PLACED*, until the next event changes it

### Why events change the design
- The checkout service publishes **once** and moves on
- Fulfilment, analytics and notifications react **on their own schedule**
- A new reader can be added later without touching checkout
- Any reader can **rebuild** its own state by replaying the events`,
  narration:
    "Start with one order in a small online shop. A shopper clicks Place order, and three quite different kinds of message start moving around. The first is a command. Place order is a request, and a request can be refused: the card might be declined, or an item might be out of stock. The second is an event. Once the checkout service has accepted the order, it records a fact: order placed. An event is in the past tense, because it describes something that has already happened and cannot be refused any more. The third is state. Order ten forty-two is currently placed, and later it will be shipped. State is a summary of everything that has happened so far, and it keeps changing. Kafka is built around the second kind, the event. The checkout service publishes the fact once, and then it is done. Fulfilment, analytics and notifications each react to that fact on their own schedule, and none of them needs checkout to wait for it. That independence is the reason to communicate asynchronously, and it is what the rest of this course builds on.",
}
