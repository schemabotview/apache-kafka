import type { PlotPoint, Scene } from '@graphlearning/flow'

// §10.7 — two supplied incidents, same symptom (lag grows), different cause. Read produce latency
// next to lag: flat latency points at the consumer, rising latency at the brokers.
const minutes = Array.from({ length: 31 }, (_, i) => i)
const line = (f: (m: number) => number): PlotPoint[] => minutes.map((m) => [m, f(m)])
const ramp = (from: number, slope: number) => (m: number) => (m < 10 ? from : from + (m - 10) * slope)

export const metricCharts: Scene = {
  id: 'metric-charts',
  title: 'Slow consumer or broker pressure?',
  cols: 1,
  nodes: [
    {
      id: 'slow-consumer',
      kind: 'plot',
      label: 'Incident A: a slow consumer',
      sub: 'supplied example data, % of each alert level',
      plot: {
        x: { min: 0, max: 30, step: 10, label: 'minutes' },
        y: { min: 0, max: 100, step: 50 },
        axes: 'corner',
        series: [
          { kind: 'line', label: 'consumer lag', labelAt: [16, 62], points: line(ramp(5, 4.5)) },
          { kind: 'line', label: 'produce latency: flat', labelAt: [4, 30], dashed: true, points: line(() => 20) },
        ],
      },
    },
    {
      id: 'broker-pressure',
      kind: 'plot',
      label: 'Incident B: broker pressure',
      sub: 'supplied example data, % of each alert level',
      plot: {
        x: { min: 0, max: 30, step: 10, label: 'minutes' },
        y: { min: 0, max: 100, step: 50 },
        axes: 'corner',
        series: [
          { kind: 'line', label: 'consumer lag', labelAt: [24, 50], points: line(ramp(5, 4)) },
          { kind: 'line', label: 'produce latency: rising', labelAt: [10, 62], dashed: true, points: line(ramp(20, 3)) },
        ],
      },
    },
    {
      id: 'next',
      label: 'Where to look next',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'read-a', label: 'A: the app', sub: 'handler time, errors, GC', pattern: 'service', icon: 'search' },
        { id: 'read-b', label: 'B: the brokers', sub: 'disk, threads, network', pattern: 'storage', icon: 'harddrive' },
      ],
    },
  ],
  edges: [],
}
