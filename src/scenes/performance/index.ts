import type { Scene } from '@graphlearning/flow'
import { workloadModel } from './workload-model'
import { storageEstimate } from './storage-estimate'
import { partitionPlanning } from './partition-planning'
import { clientTradeoffs } from './client-tradeoffs'
import { brokerEvidence } from './broker-evidence'
import { lagLatency } from './lag-latency'
import { metricCharts } from './metric-charts'
import { hotPartitionLag } from './hot-partition-lag'
import { underReplicated } from './under-replicated'
import { controlledComparison } from './controlled-comparison'
import { recoveryThroughput } from './recovery-throughput'

// One bundle per course folder, spread into src/scenes/index.ts.
export const performanceScenes: Scene[] = [
  workloadModel,
  storageEstimate,
  partitionPlanning,
  clientTradeoffs,
  brokerEvidence,
  lagLatency,
  metricCharts,
  hotPartitionLag,
  underReplicated,
  controlledComparison,
  recoveryThroughput,
]
