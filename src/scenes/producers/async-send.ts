import type { Scene } from '@graphlearning/flow'

// §3.2 — send() returns before anything has reached a broker. The callback is the first moment the
// application learns the outcome, and it runs on the producer's own I/O thread.
export const asyncSend: Scene = {
  id: 'async-send',
  title: 'send() returns before the broker answers',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'OrderPublisher.java — with a callback',
      label: `producer.send(record, (metadata, error) -> {
    if (error == null) {
        log.info("o-1041 stored at {}-{}@{}", metadata.topic(),
                 metadata.partition(), metadata.offset());
    } else {
        failed.add(record);      // keep it: decide what to do later
    }
});
// execution continues here at once: nothing is confirmed yet`,
    },
    {
      id: 'timeline',
      label: 'What happens, in order',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 't1', label: '1. send() returns', sub: 'record is in the buffer', pattern: 'service', icon: 'zap' },
        { id: 't2', label: '2. Batch is sent', sub: 'by the sender thread', pattern: 'network', icon: 'network' },
        { id: 't3', label: '3. Broker replies', sub: 'stored, or an error', pattern: 'storage', icon: 'harddrive' },
        { id: 't4', label: '4. Callback runs', sub: 'on the I/O thread: be quick', pattern: 'warn', icon: 'bell' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'timeline', label: 'asynchronous' }],
}
