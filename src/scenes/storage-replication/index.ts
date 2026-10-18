import type { Scene } from '@graphlearning/flow'
import { logSegments } from './log-segments'
import { replicasIsr } from './replicas-isr'
import { failureMatrix } from './failure-matrix'
import { minIsrOne } from './min-isr-one'
import { highWatermark } from './high-watermark'
import { leaderElection } from './leader-election'
import { availabilityLoss } from './availability-loss'
import { kraftPlanes } from './kraft-planes'
import { quorumLoss } from './quorum-loss'
import { retention } from './retention'
import { compaction } from './compaction'
import { compactionTiming } from './compaction-timing'

// One bundle per course folder, spread into src/scenes/index.ts.
export const storageReplicationScenes: Scene[] = [
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
]
