import type { Scene } from '@graphlearning/flow'

// §4.7 — keeping the loop responsive while work is slow: smaller polls, pausing partitions whose work
// is backed up, and a bounded pool that preserves per-key order.
export const boundedConcurrency: Scene = {
  id: 'bounded-concurrency',
  title: 'Slow work without losing the group',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'pause while a partition is backed up',
      label: `var records = consumer.poll(Duration.ofMillis(500));
workers.submitByKey(records);           // same key, same worker

for (var tp : workers.backedUp()) {
    consumer.pause(List.of(tp));        // poll() skips it
}
consumer.resume(workers.caughtUp());    // fetch again

consumer.commitSync(workers.completedOffsets());`,
    },
    {
      id: 'levers',
      label: 'Levers, from simplest',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-fewer', label: 'Fewer per poll', sub: 'lower max.poll.records', pattern: 'service', icon: 'funnel' },
        { id: 'l-pause', label: 'pause / resume', sub: 'keep polling, fetch less', pattern: 'service', icon: 'power' },
        { id: 'l-pool', label: 'Bounded pool', sub: 'by key, to keep order', pattern: 'service', icon: 'users' },
        { id: 'l-commit', label: 'Commit completed', sub: 'only offsets fully done', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'levers', label: 'built from' }],
}
