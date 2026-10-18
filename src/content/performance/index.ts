import type { Course } from '../types'
import { workloadModel } from './01-workload-model'
import { storageEstimate } from './02-storage-estimate'
import { partitionPlanning } from './03-partition-planning'
import { clientTradeoffs } from './04-client-tradeoffs'
import { brokerEvidence } from './05-broker-evidence'
import { lagLatency } from './06-lag-latency-freshness'
import { metricCharts } from './07-slow-consumer-or-broker'
import { hotPartitionLag } from './08-hot-partition-diagnosis'
import { underReplicated } from './09-under-replicated-partitions'
import { controlledComparison } from './10-controlled-comparisons'
import { recoveryThroughput } from './11-headroom-and-recovery'

// Plan chapter 10 — Performance, Capacity, and Diagnosis. Sections follow plan order; §10.7 and §10.8 each take two or three. Metrics in the charts are supplied examples.
export const performance: Course = {
  id: 'performance',
  title: 'Performance, Capacity, and Diagnosis',
  sections: [
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
  ],
}
