import type { Scene } from '@graphlearning/flow'

// §5.5 — the trade-off unclean.leader.election.enable makes explicit: staying offline until a safe
// replica returns, or coming back at once with whatever an out-of-sync replica had.
export const availabilityLoss: Scene = {
  id: 'availability-loss',
  title: 'Availability or acknowledged data',
  flow: 'TB',
  nodes: [
    { id: 'survivor', label: 'Only broker 1 left', sub: 'stopped at offset 9; 0 to 11 were acked', pattern: 'warn', icon: 'harddrive' },
    {
      id: 'choice',
      label: 'unclean.leader.election.enable',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'off',
          label: 'false — the default',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'off-wait', label: 'Offline', sub: 'until a safe replica returns', pattern: 'warn', icon: 'clock' },
            { id: 'off-kept', label: 'Offsets 10, 11', sub: 'kept', pattern: 'service', icon: 'circlecheck' },
          ],
        },
        {
          id: 'on',
          label: 'true',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'on-back', label: 'Back at once', sub: 'broker 1 leads', pattern: 'service', icon: 'zap' },
            { id: 'on-lost', label: 'Offsets 10, 11', sub: 'lost for good', pattern: 'warn', icon: 'skull' },
          ],
        },
      ],
    },
    {
      id: 'after',
      label: 'After an unclean election',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a-new', label: 'New writes', sub: 'reuse offsets 10, 11', pattern: 'warn', icon: 'pencil' },
        { id: 'a-readers', label: 'Readers', sub: 'saw old 10 and 11', pattern: 'warn', icon: 'users' },
        { id: 'a-truncate', label: 'Old leader', sub: 'truncates if it returns', pattern: 'warn', icon: 'scissors' },
      ],
    },
  ],
  edges: [
    { source: 'survivor', target: 'choice', label: 'depends on' },
    { source: 'choice', target: 'after', dashed: true, label: 'if true' },
  ],
}
