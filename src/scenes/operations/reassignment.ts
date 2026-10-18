import type { Scene } from '@graphlearning/flow'

// §11.2 — a new broker receives no data until partitions are reassigned to it. The tool generates a
// plan, executes it with a throttle, and verifies it; --verify also removes the throttle.
export const reassignment: Scene = {
  id: 'reassignment',
  title: 'Adding a broker and moving partitions',
  flow: 'TB',
  nodes: [
    {
      id: 'cmds',
      kind: 'code',
      filename: 'terminal — broker 4 has joined, and holds nothing yet',
      label: `# 1. propose a plan that includes broker 4
$ bin/kafka-reassign-partitions.sh --bootstrap-server kafka-1:9092 \\
    --topics-to-move-json-file topics.json \\
    --broker-list "1,2,3,4" --generate

# 2. execute it, capping replication traffic at 50 MB/s
$ bin/kafka-reassign-partitions.sh --bootstrap-server kafka-1:9092 \\
    --reassignment-json-file plan.json --execute --throttle 50000000

# 3. check progress; once complete this also removes the throttle
$ bin/kafka-reassign-partitions.sh --bootstrap-server kafka-1:9092 \\
    --reassignment-json-file plan.json --verify`,
    },
    {
      id: 'effects',
      label: 'While it runs',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'e-copy', label: 'Data copied', sub: 'new replicas catch up', pattern: 'network', icon: 'copy' },
        { id: 'e-load', label: 'Extra load', sub: 'disk and network', pattern: 'warn', icon: 'gauge' },
        { id: 'e-throttle', label: 'Throttle stays', sub: 'until --verify', pattern: 'warn', icon: 'clock' },
      ],
    },
  ],
  edges: [{ source: 'cmds', target: 'effects', label: 'meanwhile' }],
}
