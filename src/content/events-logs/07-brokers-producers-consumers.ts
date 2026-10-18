import type { Section } from '../types'

// Plan §1.4 — brokers, producers, consumers and independent consumer groups.
export const clusterRoles: Section = {
  id: 'brokers-producers-consumers',
  title: 'Brokers, producers and consumer groups',
  scene: 'cluster-roles',
  focus: 'groups',
  slide: `## Brokers, producers and consumers

Four roles make up a Kafka system, and only one of them stores data. Producers and consumers are ordinary applications using a client library.

### The roles
- A **producer** writes records to a topic
- **Brokers** store the partitions and serve reads and writes
- A **consumer** reads records from partitions
- A **consumer group** is the set of consumers sharing one application's work

### Groups are independent
- Inside a group, each partition is read by **one member** at a time
- Different groups each read **every record**, with separate positions
- More members than partitions leaves the extra members **idle**`,
  narration:
    "There are four roles to know, and only one of them stores anything. A producer is any application that writes records, checkout in our example. Brokers are the Kafka servers. They store the partitions on disk and handle every read and write, and in a real cluster the partitions of one topic are spread across several brokers. A consumer is an application instance that reads records. The fourth role is the one people most often misunderstand: the consumer group. A group is the set of consumers that together make up one application, sharing its work. Inside a group, each partition is read by exactly one member at a time, so fulfilment's two members split the three partitions between them. But groups do not share with each other. Analytics is a separate group, so it reads every record too, with its own positions, at its own speed. That is how one stream of orders can feed many applications at once: one group per application, and as many members inside a group as there are partitions to share.",
}
