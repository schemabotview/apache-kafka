import type { Scene } from '@graphlearning/flow'

// §10.6 — three numbers people call "lag", for the same consumer at the same moment. They answer
// different questions, and only freshness is what a customer would notice.
export const lagLatency: Scene = {
  id: 'lag-latency',
  title: 'Lag, latency and freshness',
  flow: 'TB',
  nodes: [
    {
      id: 'three',
      kind: 'table',
      label: 'Group fulfilment, 09:30:00',
      sub: 'three measurements, three questions',
      headers: ['Measure', 'Value', 'Answers'],
      values: [
        ['consumer lag', '1 200 records', 'how far behind, in records?'],
        ['processing latency', '40 ms per record', 'how long does one take?'],
        ['freshness', '6 s since event time', 'how stale is the result?'],
      ],
    },
    {
      id: 'why',
      label: 'Why they differ',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'w-rate', label: 'Lag ÷ rate', sub: '1 200 at 200/s ≈ 6 s', pattern: 'storage', icon: 'sigma' },
        { id: 'w-quiet', label: 'Quiet topic', sub: 'small lag, still stale', pattern: 'warn', icon: 'clock' },
        { id: 'w-burst', label: 'Burst', sub: 'big lag, briefly', pattern: 'warn', icon: 'zap' },
      ],
    },
    { id: 'alert', label: 'Alert on freshness', sub: 'it matches what users see', pattern: 'service', icon: 'bell' },
  ],
  edges: [
    { source: 'three', target: 'why' },
    { source: 'why', target: 'alert', label: 'so' },
  ],
}
