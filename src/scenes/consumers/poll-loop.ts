import type { Scene } from '@graphlearning/flow'

// §4.1 — the consumer is a loop the application drives. Nothing arrives unless poll() is called,
// and the loop's own pace is what the group uses to judge whether this member is alive.
export const pollLoop: Scene = {
  id: 'poll-loop',
  title: 'The poll loop',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'FulfilmentConsumer.java',
      label: `props.put("group.id", "fulfilment");
props.put("key.deserializer", StringDeserializer.class);
props.put("value.deserializer", StringDeserializer.class);

try (var consumer = new KafkaConsumer<String, String>(props)) {
    consumer.subscribe(List.of("orders"));
    while (running) {
        var records = consumer.poll(Duration.ofMillis(500));
        for (var record : records) {
            fulfil(record.key(), record.value());
        }
    }
}   // close(): leaves the group, so others take over at once`,
    },
    {
      id: 'steps',
      label: 'Each turn of the loop',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-poll', label: 'poll()', sub: 'fetches up to 500 records', pattern: 'network', icon: 'network' },
        { id: 's-process', label: 'Process', sub: 'your code, in order', pattern: 'service', icon: 'gears' },
        { id: 's-commit', label: 'Commit', sub: 'auto: every 5 s, in poll()', pattern: 'storage', icon: 'circlecheck' },
        { id: 's-again', label: 'Poll again', sub: 'within 5 minutes', pattern: 'warn', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'steps', label: 'one thread' }],
}
