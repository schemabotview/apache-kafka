import type { Section } from '../types'

// Plan §5.6 — controller quorum loss and its effect on the data plane.
export const quorumLoss: Section = {
  id: 'quorum-loss',
  title: 'Losing the controller quorum',
  scene: 'quorum-loss',
  focus: 'table',
  slide: `## Losing the controller quorum

The controllers need a **majority** to make any decision. Three controllers tolerate **one** failure; five tolerate **two**.

### Without a majority
- **No metadata changes** are possible: no new topics, no config changes
- **No leader elections**, so a broker failure leaves its partitions offline
- Existing leaders may keep serving clients, but nothing can **adapt**
- Restoring a majority, not restarting brokers, is the **first** recovery step

### Designing for it
- Run controllers on **separate hosts**, ideally in separate failure zones
- Prefer an **odd** number: four tolerates no more failures than three
- Back up and protect controller storage: its metadata log **is** the cluster`,
  narration:
    "The controller quorum works by majority. A change is only final once more than half of the controllers have it, so the quorum can only make decisions while a majority is alive. With three controllers, a majority is two, so the cluster tolerates one controller failure. With five, it tolerates two. Losing a majority does not immediately stop all traffic, but it freezes the cluster. No metadata change of any kind is possible. No topic can be created, no configuration changed. More seriously, no leader can be elected. Existing leaders may keep serving producers and consumers for the moment, but the first broker failure leaves every partition it led offline, because nothing can choose replacements. So the design follows directly. Place controllers on separate hosts, ideally in separate racks or zones, so one failure cannot take out a majority. Use an odd number, because four controllers need three for a majority, and so tolerate only one failure, the same as three. And protect controller storage carefully. The metadata log is the definitive record of the cluster's structure.",
}
