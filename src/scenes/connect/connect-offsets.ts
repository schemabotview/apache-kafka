import type { Scene } from '@graphlearning/flow'

// §7.3 — where Connect keeps its state in distributed mode. Source and sink connectors track
// progress in completely different places, which matters when resetting either.
export const connectOffsets: Scene = {
  id: 'connect-offsets',
  title: 'Where Connect keeps its progress',
  flow: 'TB',
  nodes: [
    {
      id: 'progress',
      label: 'Progress, per connector type',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-source', label: 'Source offsets', sub: 'in connect-offsets', pattern: 'storage', icon: 'database' },
        { id: 'p-sink', label: 'Sink offsets', sub: 'group connect-<name>', pattern: 'storage', icon: 'users' },
      ],
    },
    {
      id: 'topics',
      kind: 'table',
      label: 'Internal topics of a distributed cluster',
      sub: 'names are the worker defaults',
      headers: ['Topic', 'Holds', 'Should be'],
      values: [
        ['connect-configs', 'connector and task configs', '1 partition, compacted'],
        ['connect-offsets', 'source connector positions', 'compacted, replicated'],
        ['connect-status', 'connector and task states', 'compacted, replicated'],
      ],
    },
    {
      id: 'example',
      kind: 'table',
      label: 'A source offset is the source system\'s position',
      sub: 'meaning defined by each connector',
      headers: ['Connector', 'Example source offset'],
      values: [
        ['database CDC', 'log position 0/16B3748'],
        ['file source', 'byte position 2048'],
      ],
    },
  ],
  edges: [
    { source: 'progress', target: 'topics', label: 'stored in' },
    { source: 'topics', target: 'example', dashed: true },
  ],
}
