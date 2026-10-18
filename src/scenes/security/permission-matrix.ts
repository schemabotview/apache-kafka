import type { Scene } from '@graphlearning/flow'

// §9.4 — a least-privilege permission matrix for the course's services. Each principal gets exactly
// the operations its code performs; nothing else, and no wildcard topics.
export const permissionMatrix: Scene = {
  id: 'permission-matrix',
  title: 'A permission matrix',
  flow: 'TB',
  nodes: [
    {
      id: 'matrix',
      kind: 'table',
      label: 'Who may do what — StandardAuthorizer, default deny',
      sub: 'resource type : name → operations',
      headers: ['Principal', 'Topic', 'Group', 'Transactional id'],
      values: [
        ['svc-checkout', 'orders: Write', '—', '—'],
        ['svc-fulfilment', 'orders: Read', 'fulfilment: Read', '—'],
        ['svc-pricer', 'orders: Read; priced-orders: Write', 'order-pricer: Read', 'order-pricer-*: Write'],
        ['svc-analytics', 'orders: Read', 'analytics: Read', '—'],
      ],
    },
    {
      id: 'notes',
      label: 'Rules behind it',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'n-deny', label: 'Default deny', sub: 'no ACL: no access', pattern: 'warn', icon: 'ban' },
        { id: 'n-describe', label: 'Describe', sub: 'implied by Read and Write', pattern: 'service', icon: 'search' },
        { id: 'n-super', label: 'Super users', sub: 'few, and audited', pattern: 'warn', icon: 'usercheck' },
      ],
    },
  ],
  edges: [{ source: 'matrix', target: 'notes', label: 'built on' }],
}
