import type { Section } from '../types'

// Plan §8.7 — processing guarantees, output updates, and downstream interpretation.
export const outputSemantics: Section = {
  id: 'output-semantics',
  title: 'Outputs are updates',
  scene: 'output-semantics',
  focus: 'updates',
  slide: `## Outputs are updates

A windowed aggregate does not emit one final answer. It emits **updates** as records arrive, and each new value **replaces** the previous one for that window.

### Reading the output
- mug-blue's 09:00 window is emitted as 12.00, then 36.00, then 48.00
- How many updates appear depends on **caching** and **commit** timing
- Readers must keep the **latest value** per key and window, not add them up

### The processing guarantee
- **at_least_once**, the default: after a crash, some updates **repeat**
- **exactly_once_v2**: no repeated output, using Kafka transactions
- With exactly_once_v2, readers of the output need **read_committed**
- **suppress()** can hold updates back until a window closes, if one final value is needed`,
  narration:
    "A common surprise with Kafka Streams is that a windowed total is not emitted once, as a final answer. It is emitted as a series of updates. Here, the nine o'clock window for the blue mug is emitted as twelve, then thirty-six, then forty-eight, as paid orders arrive. Each new value replaces the previous one for that window. How many updates actually appear depends on record caching and on the commit interval, so the exact sequence can vary from run to run, while the latest value is always right. The consequence for downstream readers is important. They must treat the output as a table, keeping the latest value per key and window. A reader that adds the updates together would report ninety-six instead of forty-eight. Then the processing guarantee. The default, at least once, means that after a crash some updates may be emitted again. Exactly once v2 uses Kafka transactions, from chapter six, so output and offsets commit together and nothing repeats. It commits far more often, every hundred milliseconds, and its readers must use read committed to benefit.",
}
