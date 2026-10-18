import type { Scene } from '@graphlearning/flow'
import { pollLoop } from './poll-loop'
import { positions } from './positions'
import { commitWindows } from './commit-windows'
import { explicitCommit } from './explicit-commit'
import { groupAssignment } from './group-assignment'
import { rebalance } from './rebalance'
import { groupProtocols } from './group-protocols'
import { liveness } from './liveness'
import { boundedConcurrency } from './bounded-concurrency'
import { startingOffsets } from './starting-offsets'
import { offsetReset } from './offset-reset'

// One bundle per course folder, spread into src/scenes/index.ts.
export const consumersScenes: Scene[] = [
  pollLoop,
  positions,
  commitWindows,
  explicitCommit,
  groupAssignment,
  rebalance,
  groupProtocols,
  liveness,
  boundedConcurrency,
  startingOffsets,
  offsetReset,
]
