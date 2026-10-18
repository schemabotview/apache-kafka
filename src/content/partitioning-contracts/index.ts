import type { Course } from '../types'
import { topicBoundaries } from './01-topic-boundaries'
import { topicOwnership } from './02-topic-ownership-naming'
import { keyChoices } from './03-choosing-keys'
import { hotPartition } from './04-hot-keys'
import { eventTime } from './05-order-and-event-time'
import { addingPartitions } from './06-adding-partitions'
import { serialization } from './07-serialization'
import { compatibilityModes } from './08-compatibility'
import { evolutionCases } from './09-evolution-cases'
import { schemaRegistry } from './10-schema-registry'
import { eventContract } from './11-event-contract'

// Plan chapter 2 — Partitioning, Ordering, and Event Contracts. Sections follow plan order; §2.1, §2.2 and §2.6 each take two.
export const partitioningContracts: Course = {
  id: 'partitioning-contracts',
  title: 'Partitioning, Ordering, and Event Contracts',
  sections: [
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
  ],
}
