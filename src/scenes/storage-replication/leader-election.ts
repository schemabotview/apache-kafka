import type { Scene } from '@graphlearning/flow'

// §5.5 — the controller's choice when a leader fails, in the order Kafka 4.1 applies it. ELR is on
// by default for new 4.1 clusters; unclean election is off by default.
export const leaderElection: Scene = {
  id: 'leader-election',
  title: 'Choosing a new leader',
  flow: 'TB',
  nodes: [
    { id: 'fail', label: 'Leader fails', sub: 'broker 2 stops responding', pattern: 'warn', icon: 'skull' },
    {
      id: 'order',
      label: 'The controller tries, in order',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'o-isr', label: '1. An ISR member', sub: 'has every acknowledged record', pattern: 'service', icon: 'circlecheck' },
        { id: 'o-elr', label: '2. An ELR member', sub: 'left the ISR safely', pattern: 'service', icon: 'shieldcheck' },
        { id: 'o-last', label: '3. The last leader', sub: 'if it comes back', pattern: 'network', icon: 'history' },
      ],
    },
    {
      id: 'none',
      label: 'If none is available',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'n-wait', label: 'Default: wait', sub: 'partition offline', pattern: 'warn', icon: 'clock' },
        { id: 'n-unclean', label: 'Unclean election', sub: 'any replica: data lost', pattern: 'warn', icon: 'skull' },
      ],
    },
  ],
  edges: [
    { source: 'fail', target: 'order', label: 'controller elects' },
    { source: 'order', target: 'none', dashed: true, label: 'none available' },
  ],
}
