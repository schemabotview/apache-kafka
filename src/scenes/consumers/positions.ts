import type { Scene } from '@graphlearning/flow'

// §4.2 — the four numbers that describe a group's progress on one partition. The committed offset
// is the NEXT record to read, not the last one processed, and it is what survives a restart.
export const positions: Scene = {
  id: 'positions',
  title: 'Position, committed offset and lag',
  flow: 'TB',
  nodes: [
    {
      id: 'log',
      label: 'orders, partition 1 — group fulfilment',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r5', label: 'offset 5', sub: 'processed', pattern: 'storage', icon: 'circlecheck' },
        { id: 'r6', label: 'offset 6', sub: 'processed', pattern: 'storage', icon: 'circlecheck' },
        { id: 'r7', label: 'offset 7', sub: 'fetched, in progress', pattern: 'service', icon: 'gears' },
        { id: 'r8', label: 'offset 8', sub: 'not fetched yet', pattern: 'external', icon: 'file' },
      ],
    },
    {
      id: 'numbers',
      kind: 'table',
      label: 'Four numbers for this partition',
      sub: 'only the committed offset survives a restart',
      headers: ['Number', 'Value', 'Means'],
      values: [
        ['committed offset', '7', 'restart reads from offset 7'],
        ['position', '8', 'next fetch starts at 8'],
        ['log end offset', '9', 'next append goes to 9'],
        ['lag', '2', 'log end minus committed'],
      ],
    },
  ],
  edges: [{ source: 'log', target: 'numbers', label: 'described by' }],
}
