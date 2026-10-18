import type { Scene } from '@graphlearning/flow'

// §3.1 — the whole life of a Java producer in one try-with-resources block, with the four things it
// owns that the application never sees directly.
export const producerLifecycle: Scene = {
  id: 'producer-lifecycle',
  title: 'A producer from creation to close',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'OrderPublisher.java',
      label: `var props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", StringSerializer.class);
props.put("value.serializer", StringSerializer.class);

try (var producer = new KafkaProducer<String, String>(props)) {
    var record = new ProducerRecord<>("orders", "o-1041", json);
    producer.send(record);
}   // close(): waits for pending sends, then frees resources`,
    },
    {
      id: 'owns',
      label: 'What one KafkaProducer owns',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-thread', label: 'Sender thread', sub: 'sends in the background', pattern: 'service', icon: 'gears' },
        { id: 'o-buffer', label: 'Buffer', sub: '32 MiB of unsent records', pattern: 'storage', icon: 'memory' },
        { id: 'o-conns', label: 'Connections', sub: 'one per broker it uses', pattern: 'network', icon: 'plug' },
        { id: 'o-meta', label: 'Metadata', sub: 'who leads each partition', pattern: 'network', icon: 'network' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'owns', label: 'creates' }],
}
