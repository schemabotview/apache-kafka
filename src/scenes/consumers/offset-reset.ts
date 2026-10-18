import type { Scene } from '@graphlearning/flow'

// §4.8 — a deliberate replay with kafka-consumer-groups: stop the group, preview the reset, then
// execute it. Without --execute the tool only prints the plan.
export const offsetReset: Scene = {
  id: 'offset-reset',
  title: 'A safe, bounded replay',
  flow: 'TB',
  nodes: [
    {
      id: 'preview',
      kind: 'code',
      filename: 'terminal — preview first (no --execute)',
      label: `$ bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
    --group fulfilment --topic orders \\
    --reset-offsets --to-datetime 2026-10-18T09:00:00.000

GROUP        TOPIC   PARTITION  NEW-OFFSET
fulfilment   orders  0          12
fulfilment   orders  1          31
fulfilment   orders  2          9`,
    },
    {
      id: 'steps',
      label: 'The safe sequence',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-stop', label: '1. Stop the group', sub: 'every member: no active members', pattern: 'warn', icon: 'power' },
        { id: 's-preview', label: '2. Preview', sub: 'check each new offset', pattern: 'service', icon: 'search' },
        { id: 's-execute', label: '3. Add --execute', sub: 'same command', pattern: 'service', icon: 'pencil' },
        { id: 's-start', label: '4. Restart', sub: 'replays from there', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'preview', target: 'steps', label: 'then' }],
}
