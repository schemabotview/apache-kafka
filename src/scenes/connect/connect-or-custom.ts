import type { Scene } from '@graphlearning/flow'

// §7.8 — choosing between Kafka Connect, a custom client application, a batch job, or a managed
// integration service, by the shape of the work.
export const connectOrCustom: Scene = {
  id: 'connect-or-custom',
  title: 'Connect or custom code',
  flow: 'TB',
  nodes: [
    {
      id: 'choice',
      kind: 'table',
      label: 'Which tool for which job',
      sub: 'start from the shape of the work',
      headers: ['Job', 'Usually best', 'Because'],
      values: [
        ['copy a table into Kafka', 'Connect source', 'a tested connector exists'],
        ['load a topic into a warehouse', 'Connect sink', 'upserts, retries, scaling'],
        ['apply business rules', 'custom consumer', 'logic belongs in code'],
        ['nightly bulk export', 'batch job', 'no need to stream'],
        ['vendor SaaS to SaaS', 'managed integration', 'someone else runs it'],
      ],
    },
    {
      id: 'costs',
      label: 'Connect still costs',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'k-run', label: 'A cluster', sub: 'workers to run and watch', pattern: 'warn', icon: 'server' },
        { id: 'k-plugins', label: 'Plugins', sub: 'versions on every worker', pattern: 'warn', icon: 'package' },
        { id: 'k-limits', label: 'Its limits', sub: 'one record at a time', pattern: 'warn', icon: 'ruler' },
      ],
    },
  ],
  edges: [{ source: 'choice', target: 'costs', label: 'but' }],
}
