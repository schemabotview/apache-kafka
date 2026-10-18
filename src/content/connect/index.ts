import type { Course } from '../types'
import { connectRoles } from './01-connect-roles'
import { distributedMode } from './02-distributed-workers'
import { connectorConfig } from './03-connector-configuration'
import { connectOffsets } from './04-connect-offsets'
import { restLifecycle } from './05-rest-lifecycle'
import { transforms } from './06-single-message-transforms'
import { errorTolerance } from './07-error-tolerance'
import { cdcSnapshot } from './08-cdc-snapshot-stream'
import { sinkRepeat } from './09-connector-guarantees'
import { connectOrCustom } from './10-connect-or-custom'

// Plan chapter 7 — Kafka Connect and Data Integration. Sections follow plan order; §7.1 and §7.5 each take two.
export const connect: Course = {
  id: 'connect',
  title: 'Kafka Connect and Data Integration',
  sections: [
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
  ],
}
