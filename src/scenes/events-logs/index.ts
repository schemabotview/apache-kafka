import type { Scene } from '@graphlearning/flow'
import { eventCommandState } from './event-command-state'
import { syncVsLog } from './sync-vs-log'
import { integrationStyles } from './integration-styles'
import { retainedLog } from './retained-log'
import { recordAnatomy } from './record-anatomy'
import { topicPartitions } from './topic-partitions'
import { clusterRoles } from './cluster-roles'
import { quickstartCommands } from './quickstart-commands'
import { firstPublishRead } from './first-publish-read'
import { readerResumes } from './reader-resumes'
import { localLimits } from './local-limits'

// One bundle per course folder, spread into src/scenes/index.ts.
export const eventsLogsScenes: Scene[] = [
  eventCommandState,
  syncVsLog,
  integrationStyles,
  retainedLog,
  recordAnatomy,
  topicPartitions,
  clusterRoles,
  quickstartCommands,
  firstPublishRead,
  readerResumes,
  localLimits,
]
