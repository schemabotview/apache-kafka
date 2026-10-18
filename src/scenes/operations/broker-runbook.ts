import type { Scene } from '@graphlearning/flow'

// §11.4 — a runbook for one broker failing, written as steps with the evidence each step needs.
// Recovery is declared on service evidence, not on the broker process being up.
export const brokerRunbook: Scene = {
  id: 'broker-runbook',
  title: 'A broker failure runbook',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      kind: 'table',
      label: 'Runbook: broker 2 stops responding',
      sub: 'RF 3, min.insync.replicas 2',
      headers: ['Step', 'Do', 'Evidence'],
      values: [
        ['detect', 'alert: broker 2 unregistered', 'OfflinePartitionsCount = 0?'],
        ['assess', 'which partitions lost a replica', 'UnderReplicatedPartitions'],
        ['protect', 'check writes still accepted', 'UnderMinIsrPartitionCount = 0'],
        ['repair', 'restart, or replace and reassign', 'broker 2 rejoins, catches up'],
        ['confirm', 'replicas back in sync', 'under-replicated back to 0'],
      ],
    },
    {
      id: 'controller',
      label: 'If a controller fails instead',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-one', label: 'One of three', sub: 'quorum holds: replace it', pattern: 'service', icon: 'brain' },
        { id: 'c-two', label: 'Two of three', sub: 'no metadata changes: urgent', pattern: 'warn', icon: 'skull' },
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'controller', label: 'similarly' }],
}
