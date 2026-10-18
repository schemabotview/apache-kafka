import type { Scene } from '@graphlearning/flow'

// §4.3 — auto-commit switched off, and the commit placed after the batch is fully processed. A crash
// can still repeat a batch; it can no longer skip one.
export const explicitCommit: Scene = {
  id: 'explicit-commit',
  title: 'Committing explicitly',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'FulfilmentConsumer.java — explicit commits',
      label: `props.put("enable.auto.commit", false);

while (running) {
    var records = consumer.poll(Duration.ofMillis(500));
    for (var record : records) {
        fulfil(record.key(), record.value());   // must finish first
    }
    if (!records.isEmpty()) {
        consumer.commitSync();   // commits the positions just reached
    }
}`,
    },
    {
      id: 'choices',
      label: 'Commit styles',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-sync', label: 'commitSync()', sub: 'waits, retries, throws', pattern: 'service', icon: 'circlecheck' },
        { id: 'c-async', label: 'commitAsync()', sub: 'no wait; a later commit covers a failure', pattern: 'network', icon: 'zap' },
        { id: 'c-auto', label: 'Auto-commit', sub: 'every 5 s, during poll()', pattern: 'external', icon: 'clock' },
        { id: 'c-batch', label: 'Per batch', sub: 'not per record: cheaper', pattern: 'storage', icon: 'boxes' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'choices', label: 'options' }],
}
