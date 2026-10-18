import type { Scene } from '@graphlearning/flow'

// §1.5 — two named groups over the same topic, and what happens when one of them is stopped while
// a new order arrives. o-1043 hashes to partition 1, where it becomes offset 1.
export const readerResumes: Scene = {
  id: 'reader-resumes',
  title: 'Two groups, one stops, one resumes',
  flow: 'TB',
  nodes: [
    {
      id: 'command',
      kind: 'code',
      filename: 'terminals 2 and 3 — one group each',
      label: `$ bin/kafka-console-consumer.sh \\
    --topic orders \\
    --group fulfilment \\
    --from-beginning \\
    --bootstrap-server localhost:9092

# terminal 3: the same, with --group analytics`,
    },
    {
      id: 'steps',
      label: 'What each group prints',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'step-1', label: 'Both groups start', sub: 'each prints all 3 orders', pattern: 'service', icon: 'users' },
        { id: 'step-2', label: 'Fulfilment stops', sub: 'commits its offsets on the way out', pattern: 'warn', icon: 'power' },
        { id: 'step-3', label: 'o-1043 arrives', sub: 'analytics prints it', pattern: 'storage', icon: 'file' },
        { id: 'step-4', label: 'Fulfilment restarts', sub: 'prints o-1043 only', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'command', target: 'steps', label: 'run, then stop one' }],
}
