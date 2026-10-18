import type { Section } from '../types'

// Plan §10.5 — broker disk, network, CPU, memory, and request latency evidence.
export const brokerEvidence: Section = {
  id: 'broker-evidence',
  title: 'Broker resource evidence',
  scene: 'broker-evidence',
  focus: 'parts',
  slide: `## Broker resource evidence

A broker can run short of **threads, network, disk or memory**. Each one has a metric that shows it, before clients notice.

### The resources
- **Request handler** and **network** threads: idle percentage falling toward zero
- **Network**: bytes in and out approaching the link speed
- **Disk** and **page cache**: reads that start hitting disk instead of memory

### Where a request spends its time
- **TotalTimeMs** for Produce splits into parts
- **Queue** time means threads are busy; **local** time means a slow disk
- **Remote** time means waiting for followers, so look at **replication**
- Alert on **trends**, not single spikes; brokers are bursty by nature
- TLS and compression cost **CPU**, so watch it after enabling either`,
  narration:
    "When clients get slower, the cause is often a broker running short of something, and each resource has a metric that shows it, ideally before clients notice. Request handler threads do the actual work of each request, and network threads move bytes to and from sockets. For both, the broker reports an average idle percentage. Healthy brokers have plenty of idle time. As it falls toward zero, requests start queueing. Network capacity shows in bytes in and out per second, compared with the link speed, remembering that fan-out and replication multiply outbound traffic. Disk and memory go together. Kafka relies on the operating system's page cache, so most reads of recent data never touch the disk. When consumers fall behind and read old data, or memory is short, reads start hitting the disk, and everything slows. The most useful single view is request time, split into parts. Total time for a produce request is the sum of time queued waiting for a thread, local time writing on the leader, remote time waiting for followers under acks all, and time sending the response. Whichever part grew tells you where to look.",
}
