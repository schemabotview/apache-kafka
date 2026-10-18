import type { Scene } from '@graphlearning/flow'

// §5.4 — each replica's log end offset, and the high watermark they imply. Consumers only see
// records below the high watermark: records every in-sync replica already has.
export const highWatermark: Scene = {
  id: 'high-watermark',
  title: 'The high watermark',
  flow: 'TB',
  nodes: [
    {
      id: 'replicas',
      kind: 'table',
      label: 'orders-1: log end offset of each in-sync replica',
      sub: 'the high watermark is the lowest of them',
      headers: ['Replica', 'Has offsets', 'Log end offset'],
      values: [
        ['broker 2 (leader)', '0 to 11', '12'],
        ['broker 3', '0 to 11', '12'],
        ['broker 1', '0 to 9', '10'],
      ],
    },
    {
      id: 'visible',
      label: 'What a consumer can read',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'v-below', label: 'Offsets 0 to 9', sub: 'below the watermark: readable', pattern: 'service', icon: 'circlecheck' },
        { id: 'v-hw', label: 'Watermark 10', sub: 'lowest log end in ISR', pattern: 'storage', icon: 'ruler' },
        { id: 'v-above', label: 'Offsets 10, 11', sub: 'leader has them: hidden', pattern: 'warn', icon: 'lock' },
      ],
    },
  ],
  edges: [{ source: 'replicas', target: 'visible', label: 'so' }],
}
