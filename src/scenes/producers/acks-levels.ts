import type { Scene } from '@graphlearning/flow'

// §3.4 — what the producer waits for at each acks level, and what "success" then means. acks=all is
// the default since Kafka 3.0; chapter 5 adds min.insync.replicas to the picture.
export const acksLevels: Scene = {
  id: 'acks-levels',
  title: 'What acks means',
  flow: 'TB',
  nodes: [
    {
      id: 'levels',
      kind: 'table',
      label: 'What "success" means at each acks level',
      sub: 'acks=all is the default',
      headers: ['acks', 'Producer waits for', 'Lost if'],
      values: [
        ['0', 'nothing: fire and forget', 'anything goes wrong'],
        ['1', 'the leader to write it', 'leader dies before copying'],
        ['all', 'every in-sync replica', 'all in-sync copies are lost'],
      ],
    },
    {
      id: 'flow',
      label: 'acks=all, three replicas',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'producer', label: 'Producer', sub: 'sends o-1041', pattern: 'service', icon: 'server' },
        { id: 'leader', label: 'Leader', sub: 'writes, waits', pattern: 'storage', icon: 'harddrive' },
        {
          id: 'followers',
          label: 'In-sync followers',
          pattern: 'group',
          cols: 2,
          children: [
            { id: 'f1', label: 'Follower 1', sub: 'copied', pattern: 'storage', icon: 'copy' },
            { id: 'f2', label: 'Follower 2', sub: 'copied', pattern: 'storage', icon: 'copy' },
          ],
        },
      ],
      edges: [
        { source: 'producer', target: 'leader', label: 'produce' },
        { source: 'leader', target: 'followers', label: 'replicate' },
      ],
    },
  ],
  edges: [{ source: 'levels', target: 'flow', label: 'the default, drawn' }],
}
