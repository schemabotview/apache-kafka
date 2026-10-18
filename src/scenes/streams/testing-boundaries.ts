import type { Scene } from '@graphlearning/flow'

// §8.8 — testing a topology without a cluster, and where Kafka Streams stops being the right tool
// compared with Spark or Flink.
export const testingBoundaries: Scene = {
  id: 'testing-boundaries',
  title: 'Testing, and choosing a stream processor',
  flow: 'TB',
  nodes: [
    {
      id: 'test',
      kind: 'code',
      filename: 'SalesTotalsTest.java — no broker needed',
      label: `try (var driver = new TopologyTestDriver(topology, props)) {
    var orders = driver.createInputTopic("orders", ...);
    var sales  = driver.createOutputTopic("sales-per-sku", ...);

    orders.pipeInput("o-1041", paid("mug-blue", 12.00), at("09:01"));
    orders.pipeInput("o-1042", paid("mug-blue", 24.00), at("09:03"));

    assertEquals(36.00, sales.readKeyValuesToMap().get(window));
}`,
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Kafka Streams, Spark or Flink',
      sub: 'all three can do windowed aggregation',
      headers: ['', 'Kafka Streams', 'Spark / Flink'],
      values: [
        ['runs as', 'a library in your app', 'a separate cluster'],
        ['sources', 'Kafka topics', 'many systems'],
        ['suits', 'per-key services', 'large analytics jobs'],
        ['state', 'local stores + changelogs', 'checkpoints to shared storage'],
      ],
    },
  ],
  edges: [{ source: 'test', target: 'compare', label: 'then choose' }],
}
