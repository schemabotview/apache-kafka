import type { Scene } from '@graphlearning/flow'

// §10.7 — lag broken down per partition shows a skew that the group total hides. Adding consumers
// cannot help: partition 1 can only ever have one reader in the group.
export const hotPartitionLag: Scene = {
  id: 'hot-partition-lag',
  title: 'A skew more consumers cannot fix',
  flow: 'TB',
  nodes: [
    {
      id: 'lag',
      kind: 'table',
      label: 'kafka-consumer-groups --describe, group fulfilment',
      sub: 'total lag 48 210: almost all on one partition',
      headers: ['Partition', 'Current offset', 'Log end', 'Lag'],
      values: [
        ['0', '1 204 551', '1 204 560', '9'],
        ['1', '3 880 102', '3 928 290', '48 188'],
        ['2', '1 198 774', '1 198 787', '13'],
      ],
    },
    {
      id: 'options',
      label: 'What helps, and what does not',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-members', label: 'More members', sub: 'no: one reader per partition', pattern: 'warn', icon: 'ban' },
        { id: 'o-faster', label: 'Faster handler', sub: 'yes, for that partition', pattern: 'service', icon: 'zap' },
        { id: 'o-key', label: 'Better key', sub: 'yes, long-term', pattern: 'service', icon: 'key' },
        { id: 'o-find', label: 'Find the key', sub: 'sample partition 1', pattern: 'network', icon: 'search' },
      ],
    },
  ],
  edges: [{ source: 'lag', target: 'options', label: 'so' }],
}
