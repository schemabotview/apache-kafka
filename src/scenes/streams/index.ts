import type { Scene } from '@graphlearning/flow'
import { salesTopology } from './sales-topology'
import { tasksThreads } from './tasks-threads'
import { streamTable } from './stream-table'
import { repartition } from './repartition'
import { stateStores } from './state-stores'
import { restoration } from './restoration'
import { windowsGrace } from './windows-grace'
import { joins } from './joins'
import { joinOutputs } from './join-outputs'
import { outputSemantics } from './output-semantics'
import { testingBoundaries } from './testing-boundaries'

// One bundle per course folder, spread into src/scenes/index.ts.
export const streamsScenes: Scene[] = [
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
]
