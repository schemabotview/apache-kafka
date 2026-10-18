import type { Scene } from '@graphlearning/flow'

// §10.7 — under-replicated partitions, read from the broker metrics. The count says how many; the
// pattern across brokers says why; UnderMinIsr says whether writes are already refused.
export const underReplicated: Scene = {
  id: 'under-replicated',
  title: 'Under-replicated partitions',
  flow: 'TB',
  nodes: [
    {
      id: 'patterns',
      kind: 'table',
      label: 'UnderReplicatedPartitions above 0 — reading the pattern',
      sub: 'compare across brokers before acting',
      headers: ['Pattern', 'Likely cause'],
      values: [
        ['all partitions of one broker', 'that broker is down or restarting'],
        ['followers on one broker lag', 'its disk or network is slow'],
        ['spread across all brokers', 'cluster-wide load, or a big reassignment'],
        ['UnderMinIsrPartitionCount > 0', 'acks=all writes are being refused'],
      ],
    },
    {
      id: 'next',
      label: 'Next checks',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'n-describe', label: 'Describe', sub: '--under-replicated-partitions', pattern: 'network', icon: 'search' },
        { id: 'n-follower', label: 'Follower fetch', sub: 'FetchFollower time', pattern: 'storage', icon: 'copy' },
        { id: 'n-offline', label: 'Offline', sub: 'partitions with no leader', pattern: 'warn', icon: 'skull' },
      ],
    },
  ],
  edges: [{ source: 'patterns', target: 'next', label: 'then' }],
}
