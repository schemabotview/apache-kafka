import type { Scene } from '@graphlearning/flow'

// §11.5 — MirrorMaker 2 copying orders from eu-west to us-east. Remote topics are renamed with the
// source alias, and consumer group offsets are translated through checkpoints, asynchronously.
export const mirroring: Scene = {
  id: 'mirroring',
  title: 'Mirroring between clusters',
  flow: 'TB',
  nodes: [
    {
      id: 'source',
      label: 'Cluster eu-west',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-orders', label: 'orders', sub: 'written by checkout', pattern: 'storage', icon: 'scroll' },
        { id: 's-group', label: 'group fulfilment', sub: 'committed offsets', pattern: 'service', icon: 'users' },
      ],
    },
    {
      id: 'mm2',
      label: 'MirrorMaker 2 — Connect connectors',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'm-source', label: 'Source connector', sub: 'copies records', pattern: 'network', icon: 'copy' },
        { id: 'm-check', label: 'Checkpoints', sub: 'translates offsets', pattern: 'network', icon: 'repeat' },
      ],
    },
    {
      id: 'target',
      label: 'Cluster us-east',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't-orders', label: 'eu-west.orders', sub: 'remote topic, renamed', pattern: 'storage', icon: 'scroll' },
        { id: 't-group', label: 'group fulfilment', sub: 'translated, behind', pattern: 'warn', icon: 'users' },
      ],
    },
  ],
  edges: [
    { source: 'source', target: 'mm2', label: 'read' },
    { source: 'mm2', target: 'target', label: 'write, async' },
  ],
}
