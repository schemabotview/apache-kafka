import type { Section } from '../types'

// Plan §10.7 — forming a bottleneck hypothesis from supplied metrics: slow consumers versus broker pressure.
// density-accept: two stacked plots bind on height (0.89); each keeps a fixed aspect, and side by side they shrink below legible size
export const metricCharts: Section = {
  id: 'slow-consumer-or-broker',
  title: 'Slow consumer or broker pressure?',
  scene: 'metric-charts',
  focus: 'slow-consumer',
  slide: `## Slow consumer or broker pressure?

Growing lag is a **symptom**, not a cause. Plotting it next to **produce latency** usually separates the two common causes.

### Reading the supplied charts
- **Incident A**: lag climbs, produce latency stays **flat**
- The brokers are fine: the consumer is the bottleneck
- **Incident B**: lag and produce latency climb **together**
- The brokers are struggling; every client feels it

### Turning it into a hypothesis
- A: check **handler time**, errors and GC pauses
- B: check broker **threads, disks and network**
- Compare with the **same period** last week, to see what normal looks like
- Confirm a hypothesis with a **second** metric before acting on it
- The causes can **combine**: a slow broker also slows every consumer's fetches`,
  narration:
    "Lag growing is a symptom, not a cause, and the first job is to decide where to look. A simple technique works surprisingly often: plot consumer lag next to produce latency, over the same period. These two charts are supplied examples, not measurements from a real system, but they show the two patterns you will meet most. In incident A, lag starts climbing at minute ten and keeps climbing, while produce latency stays completely flat. Producers are being served normally, so the brokers are healthy. The consumer is the bottleneck. Perhaps its handler got slower, or it is failing and retrying, or garbage collection is stalling it. In incident B, lag climbs, and produce latency climbs with it. Now every client of the cluster is affected, which points at the brokers: request threads saturated, a slow disk, or a congested network. From there, each pattern turns into a hypothesis to test. For A, look at the application's handler time, its errors and its garbage collection. For B, look at the broker resource metrics from two sections ago. Either way, confirm the hypothesis before changing anything.",
}
