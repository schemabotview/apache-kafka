import type { Section } from '../types'

// Plan §6.8 — replay correctness: deterministic logic, changing reference data, and effect suppression.
export const replayCorrectness: Section = {
  id: 'replay-correctness',
  title: 'Replaying correctly',
  scene: 'replay-correctness',
  focus: 'risks',
  slide: `## Replaying correctly

A replay only reproduces the original result if the processing is **deterministic**. Anything read from outside the event can quietly **change the answer**.

### Sources of difference
- The **current time**: use the event's own occurredAt instead
- **Reference data** such as prices: look it up **as of** the event time
- **Randomness**: derive any random choice from the eventId

### Before running a replay
- **Bound** it by offsets or time, and preview the range
- Make sure every reader **deduplicates** by eventId
- Switch **side effects** such as emails off, or they repeat
- Replay into a **separate output topic** first, and compare before switching
- Keeping reference data **history** must be decided before the first replay`,
  narration:
    "Kafka's retained log makes replay possible, and earlier chapters showed how to reset a group. But replaying a week of orders only reproduces the original results if the processing is deterministic, meaning the same event always produces the same outcome. Anything the code reads from outside the event can quietly change the answer. The current time is the usual culprit. A discount that depends on the clock gives a different price on replay, so use the event's own occurred at time instead. Reference data is the next. Replaying last week's orders against today's price list produces today's prices. Look up reference data as of the event time, which means keeping its history. Randomness, such as generated coupon codes, should be derived from the event id, so a replay generates the same code. Before running any replay, check three things. That it is bounded, by offsets or by time, and previewed. That every reader of its output deduplicates by event id. And that side effects such as emails and payment calls are switched off for the replay, or customers will receive every one of them again.",
}
