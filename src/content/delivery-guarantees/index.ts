import type { Course } from '../types'
import { deliverySemantics } from './01-delivery-semantics'
import { transactionsApi } from './02-kafka-transactions'
import { fencing } from './03-zombie-fencing'
import { isolation } from './04-consumer-isolation'
import { eosBoundary } from './05-exactly-once-boundary'
import { paymentFailures } from './06-external-idempotency'
import { dedupState } from './07-deduplication-state'
import { dualWrite } from './08-dual-write'
import { outbox } from './09-transactional-outbox'
import { retryTopics } from './10-poison-records'
import { replayCorrectness } from './11-replay-correctness'

// Plan chapter 6 — Delivery Guarantees and Reliable Processing. Sections follow plan order; §6.2, §6.5 and §6.6 each take two.
export const deliveryGuarantees: Course = {
  id: 'delivery-guarantees',
  title: 'Delivery Guarantees and Reliable Processing',
  sections: [
    deliverySemantics,
    transactionsApi,
    fencing,
    isolation,
    eosBoundary,
    paymentFailures,
    dedupState,
    dualWrite,
    outbox,
    retryTopics,
    replayCorrectness,
  ],
}
