import type { Scene } from '@graphlearning/flow'

// §1.6 — what the one-process local cluster is good for, what it cannot demonstrate, and the one
// command that resets it. Kept to the facts of the shipped config/server.properties.
export const localLimits: Scene = {
  id: 'local-limits',
  title: 'What one local broker can and cannot show',
  flow: 'TB',
  nodes: [
    {
      id: 'limits',
      label: 'One local process',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'shows',
          label: 'Enough to show',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 's-records', label: 'Records', sub: 'keys, values, offsets', pattern: 'service', icon: 'file' },
            { id: 's-routing', label: 'Key routing', sub: 'hash(key) to partition', pattern: 'service', icon: 'share' },
            { id: 's-groups', label: 'Groups', sub: 'commit and resume', pattern: 'service', icon: 'users' },
          ],
        },
        {
          id: 'cannot',
          label: 'Cannot show',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'c-failure', label: 'Broker failure', sub: 'one copy, no failover', pattern: 'warn', icon: 'ban' },
            { id: 'c-replication', label: 'Replication', sub: 'and leader election', pattern: 'warn', icon: 'copy' },
            { id: 'c-moves', label: 'Reassignment', sub: 'moving partitions', pattern: 'warn', icon: 'swap' },
          ],
        },
      ],
    },
    {
      id: 'habits',
      label: 'Habits worth keeping',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'h-local', label: 'Localhost only', sub: 'plaintext on :9092', pattern: 'network', icon: 'lock' },
        { id: 'h-explicit', label: 'Create topics', sub: 'a typo auto-creates a new one', pattern: 'warn', icon: 'pencil' },
        { id: 'h-reset', label: 'Reset on purpose', sub: 'deletes every topic', pattern: 'storage', icon: 'trash' },
      ],
    },
    {
      id: 'cleanup',
      kind: 'code',
      filename: 'terminal — reset the local cluster',
      label: `# stop the consumers, producer and broker (Ctrl+C), then:
$ rm -rf /tmp/kafka-logs /tmp/kraft-combined-logs`,
    },
  ],
  edges: [
    { source: 'limits', target: 'habits' },
    { source: 'habits', target: 'cleanup', label: 'reset' },
  ],
}
