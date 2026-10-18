import type { Section } from '../types'

// Plan §3.1 — metadata discovery: bootstrap servers, leaders, and refresh on change.
export const metadataDiscovery: Section = {
  id: 'metadata-discovery',
  title: 'Metadata and partition leaders',
  scene: 'metadata-discovery',
  focus: 'metadata',
  slide: `## Metadata and partition leaders

The producer never sends through a central router. It learns which broker **leads** each partition, and sends each batch **straight to that leader**.

### How it finds out
- It connects to a **bootstrap** broker and asks for the topic's **metadata**
- The answer lists every partition's leader, with the address to reach it
- The producer **caches** that map and refreshes it periodically
- List **two or three** bootstrap brokers, so one being down does not block start-up

### When the map is wrong
- A leader can move, for example while a broker restarts
- The old leader replies **NOT_LEADER**, a retriable error
- The producer **refreshes metadata** and retries, without the application seeing it
- Every broker's **advertised address** must be reachable from the client`,
  narration:
    "A producer does not send everything to one broker and let it forward records around the cluster. Every partition has one broker acting as its leader, and the producer sends each batch directly to that leader. So before it can send anything, the producer has to find out who leads what. It connects to one of the bootstrap brokers and asks for the topic's metadata. The answer lists every partition, the broker currently leading it, and the address to reach that broker. Here, partition zero is led by broker one, partition one by broker two, and partition two by broker three. The producer caches that map and refreshes it periodically. Leadership does change, for example while a broker is restarted for maintenance. When that happens, a batch can arrive at a broker that is no longer the leader. That broker replies with a not leader error, which is retriable. The producer refreshes its metadata, learns the new leader, and sends the batch again, and the application never sees any of it. One practical consequence: every client must be able to reach every broker's advertised address, which matters a great deal in chapter nine.",
}
