import type { Scene } from '@graphlearning/flow'

// §1.2 — four ways to move an order between systems, one panel each, compared on the same two
// questions: who can read a message, and what is left once it has been read.
export const integrationStyles: Scene = {
  id: 'integration-styles',
  title: 'Four ways to move an order',
  cols: 2,
  nodes: [
    {
      id: 'rr',
      label: 'Request / response',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'rr-reads', label: 'One caller', sub: 'waits for the answer', pattern: 'user', icon: 'users' },
        { id: 'rr-after', label: 'Nothing kept', sub: 'the answer is gone', pattern: 'service', icon: 'circleslash' },
      ],
    },
    {
      id: 'queue',
      label: 'Work queue',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'queue-reads', label: 'One worker', sub: 'of many, per message', pattern: 'user', icon: 'users' },
        { id: 'queue-after', label: 'Removed', sub: 'once it is handled', pattern: 'service', icon: 'trash' },
      ],
    },
    {
      id: 'batch',
      label: 'Batch file',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'batch-reads', label: 'The next load', sub: 'on a schedule', pattern: 'user', icon: 'users' },
        { id: 'batch-after', label: 'Replaced', sub: 'by the next file', pattern: 'service', icon: 'calendar' },
      ],
    },
    {
      id: 'log',
      label: 'Retained log',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'log-reads', label: 'Any number', sub: 'of independent readers', pattern: 'user', icon: 'users' },
        { id: 'log-after', label: 'Kept', sub: 'until retention ends', pattern: 'storage', icon: 'history' },
      ],
    },
  ],
  edges: [],
}
