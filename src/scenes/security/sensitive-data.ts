import type { Scene } from '@graphlearning/flow'

// §9.7 — why personal data is hard to remove once it is in a topic, and the controls that work
// instead: keep it out, encrypt what must go in, and keep evidence of access.
export const sensitiveData: Scene = {
  id: 'sensitive-data',
  title: 'Sensitive data and its limits',
  flow: 'TB',
  nodes: [
    {
      id: 'limits',
      kind: 'table',
      label: 'Removing one customer\'s data from orders',
      sub: 'what each mechanism can and cannot do',
      headers: ['Mechanism', 'Removes', 'Cannot remove'],
      values: [
        ['retention', 'whole old segments', 'one record, today'],
        ['compaction + tombstone', 'older values of a key', 'downstream copies'],
        ['delete the topic', 'everything in it', 'mirrors, sinks, backups'],
      ],
    },
    {
      id: 'controls',
      label: 'Controls that work',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-out', label: 'Keep it out', sub: 'ids, not details', pattern: 'service', icon: 'ban' },
        { id: 'c-encrypt', label: 'Encrypt fields', sub: 'delete the key to forget', pattern: 'service', icon: 'key' },
        { id: 'c-audit', label: 'Audit evidence', sub: 'who read which topic', pattern: 'storage', icon: 'receipt' },
        { id: 'c-retain', label: 'Short retention', sub: 'for sensitive topics', pattern: 'storage', icon: 'calendar' },
      ],
    },
  ],
  edges: [{ source: 'limits', target: 'controls', label: 'so prefer' }],
}
