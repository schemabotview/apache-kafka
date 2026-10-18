import type { Course } from '../types'
import { pollLoop } from './01-poll-loop'
import { positions } from './02-positions-and-commits'
import { commitWindows } from './03-commit-crash-windows'
import { explicitCommit } from './04-explicit-commits'
import { groupAssignment } from './05-group-assignment'
import { rebalance } from './06-rebalances'
import { groupProtocols } from './07-group-protocols'
import { liveness } from './08-liveness'
import { boundedConcurrency } from './09-pause-and-concurrency'
import { startingOffsets } from './10-starting-offsets'
import { offsetReset } from './11-safe-offset-reset'

// Plan chapter 4 — Consumers, Offsets, and Parallel Work. Sections follow plan order; §4.3, §4.7 and §4.8 each take two.
export const consumers: Course = {
  id: 'consumers',
  title: 'Consumers, Offsets, and Parallel Work',
  sections: [
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
  ],
}
