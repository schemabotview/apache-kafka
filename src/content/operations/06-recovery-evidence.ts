import type { Section } from '../types'

// Plan §11.4 — service-level recovery evidence, rather than merely healthy processes.
export const recoveryEvidence: Section = {
  id: 'recovery-evidence',
  title: 'Healthy processes are not recovery',
  scene: 'recovery-evidence',
  focus: 'compare',
  slide: `## Healthy processes are not recovery

After an incident, every process can be **running** while customers are still **not served**. Recovery is shown with **service evidence**.

### Process evidence
- Brokers running, pods ready, no errors, ISR full again
- All of it can be true while **orders are not shipping**

### Service evidence
- Orders are produced and **acknowledged**, end to end
- Fulfilment **freshness** is back within its target
- The outage **backlog** has drained
- Order **counts reconcile** between the database and Kafka

### Then write it down
- A timeline, with the evidence, while it is **fresh**
- Then turn what was learned into **runbook** changes`,
  narration:
    "At the end of an incident there is a tempting moment when every dashboard turns green. The brokers are running, the consumer pods report ready, the error logs are quiet, and the in-sync replica sets are full again. All of that is process evidence. It shows that the components are alive. It does not show that customers are being served, and the two can disagree for hours. Recovery should be declared on service evidence instead. Are orders being produced and acknowledged, end to end? Is fulfilment's freshness, the measure from chapter ten, back within its target? Has the backlog that built up during the outage actually drained? And do the order counts reconcile, comparing the orders database with what reached Kafka and what fulfilment processed, so that nothing was silently lost? Only when those are true has the service recovered. Then write it down while it is fresh: a timeline of what happened, what was done, and the evidence for recovery. That record is what turns one incident into a better runbook for the next one.",
}
