import type { Scene } from '@graphlearning/flow'

// §5.6 — three controllers need a majority of two. What survives losing one, two or all of them,
// for metadata changes and for client traffic.
export const quorumLoss: Scene = {
  id: 'quorum-loss',
  title: 'Losing controllers',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Three controllers: a majority is two',
      sub: 'five controllers tolerate two failures',
      headers: ['Controllers up', 'Quorum', 'Metadata changes', 'Leader failover'],
      values: [
        ['3', 'yes', 'yes', 'yes'],
        ['2', 'yes', 'yes', 'yes'],
        ['1', 'no', 'none possible', 'none possible'],
        ['0', 'no', 'none possible', 'none possible'],
      ],
    },
    {
      id: 'without',
      label: 'Without a quorum',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w-serve', label: 'Leaders serve', sub: 'existing partitions, for now', pattern: 'service', icon: 'harddrive' },
        { id: 'w-frozen', label: 'Nothing changes', sub: 'no topics, no failover', pattern: 'warn', icon: 'snowflake' },
        { id: 'w-broker', label: 'A broker fails', sub: 'its partitions stay offline', pattern: 'warn', icon: 'skull' },
        { id: 'w-place', label: 'Separate hosts', sub: 'and failure zones', pattern: 'network', icon: 'building' },
      ],
    },
  ],
  edges: [{ source: 'table', target: 'without', label: 'below a majority' }],
}
