import type { Section } from '../types'

// Plan §1.2 — request/response, work queues, batch transfers and retained event logs, compared.
export const integrationStyles: Section = {
  id: 'integration-styles',
  title: 'Four ways to move an order',
  scene: 'integration-styles',
  focus: 'log',
  slide: `## Four ways to move an order

Systems have passed orders to each other for decades. Each style answers two questions differently: **who can read** a message, and **what is left** once it has been read.

### Where a retained log differs
- **Request/response** gives one caller one answer, and keeps nothing
- A **work queue** hands each message to one worker, then removes it
- A **batch file** is complete, but only arrives on a schedule
- A **retained log** keeps every record for a set period, so any number of readers can each read all of it, and read it **again**
- Several teams needing **every order**, each at its own speed, is the case a log was built for

### When a queue is still right
- Sharing out **work** where each job must run once is a queue's job; Kafka can do it, but that is not what makes it different`,
  narration:
    "Before looking inside Kafka, it helps to place it among the older ways of moving data between systems. With request and response, one caller asks and waits for one answer, and once the answer arrives there is nothing left to read again. A work queue spreads messages across many workers, but each message goes to exactly one of them and is removed once it has been handled. That is ideal for sharing out work, and wrong when two different teams both need every order. A batch file, say a nightly export, does contain everything, but it only arrives on a schedule, and tomorrow's file replaces today's. A retained log is the fourth style, and it is the one Kafka implements. Records are appended in order and kept for a configured period, whether or not anyone has read them. Any number of independent readers can read the whole log, each at its own pace, and any of them can go back and read it again. Keep the three questions at the bottom in mind: who reads, when, and can they read it again. They are the quickest way to decide whether a log is actually the right tool.",
}
