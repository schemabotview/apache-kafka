import type { Course } from '../types'
import { trustBoundaries } from './01-identities-and-boundaries'
import { listeners } from './02-listeners-and-addresses'
import { connectionTroubleshooting } from './03-connection-troubleshooting'
import { saslChoices } from './04-sasl-mechanisms'
import { permissionMatrix } from './05-permission-matrix'
import { aclCommands } from './06-granting-acls'
import { authnAuthz } from './07-which-layer-failed'
import { internalTopicsAcls } from './08-internal-topic-acls'
import { quotasTenancy } from './09-quotas-and-ownership'
import { sensitiveData } from './10-sensitive-data'
import { credentialRotation } from './11-credential-rotation'

// Plan chapter 9 — Security and Shared-Platform Governance. Sections follow plan order; §9.2, §9.4 and §9.7 each take two. Names and secrets are synthetic.
export const security: Course = {
  id: 'security',
  title: 'Security and Shared-Platform Governance',
  sections: [
    trustBoundaries,
    listeners,
    connectionTroubleshooting,
    saslChoices,
    permissionMatrix,
    aclCommands,
    authnAuthz,
    internalTopicsAcls,
    quotasTenancy,
    sensitiveData,
    credentialRotation,
  ],
}
