import type { Scene } from '@graphlearning/flow'

// §8.5 — a 5-minute window [09:00, 09:05) with 1 minute of grace. Stream time is the largest event
// time seen so far; a record is dropped once stream time has passed its window's end plus grace.
export const windowsGrace: Scene = {
  id: 'windows-grace',
  title: 'Windows, stream time and grace',
  flow: 'TB',
  nodes: [
    {
      id: 'arrivals',
      kind: 'table',
      label: 'Paid orders for mug-blue, in arrival order',
      sub: 'window 09:00–09:05, grace 1 min: closes at stream time 09:06',
      headers: ['Arrives', 'Event time', 'Stream time', 'Result'],
      values: [
        ['1st', '09:01', '09:01', 'added to 09:00 window'],
        ['2nd', '09:06:30', '09:06:30', 'new window; 09:00 closes'],
        ['3rd', '09:04', '09:06:30', 'too late: dropped'],
        ['4th', '09:07', '09:07', 'added to 09:05 window'],
      ],
    },
    {
      id: 'terms',
      label: 'Three terms',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 't-event', label: 'Event time', sub: 'the record timestamp', pattern: 'user', icon: 'calendar' },
        { id: 't-stream', label: 'Stream time', sub: 'largest event time so far', pattern: 'storage', icon: 'clock' },
        { id: 't-grace', label: 'Grace', sub: 'how late is still accepted', pattern: 'service', icon: 'history' },
      ],
    },
  ],
  edges: [{ source: 'arrivals', target: 'terms', label: 'explained by' }],
}
