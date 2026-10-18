import type { Course } from '../types'
import { salesTopology } from './01-streams-library'
import { tasksThreads } from './02-tasks-and-threads'
import { streamTable } from './03-stream-table-duality'
import { repartition } from './04-repartitioning'
import { stateStores } from './05-state-stores'
import { restoration } from './06-state-restoration'
import { windowsGrace } from './07-windows-and-grace'
import { joins } from './08-joins'
import { joinOutputs } from './09-join-outputs'
import { outputSemantics } from './10-output-semantics'
import { testingBoundaries } from './11-testing-and-boundaries'

// Plan chapter 8 — Kafka Streams and Stateful Computation. Sections follow plan order; §8.1, §8.4 and §8.6 each take two.
export const streams: Course = {
  id: 'streams',
  title: 'Kafka Streams and Stateful Computation',
  sections: [
    salesTopology,
    tasksThreads,
    streamTable,
    repartition,
    stateStores,
    restoration,
    windowsGrace,
    joins,
    joinOutputs,
    outputSemantics,
    testingBoundaries,
  ],
}
