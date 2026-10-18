import type { Section } from '../types'

// Plan §1.5 — trace a local KRaft quick start: format storage, start, create the orders topic.
export const quickstartCommands: Section = {
  id: 'local-kraft-quickstart',
  title: 'A local KRaft quick start',
  scene: 'quickstart-commands',
  focus: 'topic',
  slide: `## A local KRaft quick start

Four commands give a working single-broker cluster on a laptop. This is the official Kafka 4.1 quick start, with the topic created explicitly.

### What each step does
- **Format** writes a new cluster id into the storage directory; the server will not start without it
- **Start** runs one process that is both **broker** and **controller**
- **Create** makes *orders* with **3 partitions**; this config would default to 1
- **Describe** confirms the partition count, and which broker leads each partition

### KRaft, not ZooKeeper
- Kafka 4 keeps cluster metadata in its own **controller quorum**
- ZooKeeper appears in older material only; it has been **removed**
- Here one process is both; production clusters usually run **dedicated** controllers`,
  narration:
    "To make this concrete, here is a working cluster on one machine, following the official Kafka four point one quick start. The first command gives the new cluster an identifier, and format writes that identifier into the storage directory, which Kafka refuses to start without. The next command starts the server. In this configuration a single process plays two roles. It is a broker, storing data and serving clients, and it is a controller, managing the cluster's metadata. That is KRaft mode, and it is the only mode Kafka four supports. Older material will mention ZooKeeper, which used to do the controller's job and has now been removed. Then the topic. The quick start creates its topic with whatever the defaults are, and the shipped configuration defaults to a single partition. So this version names three partitions explicitly, because a one-partition topic would hide everything interesting about keys. Finally, describe shows what was actually created. You do not need to run any of this to follow the course. The transcripts that follow show what it produces.",
}
