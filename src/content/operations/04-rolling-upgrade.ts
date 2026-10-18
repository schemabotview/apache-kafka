import type { Section } from '../types'

// Plan §11.3 — rolling maintenance, client compatibility, and version-specific upgrade checks.
export const rollingUpgrade: Section = {
  id: 'rolling-upgrade',
  title: 'A rolling upgrade',
  scene: 'rolling-upgrade',
  focus: 'steps',
  slide: `## A rolling upgrade

Kafka upgrades **one broker at a time**, so the cluster keeps serving throughout. The final step, finalizing the metadata version, is **one-way**.

### The sequence
- Read the **release notes** for every version you cross
- Upgrade each broker in turn, and wait for **no under-replicated partitions** before the next
- Verify behaviour and performance on the new binaries
- Then run **kafka-features upgrade**: metadata downgrade is not supported after it

### Version-specific checks for 4.1
- Clients, Streams and Connect must be **2.1 or newer**
- Streams **4.1.0** has a known memory leak; the notes advise **4.1.1**
- ZooKeeper is gone in 4.x: a cluster must already run **KRaft** to upgrade
- Upgrade a **staging** cluster first, with production-like traffic`,
  narration:
    "Kafka is designed to be upgraded without downtime, by rolling through the brokers one at a time, and the upgrade notes for four point one give the sequence. Start by reading the release notes for every version you are crossing, not just the target. Then upgrade the brokers one at a time: stop one, update its software, restart it, and wait until there are no under-replicated partitions before moving to the next. Waiting is what keeps every partition fully replicated while each broker is briefly away. Once every broker runs the new version, check that the cluster's behaviour and performance are as expected. Only then run the final step, kafka features upgrade, which moves the cluster's metadata version forward. That step is one-way: the notes are explicit that metadata downgrade is not supported after it. Two checks are specific to this baseline. Kafka four removed old protocol versions, so clients, including Streams and Connect, must be on two point one or newer. And the four point one point oh release notes warn of a serious memory leak in Kafka Streams, advising four point one point one instead. That is exactly why reading release notes comes first.",
}
