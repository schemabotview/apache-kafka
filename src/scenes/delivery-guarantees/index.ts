import type { Scene } from '@graphlearning/flow'
import { deliverySemantics } from './delivery-semantics'
import { transactionsApi } from './transactions-api'
import { fencing } from './fencing'
import { isolation } from './isolation'
import { eosBoundary } from './eos-boundary'
import { paymentFailures } from './payment-failures'
import { dedupState } from './dedup-state'
import { dualWrite } from './dual-write'
import { outbox } from './outbox'
import { retryTopics } from './retry-topics'
import { replayCorrectness } from './replay-correctness'

// One bundle per course folder, spread into src/scenes/index.ts.
export const deliveryGuaranteesScenes: Scene[] = [
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
]
