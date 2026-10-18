import type { Section } from '../types'

// Plan §10.6 — consumer lag, processing latency, freshness, and why they differ.
export const lagLatency: Section = {
  id: 'lag-latency-freshness',
  title: 'Lag, latency and freshness',
  scene: 'lag-latency',
  focus: 'three',
  slide: `## Lag, latency and freshness

Three different numbers are all loosely called "lag". They answer **different questions**, and only one is what a customer notices.

### The three numbers
- **Consumer lag**: how many records behind, here 1 200
- **Processing latency**: how long one record takes, here 40 ms
- **Freshness**: how old the newest processed event is, here 6 seconds

### Why they differ
- Lag only becomes time when divided by the **rate**: 1 200 at 200/s is about 6 s
- On a quiet topic, small lag can still mean **stale** results
- A burst makes lag spike while freshness barely moves
- Measure freshness from **event time** in the record, not arrival time
- The consumer metric **records-lag-max** shows its worst partition`,
  narration:
    "Three different measurements all get loosely called lag, and confusing them leads to bad alerts. They answer different questions. Consumer lag is a count: how many records the group is behind, the log end offset minus its committed offset. Here, twelve hundred records. Processing latency is how long the consumer takes to handle one record, here forty milliseconds. And freshness is how old the results are: the time between an event happening and its effect being visible, here six seconds. These can move independently. Lag only becomes a time once it is divided by the incoming rate. Twelve hundred records at two hundred a second is about six seconds, which agrees with the freshness here. But on a quiet topic, lag can be tiny while the one waiting record is an hour old, so results are stale. And a burst can make lag jump to thousands while freshness barely changes, because the burst clears in a few seconds. Customers notice freshness. They never see a record count. So freshness, measured from event time, is the measure to alert on, with lag as a supporting signal.",
}
