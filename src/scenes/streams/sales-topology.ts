import type { Scene } from '@graphlearning/flow'

// §8.1 — a Kafka Streams application is an ordinary Java program. This topology turns paid orders
// into 5-minute sales totals per SKU; every arrow becomes Kafka reads and writes underneath.
export const salesTopology: Scene = {
  id: 'sales-topology',
  title: 'A topology for sales totals',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'SalesTotals.java',
      label: `props.put("application.id", "sales-totals");
var builder = new StreamsBuilder();

builder.stream("orders", Consumed.with(Serdes.String(), orderSerde))
    .filter((orderId, order) -> order.status() == PAID)
    .groupBy((orderId, order) -> order.sku(),
             Grouped.with(Serdes.String(), orderSerde))
    .windowedBy(TimeWindows.ofSizeAndGrace(
             Duration.ofMinutes(5), Duration.ofMinutes(1)))
    .aggregate(() -> 0.0,
             (sku, order, total) -> total + order.total(),
             Materialized.with(Serdes.String(), Serdes.Double()))
    .toStream()
    .to("sales-per-sku", Produced.with(windowedSerde, Serdes.Double()));

new KafkaStreams(builder.build(), props).start();`,
    },
    {
      id: 'shape',
      label: 'What it is',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 's-kafka', label: 'Kafka-backed', sub: 'state, offsets, recovery', pattern: 'storage', icon: 'harddrive' },
        { id: 's-lib', label: 'A library', sub: 'runs inside your app', pattern: 'service', icon: 'package' },
        { id: 's-id', label: 'application.id', sub: 'group and topic prefix', pattern: 'storage', icon: 'tag' },
        { id: 's-dsl', label: 'The DSL', sub: 'operators, not raw clients', pattern: 'network', icon: 'workflow' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'shape', label: 'is' }],
}
