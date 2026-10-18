import type { Course } from '../types'
import { producerLifecycle } from './01-producer-lifecycle'
import { metadataDiscovery } from './02-metadata-discovery'
import { asyncSend } from './03-async-send'
import { whereErrorsSurface } from './04-publish-errors'
import { batching } from './05-batching'
import { throughputLatency } from './06-throughput-latency'
import { acksLevels } from './07-acks'
import { lostAck } from './08-lost-acknowledgement'
import { retryReorder } from './09-retry-reordering'
import { idempotentProducer } from './10-idempotent-producer'
import { businessDuplicates } from './11-business-duplicates'

// Plan chapter 3 — Producers and Publish Outcomes. Sections follow plan order; §3.1, §3.2, §3.3 and §3.5 each take two.
export const producers: Course = {
  id: 'producers',
  title: 'Producers and Publish Outcomes',
  sections: [
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
  ],
}
