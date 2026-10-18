import type { Section } from '../types'

// Plan §10.8 — controlled comparisons, measured fairly, without weakening guarantees.
export const controlledComparison: Section = {
  id: 'controlled-comparisons',
  title: 'Controlled comparisons',
  scene: 'controlled-comparison',
  focus: 'run',
  slide: `## Controlled comparisons

A tuning change is only proven by a **controlled comparison**: the same workload, measured the same way, with **one change** between runs.

### Running it
- **kafka-producer-perf-test** generates a fixed load at a fixed rate
- Run it twice, changing only **linger.ms**
- Compare throughput and **latency percentiles**, not just averages

### Keeping it fair
- Use realistic **record sizes, keys** and rates
- Run long enough to pass warm-up and **page cache** effects
- Never "win" by weakening **acks** or idempotence
- Write down the **hypothesis** first: what should improve, and by how much
- Repeat each run, so **noise** is not mistaken for a result`,
  narration:
    "Tuning advice is easy to find and easy to misapply. The only way to know whether a change helps your system is a controlled comparison: the same workload, measured the same way, with exactly one change between the two runs. Kafka ships a load generator for this, the producer performance test. Here it sends one million records of one kibibyte each, at a fixed two thousand records a second, which is the peak rate from the workload model. The two runs are identical except for linger milliseconds, five then twenty. The tool reports throughput and latency percentiles. Compare the percentiles, such as the ninety-ninth, not just the average, because an average can improve while the slowest requests get worse. A few rules keep the comparison fair. Use realistic record sizes, keys and rates, because a benchmark of tiny records says little about real ones. Run long enough to get past warm-up effects, including the page cache filling. And never let a tuning experiment win by weakening a guarantee. A configuration that is faster because it changed acks to one has not been tuned. It has been made less durable.",
}
