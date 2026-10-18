import type { Scene } from '@graphlearning/flow'
import { eventsLogsScenes } from './events-logs'
import { partitioningContractsScenes } from './partitioning-contracts'
import { producersScenes } from './producers'
import { consumersScenes } from './consumers'
import { storageReplicationScenes } from './storage-replication'
import { deliveryGuaranteesScenes } from './delivery-guarantees'
import { connectScenes } from './connect'
import { streamsScenes } from './streams'
import { securityScenes } from './security'
import { performanceScenes } from './performance'
import { operationsScenes } from './operations'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...eventsLogsScenes, ...partitioningContractsScenes, ...producersScenes, ...consumersScenes, ...storageReplicationScenes, ...deliveryGuaranteesScenes, ...connectScenes, ...streamsScenes, ...securityScenes, ...performanceScenes, ...operationsScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
