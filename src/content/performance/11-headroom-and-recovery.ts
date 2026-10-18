import type { Section } from '../types'

// Plan §10.8 — quotas, headroom, and recovery throughput.
export const recoveryThroughput: Section = {
  id: 'headroom-and-recovery',
  title: 'Headroom and recovery time',
  scene: 'recovery-throughput',
  focus: 'calc',
  slide: `## Headroom and recovery time

Capacity is not only about keeping up. **Headroom** decides how quickly a consumer **catches up** after an outage.

### The calculation
- An hour down at 200 records/s leaves **720 000** records of backlog
- Catch-up time is backlog ÷ **spare capacity**: capacity minus incoming
- With 1 000/s capacity, **15 minutes**; with 250/s, **4 hours**
- With exactly 200/s, the group **never** catches up

### Planning for it
- Size consumers with real **spare** capacity, not "just enough"
- Keep retention **longer** than any plausible catch-up
- A **quota** keeps a catching-up group from starving other clients
- Rehearse it: stop a group for an hour in staging, then **time** the catch-up`,
  narration:
    "Capacity planning is usually framed as keeping up with traffic. Recovery is the part that gets forgotten: how quickly a consumer catches up after it has been down. Take fulfilment, down for one hour while orders keep arriving at two hundred a second. That leaves a backlog of seven hundred and twenty thousand records. When it comes back, new orders are still arriving, so it can only spend its spare capacity, its total capacity minus the incoming rate, on the backlog. With a capacity of a thousand records a second, eight hundred a second are spare, and the backlog clears in fifteen minutes. With four hundred, it takes an hour. With two hundred and fifty, only fifty a second are spare, and it takes four hours, during which orders are shipping late. And a group sized at exactly two hundred a second, just enough to keep up, never catches up at all. So size consumers with genuine spare capacity. Keep retention comfortably longer than any plausible catch-up, so the backlog cannot expire before it is read. And remember that an outage hurts most on a peak day, when spare capacity is smallest.",
}
