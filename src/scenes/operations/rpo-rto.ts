import type { Scene } from '@graphlearning/flow'

// §11.6 — recovery objectives turned into numbers, and checked against what the design can
// actually deliver, including the gaps retention and mirroring leave.
export const rpoRto: Scene = {
  id: 'rpo-rto',
  title: 'Recovery objectives',
  flow: 'TB',
  nodes: [
    {
      id: 'objectives',
      kind: 'table',
      label: 'Orders platform: objectives against the design',
      sub: 'assumptions stated; rehearsed twice a year',
      headers: ['Scenario', 'Objective', 'Design delivers'],
      values: [
        ['one broker lost', 'RPO 0, RTO 1 min', 'RF 3, min ISR 2: met'],
        ['one zone lost', 'RPO 0, RTO 5 min', 'replicas across 3 zones: met'],
        ['region lost', 'RPO 1 min, RTO 30 min', 'MM2 lag ~20 s, manual failover'],
        ['bad data written', 'RPO 0, RTO 4 h', 'replay within 7-day retention'],
      ],
    },
    {
      id: 'gaps',
      label: 'Gaps to plan for',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'g-retention', label: 'Retention', sub: 'no replay past 7 days', pattern: 'warn', icon: 'calendar' },
        { id: 'g-backup', label: 'No backups', sub: 'replicas copy mistakes too', pattern: 'warn', icon: 'copy' },
        { id: 'g-sinks', label: 'Sinks', sub: 'restore the database too', pattern: 'warn', icon: 'database' },
        { id: 'g-test', label: 'Untested', sub: 'a plan never rehearsed', pattern: 'warn', icon: 'skull' },
      ],
    },
  ],
  edges: [{ source: 'objectives', target: 'gaps', label: 'and' }],
}
