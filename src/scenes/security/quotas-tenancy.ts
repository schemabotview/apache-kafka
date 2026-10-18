import type { Scene } from '@graphlearning/flow'

// §9.6 — a shared cluster needs limits and ownership. Quotas stop one client starving the rest;
// ownership and review stop one team changing what another depends on.
export const quotasTenancy: Scene = {
  id: 'quotas-tenancy',
  title: 'Quotas, ownership and change review',
  flow: 'TB',
  nodes: [
    {
      id: 'quota',
      kind: 'code',
      filename: 'terminal — a quota for one principal',
      label: `$ bin/kafka-configs.sh --bootstrap-server kafka-1:9092 \\
    --alter --entity-type users --entity-name svc-analytics \\
    --add-config \\
    'producer_byte_rate=10485760,consumer_byte_rate=20971520'
# 10 MiB/s in, 20 MiB/s out, per broker`,
    },
    {
      id: 'controls',
      label: 'Controls on a shared cluster',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-quota', label: 'Byte-rate quotas', sub: 'over it: throttled, not failed', pattern: 'service', icon: 'gauge' },
        { id: 'c-request', label: 'Request quota', sub: 'request_percentage of threads', pattern: 'service', icon: 'cpu' },
        { id: 'c-owner', label: 'Topic owners', sub: 'one team per topic', pattern: 'user', icon: 'users' },
        { id: 'c-review', label: 'Reviewed changes', sub: 'config as code', pattern: 'storage', icon: 'gitbranch' },
      ],
    },
  ],
  edges: [{ source: 'quota', target: 'controls', label: 'one of' }],
}
