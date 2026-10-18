import { eventsLogs } from './events-logs'
import { partitioningContracts } from './partitioning-contracts'
import { producers } from './producers'
import { consumers } from './consumers'
import { storageReplication } from './storage-replication'
import { deliveryGuarantees } from './delivery-guarantees'
import { connect } from './connect'
import type { Course, Section } from './types'

// Course registry, in syllabus order — one course per chapter of APACHE-KAFKA-COURSE-PLAN.md.
// Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [eventsLogs.id]: eventsLogs,
  [partitioningContracts.id]: partitioningContracts,
  [producers.id]: producers,
  [consumers.id]: consumers,
  [storageReplication.id]: storageReplication,
  [deliveryGuarantees.id]: deliveryGuarantees,
  [connect.id]: connect,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
