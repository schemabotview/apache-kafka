import type { Course } from '../types'
import { logSegments } from './01-log-segments'
import { replicasIsr } from './02-leaders-followers-isr'
import { failureMatrix } from './03-durability-settings'
import { minIsrOne } from './04-min-isr-default'
import { highWatermark } from './05-high-watermark'
import { leaderElection } from './06-leader-election'
import { availabilityLoss } from './07-availability-or-data'
import { kraftPlanes } from './08-kraft-controllers'
import { quorumLoss } from './09-quorum-loss'
import { retention } from './10-retention-and-replay'
import { compaction } from './11-log-compaction'
import { compactionTiming } from './12-compaction-timing'

// Plan chapter 5 — Storage, Replication, and KRaft. Sections follow plan order; §5.3, §5.5, §5.6 and §5.8 each take two.
export const storageReplication: Course = {
  id: 'storage-replication',
  title: 'Storage, Replication, and KRaft',
  sections: [
    logSegments,
    replicasIsr,
    failureMatrix,
    minIsrOne,
    highWatermark,
    leaderElection,
    availabilityLoss,
    kraftPlanes,
    quorumLoss,
    retention,
    compaction,
    compactionTiming,
  ],
}
