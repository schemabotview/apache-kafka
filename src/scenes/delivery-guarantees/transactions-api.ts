import type { Scene } from '@graphlearning/flow'

// §6.2 — a consume-transform-produce loop with a transactional producer. The output records and the
// input offsets are committed together, or not at all.
export const transactionsApi: Scene = {
  id: 'transactions-api',
  title: 'A Kafka transaction',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'OrderPricer.java — orders in, priced-orders out',
      label: `props.put("transactional.id", "order-pricer-0");
producer.initTransactions();          // fences older instances

while (running) {
    var records = consumer.poll(Duration.ofMillis(500));
    producer.beginTransaction();
    try {
        for (var r : records) {
            producer.send(new ProducerRecord<>("priced-orders",
                          r.key(), price(r.value())));
        }
        producer.sendOffsetsToTransaction(
            nextOffsets(records), consumer.groupMetadata());
        producer.commitTransaction();     // outputs + offsets, together
    } catch (KafkaException e) {
        producer.abortTransaction();      // neither becomes visible
        rewindToLastCommit(consumer);
    }
}`,
    },
    {
      id: 'atomic',
      label: 'Committed atomically',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'a-out', label: 'Output records', sub: 'priced-orders', pattern: 'storage', icon: 'scroll' },
        { id: 'a-off', label: 'Input offsets', sub: 'group order-pricer', pattern: 'storage', icon: 'hash' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'atomic', label: 'commitTransaction()' }],
}
