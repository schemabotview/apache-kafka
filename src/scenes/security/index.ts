import type { Scene } from '@graphlearning/flow'
import { trustBoundaries } from './trust-boundaries'
import { listeners } from './listeners'
import { connectionTroubleshooting } from './connection-troubleshooting'
import { saslChoices } from './sasl-choices'
import { permissionMatrix } from './permission-matrix'
import { aclCommands } from './acl-commands'
import { authnAuthz } from './authn-authz'
import { internalTopicsAcls } from './internal-topics-acls'
import { quotasTenancy } from './quotas-tenancy'
import { sensitiveData } from './sensitive-data'
import { credentialRotation } from './credential-rotation'

// One bundle per course folder, spread into src/scenes/index.ts.
export const securityScenes: Scene[] = [
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
]
