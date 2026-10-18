import type { Scene } from '@graphlearning/flow'

// §8.7 — a windowed aggregate emits UPDATES, not one final answer. What a downstream reader sees for
// one window depends on caching, commit timing and the processing guarantee.
export const outputSemantics: Scene = {
  id: 'output-semantics',
  title: 'Outputs are updates',
  flow: 'TB',
  nodes: [
    {
      id: 'updates',
      kind: 'table',
      label: 'sales-per-sku for mug-blue, window 09:00',
      sub: 'one window, several output records',
      headers: ['Output', 'Value', 'Meaning'],
      values: [
        ['1st', '12.00', 'running total so far'],
        ['2nd', '36.00', 'replaces 12.00'],
        ['3rd', '48.00', 'replaces 36.00'],
      ],
    },
    {
      id: 'settings',
      kind: 'table',
      label: 'Processing guarantee',
      sub: 'processing.guarantee',
      headers: ['Value', 'After a crash', 'Commit interval'],
      values: [
        ['at_least_once (default)', 'some updates repeat', '30 s'],
        ['exactly_once_v2', 'no repeated output', '100 ms'],
      ],
    },
    {
      id: 'readers',
      label: 'Downstream readers must',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-latest', label: 'Keep the latest', sub: 'per key and window', pattern: 'service', icon: 'circlecheck' },
        { id: 'r-committed', label: 'read_committed', sub: 'with exactly_once_v2', pattern: 'service', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'updates', target: 'settings', label: 'how many depends on' },
    { source: 'settings', target: 'readers', label: 'so' },
  ],
}
