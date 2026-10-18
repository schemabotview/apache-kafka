import type { Section } from '../types'

// Plan §11.5 — cross-cluster mirroring and offset translation.
export const mirroring: Section = {
  id: 'cross-cluster-mirroring',
  title: 'Mirroring between clusters',
  scene: 'mirroring',
  focus: 'mm2',
  slide: `## Mirroring between clusters

**MirrorMaker 2** copies topics from one cluster to another, using Kafka Connect connectors. Copying is **asynchronous**, so the target is always a little behind.

### What it copies
- Records, into a **renamed** remote topic: orders becomes **eu-west.orders**
- Consumer group **offsets**, translated through checkpoints
- Topic configuration and ACLs, depending on its settings

### What to expect
- The target lags by the **replication delay**, here about 20 seconds
- Translated offsets are only as recent as the **last checkpoint**
- The rename keeps two regions' orders apart, so consumers subscribe to **both** names
- Mirroring two ways needs that rename, or records would **loop** between clusters`,
  narration:
    "For surviving the loss of a whole region, or a whole cluster, Kafka offers MirrorMaker two. It runs as a set of Kafka Connect connectors that read from one cluster and write to another. Here it copies the orders topic from the eu west cluster to the us east cluster. Three details shape every design built on it. First, records land in a renamed remote topic. With the default replication policy, orders from eu west becomes eu west dot orders in the target. That rename keeps the two regions' orders apart, so a consumer that wants both has to subscribe to both names. Second, consumer group offsets are copied too, but they cannot be copied directly, because the same record has different offsets in the two clusters. A checkpoint connector translates them periodically, so translated offsets are only as recent as the last checkpoint. Third, and most important, copying is asynchronous. The target is always behind the source, here by about twenty seconds. Nothing waits for the copy, so producers in eu west are never slowed down by it. That is the strength of mirroring, and, as the next section shows, its cost.",
}
