import type { Section } from '../types'

// Plan §5.6 — KRaft controllers, the metadata quorum, and broker roles.
export const kraftPlanes: Section = {
  id: 'kraft-controllers',
  title: 'KRaft: the metadata plane',
  scene: 'kraft-planes',
  focus: 'metadata',
  slide: `## KRaft: the metadata plane

A Kafka cluster has **two planes**. Brokers move the data; **controllers** decide the metadata: topics, partitions, leaders and the ISR.

### The controller quorum
- Usually **3 or 5** controllers; one is **active** and makes decisions
- Each change is appended to the **metadata log**, replicated like a partition
- A change is final once a **majority** of controllers has it
- If the active controller fails, a standby takes over in **seconds**

### How brokers follow
- Brokers **fetch** the metadata log and apply each change
- Brokers send **heartbeats**, so the controller can fence one that disappears
- KRaft replaced **ZooKeeper**, which Kafka 4 no longer supports`,
  narration:
    "Everything so far has been about the data plane: brokers storing partitions and serving clients. But someone has to decide which topics exist, where each partition's replicas live, who leads each one, and which replicas are in sync. That is the metadata plane, and in KRaft mode it is run by controllers. A production cluster usually has three or five of them. One is the active controller, which makes every decision, and the others are hot standbys, ready to take over. Every change, a topic created, a leader elected, an ISR shrunk, is appended to a metadata log. That log is replicated across the controllers using a consensus protocol, the same idea as partition replication, and a change is final once a majority of controllers has it. Brokers follow that log. Each broker fetches new metadata records and applies them, which is how it learns that it now leads a partition. Brokers also send heartbeats to the controller, so a broker that disappears can be fenced, and its partitions given new leaders. KRaft replaced ZooKeeper, which used to hold this metadata, and Kafka four no longer supports ZooKeeper at all.",
}
