import type { Scene } from '@graphlearning/flow'

// §11.1 — everyday administration, ranked by how hard each change is to undo, with the safeguard
// that belongs in front of it.
export const topicAdmin: Scene = {
  id: 'topic-admin',
  title: 'Administration and safeguards',
  flow: 'TB',
  nodes: [
    {
      id: 'ops',
      kind: 'table',
      label: 'Common changes, by how hard they are to undo',
      sub: 'kafka-topics, kafka-configs, kafka-consumer-groups',
      headers: ['Change', 'Undo', 'Safeguard'],
      values: [
        ['raise retention.ms', 'easy', 'check disk headroom first'],
        ['lower retention.ms', 'impossible once deleted', 'confirm no reader is behind'],
        ['add partitions', 'impossible', 'key moves: chapter 2'],
        ['reset group offsets', 'only if old ones were saved', 'stopped group, preview'],
        ['delete a topic', 'impossible', 'owner sign-off, check readers'],
      ],
    },
    {
      id: 'habits',
      label: 'Habits for every change',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'h-code', label: 'As code', sub: 'reviewed, in version control', pattern: 'service', icon: 'gitbranch' },
        { id: 'h-before', label: 'Record before', sub: 'save the current state', pattern: 'storage', icon: 'history' },
        { id: 'h-preview', label: 'Preview', sub: 'dry runs where they exist', pattern: 'network', icon: 'search' },
        { id: 'h-owner', label: 'Owner agrees', sub: 'and readers are told', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [{ source: 'ops', target: 'habits', label: 'always' }],
}
