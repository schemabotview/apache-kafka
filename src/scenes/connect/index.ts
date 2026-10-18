import type { Scene } from '@graphlearning/flow'
import { connectRoles } from './connect-roles'
import { distributedMode } from './distributed-mode'
import { connectorConfig } from './connector-config'
import { connectOffsets } from './connect-offsets'
import { restLifecycle } from './rest-lifecycle'
import { transforms } from './transforms'
import { errorTolerance } from './error-tolerance'
import { cdcSnapshot } from './cdc-snapshot'
import { sinkRepeat } from './sink-repeat'
import { connectOrCustom } from './connect-or-custom'

// One bundle per course folder, spread into src/scenes/index.ts.
export const connectScenes: Scene[] = [
  connectRoles,
  distributedMode,
  connectorConfig,
  connectOffsets,
  restLifecycle,
  transforms,
  errorTolerance,
  cdcSnapshot,
  sinkRepeat,
  connectOrCustom,
]
