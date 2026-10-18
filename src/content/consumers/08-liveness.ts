import type { Section } from '../types'

// Plan §4.7 — poll cadence, heartbeats, and slow processing.
export const liveness: Section = {
  id: 'liveness',
  title: 'Heartbeats and slow processing',
  scene: 'liveness',
  focus: 'progress',
  slide: `## Heartbeats and slow processing

The group checks two different things about each member, and a slow handler fails **only the second**.

### The two checks
- **Heartbeats**, from a background thread, prove the **process** is alive
- **Calls to poll()**, from your loop, prove it is **making progress**
- No poll within **max.poll.interval.ms**, 5 minutes, and the member leaves

### A slow handler
- 500 records at 1 second each need over **8 minutes** between polls
- At 5 minutes the member leaves and its partition is **reassigned**
- Its eventual commit is **rejected**, so the batch is processed **twice**
- That rejection is a **CommitFailedException**: a sign the loop is too slow
- Raising the limit only **hides** the problem, and slows failure detection`,
  narration:
    "The group checks each member in two separate ways, and it is worth keeping them apart, because a slow handler fails only one of them. Heartbeats are sent by a background thread. They prove that the process is alive and connected. If none arrive for the session timeout, forty-five seconds by default, the member is removed. Calls to poll come from your loop. They prove the application is actually making progress. If the loop does not call poll within max poll interval, five minutes by default, the member leaves the group, even though its heartbeats are fine. Now take a slow handler. Poll returns five hundred records, and each one takes a second, perhaps because of a slow external service. That is over eight minutes before the next poll. At five minutes, the member leaves. Its partition is reassigned, and another member starts again from the last committed offset, repeating the batch. When the original handler finally finishes, its commit is rejected, because it no longer owns the partition. The batch has been processed twice, and if it keeps happening, the group can rebalance endlessly.",
}
