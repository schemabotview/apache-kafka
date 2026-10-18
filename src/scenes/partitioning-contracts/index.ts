import type { Scene } from '@graphlearning/flow'
import { topicBoundaries } from './topic-boundaries'
import { topicOwnership } from './topic-ownership'
import { keyChoices } from './key-choices'
import { hotPartition } from './hot-partition'
import { eventTime } from './event-time'
import { addingPartitions } from './adding-partitions'
import { serialization } from './serialization'
import { compatibilityModes } from './compatibility-modes'
import { evolutionCases } from './evolution-cases'
import { schemaRegistry } from './schema-registry'
import { eventContract } from './event-contract'

// One bundle per course folder, spread into src/scenes/index.ts.
export const partitioningContractsScenes: Scene[] = [
  topicBoundaries,
  topicOwnership,
  keyChoices,
  hotPartition,
  eventTime,
  addingPartitions,
  serialization,
  compatibilityModes,
  evolutionCases,
  schemaRegistry,
  eventContract,
]
