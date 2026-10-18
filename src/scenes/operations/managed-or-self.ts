import type { Scene } from '@graphlearning/flow'

// §11.7 — the same responsibilities, split differently. Managed Kafka removes the broker work;
// it never removes the data design.
export const managedOrSelf: Scene = {
  id: 'managed-or-self',
  title: 'Self-managed or managed Kafka',
  flow: 'TB',
  nodes: [
    {
      id: 'split',
      kind: 'table',
      label: 'Who does what',
      sub: 'typical split; read each provider’s terms',
      headers: ['Responsibility', 'Self-managed', 'Managed service'],
      values: [
        ['hardware, OS, brokers', 'you', 'provider'],
        ['upgrades and patching', 'you', 'provider, on its schedule'],
        ['capacity and scaling', 'you', 'shared: you choose a size'],
        ['topics, keys, schemas', 'you', 'you'],
        ['ACLs and data protection', 'you', 'you'],
        ['consumer correctness', 'you', 'you'],
      ],
    },
    {
      id: 'weigh',
      label: 'Weigh as well',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'w-cost', label: 'Cost', sub: 'fees against staff time', pattern: 'storage', icon: 'receipt' },
        { id: 'w-port', label: 'Portability', sub: 'provider-only features', pattern: 'warn', icon: 'swap' },
        { id: 'w-limits', label: 'Limits', sub: 'versions, configs allowed', pattern: 'warn', icon: 'ruler' },
      ],
    },
  ],
  edges: [{ source: 'split', target: 'weigh', label: 'and' }],
}
