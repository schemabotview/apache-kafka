import type { Course } from '../types'
import { eventsCommandsState } from './01-events-commands-state'
import { whyAsynchronous } from './02-why-asynchronous'
import { integrationStyles } from './03-integration-styles'
import { retainedLog } from './04-reading-does-not-delete'
import { recordAnatomy } from './05-record-anatomy'
import { topicPartitions } from './06-topics-partitions-offsets'
import { clusterRoles } from './07-brokers-producers-consumers'
import { quickstartCommands } from './08-local-kraft-quickstart'
import { firstPublishRead } from './09-publish-and-read'
import { readerResumes } from './10-groups-resume'
import { localLimits } from './11-local-limits'

// Plan chapter 1 — Events, Logs, and a First Kafka Pipeline. Sections follow plan order; §1.1,
// §1.2, §1.3 and §1.5 each take two or three sections.
export const eventsLogs: Course = {
  id: 'events-logs',
  title: 'Events, Logs, and a First Kafka Pipeline',
  sections: [
    eventsCommandsState,
    whyAsynchronous,
    integrationStyles,
    retainedLog,
    recordAnatomy,
    topicPartitions,
    clusterRoles,
    quickstartCommands,
    firstPublishRead,
    readerResumes,
    localLimits,
  ],
}
