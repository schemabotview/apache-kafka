import type { Scene } from '@graphlearning/flow'

// §4.7 — two separate liveness checks. Heartbeats prove the process is alive; polling within
// max.poll.interval.ms proves the loop is making progress. A slow handler fails the second.
export const liveness: Scene = {
  id: 'liveness',
  title: 'Two ways to be declared dead',
  flow: 'TB',
  nodes: [
    {
      id: 'checks',
      label: 'The group checks two things',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'heartbeat',
          label: 'Process alive?',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'h-send', label: 'Heartbeats', sub: 'background thread', pattern: 'network', icon: 'waves' },
            { id: 'h-limit', label: 'Session timeout', sub: '45 s with none: removed', pattern: 'warn', icon: 'clock' },
          ],
        },
        {
          id: 'progress',
          label: 'Loop progressing?',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'p-poll', label: 'Calls to poll()', sub: 'from your loop', pattern: 'service', icon: 'repeat' },
            { id: 'p-limit', label: 'Poll interval', sub: '5 min with none: leaves', pattern: 'warn', icon: 'clock' },
          ],
        },
      ],
    },
    {
      id: 'slow',
      kind: 'table',
      label: 'A slow handler: 500 records × 1 s each',
      sub: 'max.poll.records = 500, max.poll.interval.ms = 300 000',
      headers: ['Time', 'What happens'],
      values: [
        ['0 s', 'poll() returns 500 records'],
        ['300 s', 'no poll yet: member leaves the group'],
        ['301 s', 'partition reassigned, batch replayed elsewhere'],
        ['500 s', 'handler finishes; its commit is rejected'],
      ],
    },
  ],
  edges: [{ source: 'checks', target: 'slow', label: 'the second one fails' }],
}
