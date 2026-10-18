import type { Scene } from '@graphlearning/flow'
import { producerLifecycle } from './producer-lifecycle'
import { metadataDiscovery } from './metadata-discovery'
import { asyncSend } from './async-send'
import { whereErrorsSurface } from './where-errors-surface'
import { batching } from './batching'
import { throughputLatency } from './throughput-latency'
import { acksLevels } from './acks-levels'
import { lostAck } from './lost-ack'
import { retryReorder } from './retry-reorder'
import { idempotentProducer } from './idempotent-producer'
import { businessDuplicates } from './business-duplicates'

// One bundle per course folder, spread into src/scenes/index.ts.
export const producersScenes: Scene[] = [
  producerLifecycle,
  metadataDiscovery,
  asyncSend,
  whereErrorsSurface,
  batching,
  throughputLatency,
  acksLevels,
  lostAck,
  retryReorder,
  idempotentProducer,
  businessDuplicates,
]
