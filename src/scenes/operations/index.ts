import type { Scene } from '@graphlearning/flow'
import { topicAdmin } from './topic-admin'
import { reassignment } from './reassignment'
import { reassignmentLimits } from './reassignment-limits'
import { rollingUpgrade } from './rolling-upgrade'
import { brokerRunbook } from './broker-runbook'
import { recoveryEvidence } from './recovery-evidence'
import { mirroring } from './mirroring'
import { failoverReconciliation } from './failover-reconciliation'
import { rpoRto } from './rpo-rto'
import { managedOrSelf } from './managed-or-self'
import { orderArchitecture } from './order-architecture'
import { architectureReview } from './architecture-review'

// One bundle per course folder, spread into src/scenes/index.ts.
export const operationsScenes: Scene[] = [
  topicAdmin,
  reassignment,
  reassignmentLimits,
  rollingUpgrade,
  brokerRunbook,
  recoveryEvidence,
  mirroring,
  failoverReconciliation,
  rpoRto,
  managedOrSelf,
  orderArchitecture,
  architectureReview,
]
