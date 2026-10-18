import type { Scene } from '@graphlearning/flow'

// §6.2 — a zombie: an instance that was presumed dead comes back after its replacement started.
// The shared transactional.id and its epoch let the coordinator fence the old one.
export const fencing: Scene = {
  id: 'fencing',
  title: 'Fencing a zombie',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      kind: 'table',
      label: 'transactional.id order-pricer-0',
      sub: 'instance A pauses for a long GC; B replaces it',
      headers: ['Step', 'Instance A', 'Instance B', 'Coordinator'],
      values: [
        ['1', 'epoch 4, mid-transaction', '', 'epoch 4'],
        ['2', 'paused, presumed dead', 'initTransactions()', 'aborts A, epoch 5'],
        ['3', '', 'commits with epoch 5', 'accepted'],
        ['4', 'wakes, commits with epoch 4', '', 'rejected: fenced'],
      ],
    },
    {
      id: 'rules',
      label: 'What makes it work',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'r-stable', label: 'Stable id', sub: 'same id for the same work', pattern: 'service', icon: 'fingerprint' },
        { id: 'r-epoch', label: 'Epoch', sub: 'bumped on every init', pattern: 'storage', icon: 'hash' },
        { id: 'r-fenced', label: 'Fenced', sub: 'A must close and stop', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'timeline', target: 'rules', label: 'because of' }],
}
