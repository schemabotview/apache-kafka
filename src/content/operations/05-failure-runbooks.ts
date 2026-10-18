import type { Section } from '../types'

// Plan §11.4 — controller and broker failure runbooks.
export const brokerRunbook: Section = {
  id: 'failure-runbooks',
  title: 'Failure runbooks',
  scene: 'broker-runbook',
  focus: 'steps',
  slide: `## Failure runbooks

A **runbook** turns an incident into steps, each with the **evidence** that proves it worked. It is written before the incident, not during it.

### Broker 2 stops responding
- **Detect**: the alert fires, and no partitions are offline
- **Assess**: which partitions lost a replica, from under-replicated partitions
- **Protect**: confirm writes are still accepted, with no partition under min ISR
- **Repair** and **confirm**: the broker rejoins, and its replicas catch up

### If a controller fails
- One of three: the quorum holds; **replace** it calmly
- Two of three: no metadata changes are possible, so treat it as **urgent**
- Rehearse each runbook in **staging**, and time every step
- Link each alert to its **runbook**, so the first responder starts in the right place`,
  narration:
    "A runbook turns an incident into a sequence of steps, and the important part is that every step names the evidence that proves it worked. It is written and rehearsed before the incident, because nobody designs a good procedure at three in the morning. Here is one for a broker that stops responding, on a cluster with replication factor three and min in-sync replicas two. Detect: the alert fires because broker two is no longer registered. The first number to check is offline partitions, which should be zero, because every partition still has two other replicas. Assess: under-replicated partitions shows which partitions lost a copy. Protect: check that writes are still being accepted, meaning no partition has fallen below min in-sync replicas. If any have, producers are being refused, and that changes the urgency. Repair: restart the broker, or replace it and reassign its partitions. Confirm: the broker rejoins, its replicas catch up, and under-replicated partitions returns to zero. Controller failures have their own runbook. Losing one of three is calm work. Losing two means no metadata changes at all, and is urgent.",
}
