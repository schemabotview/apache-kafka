import type { Course } from '../types'
import { topicAdmin } from './01-administration-safeguards'
import { reassignment } from './02-partition-reassignment'
import { reassignmentLimits } from './03-reassignment-limits'
import { rollingUpgrade } from './04-rolling-upgrade'
import { brokerRunbook } from './05-failure-runbooks'
import { recoveryEvidence } from './06-recovery-evidence'
import { mirroring } from './07-cross-cluster-mirroring'
import { failoverReconciliation } from './08-failover-reconciliation'
import { rpoRto } from './09-recovery-objectives'
import { managedOrSelf } from './10-managed-or-self-managed'
import { orderArchitecture } from './11-order-architecture'
import { architectureReview } from './12-architecture-review'

// Plan chapter 11 — Operations, Recovery, and System Evolution. Sections follow plan order; §11.2, §11.4, §11.5 and §11.8 each take two.
export const operations: Course = {
  id: 'operations',
  title: 'Operations, Recovery, and System Evolution',
  sections: [
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
  ],
}
