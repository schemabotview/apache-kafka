import type { Scene } from '@graphlearning/flow'

// §9.5 — Connect and Streams create their own topics and groups. Prefixed ACLs on their known name
// patterns grant exactly that, instead of cluster-wide Create.
export const internalTopicsAcls: Scene = {
  id: 'internal-topics-acls',
  title: 'Least privilege for internal topics',
  flow: 'TB',
  nodes: [
    {
      id: 'needs',
      kind: 'table',
      label: 'Prefixed ACLs for framework-managed names',
      sub: 'prefix patterns, not wildcards',
      headers: ['Principal', 'Prefix', 'Covers'],
      values: [
        ['svc-sales-totals', 'topic sales-totals-', 'repartition and changelog topics'],
        ['svc-sales-totals', 'group sales-totals', 'the application.id group'],
        ['svc-connect', 'topic connect-', 'configs, offsets, status topics'],
        ['svc-connect', 'group connect-', 'worker group and sink groups'],
      ],
    },
    {
      id: 'avoid',
      label: 'Instead of',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'x-cluster', label: 'Cluster Create', sub: 'can create any topic', pattern: 'warn', icon: 'ban' },
        { id: 'x-star', label: "Topic '*'", sub: 'can read every topic', pattern: 'warn', icon: 'ban' },
        { id: 'x-shared', label: 'Shared principal', sub: 'one leak opens all', pattern: 'warn', icon: 'users' },
        { id: 'x-connectors', label: 'Per connector', sub: 'separate principals if possible', pattern: 'service', icon: 'fingerprint' },
      ],
    },
  ],
  edges: [{ source: 'needs', target: 'avoid', label: 'rather than' }],
}
