import type { Scene } from '@graphlearning/flow'

// §10.8 — headroom decides how fast a consumer catches up after an outage. Backlog = rate × outage;
// catch-up time = backlog ÷ (capacity − incoming rate).
export const recoveryThroughput: Scene = {
  id: 'recovery-throughput',
  title: 'Headroom and recovery time',
  flow: 'TB',
  nodes: [
    {
      id: 'calc',
      kind: 'table',
      label: 'Fulfilment is down for 1 hour at 200 records/s',
      sub: 'catch-up = backlog ÷ (capacity − incoming)',
      headers: ['Group capacity', 'Spare', 'Catch-up time'],
      values: [
        ['1 000 records/s', '800 records/s', '720 000 ÷ 800 = 15 min'],
        ['400 records/s', '200 records/s', '720 000 ÷ 200 = 60 min'],
        ['250 records/s', '50 records/s', '720 000 ÷ 50 = 4 hours'],
        ['200 records/s', '0', 'never catches up'],
      ],
    },
    {
      id: 'lessons',
      label: 'So plan for',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'l-headroom', label: 'Spare capacity', sub: 'not just enough', pattern: 'service', icon: 'gauge' },
        { id: 'l-retention', label: 'Retention', sub: 'longer than any catch-up', pattern: 'storage', icon: 'history' },
        { id: 'l-peak', label: 'Peaks', sub: 'an outage on a sale day', pattern: 'warn', icon: 'calendar' },
      ],
    },
  ],
  edges: [{ source: 'calc', target: 'lessons', label: 'so' }],
}
