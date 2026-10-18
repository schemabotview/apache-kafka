import type { Scene } from '@graphlearning/flow'

// §3.2 — the three places a failed publish can show up, and what the application must do at each.
// The last row is the one most often missed: unsent records at shutdown.
export const whereErrorsSurface: Scene = {
  id: 'where-errors-surface',
  title: 'Where publish errors surface',
  flow: 'TB',
  nodes: [
    {
      id: 'places',
      kind: 'table',
      label: 'Three places a failure appears',
      sub: 'one send can fail in any of them',
      headers: ['Where', 'Example', 'Application must'],
      values: [
        ['send() throws', 'value cannot be serialized', 'fix the record or code'],
        ['callback error', 'record too large', 'log, park or alert'],
        ['callback error', 'delivery timeout expired', 'treat outcome as unknown'],
        ['flush() / close()', 'records still unsent', 'wait for them, or log loss'],
      ],
    },
    {
      id: 'kinds',
      label: 'Two kinds of error',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-retriable', label: 'Retriable', sub: 'leader moved, timeout: client retries', pattern: 'service', icon: 'repeat' },
        { id: 'k-fatal', label: 'Not retriable', sub: 'too large, bad auth: reported at once', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'places', target: 'kinds', label: 'classified as' }],
}
