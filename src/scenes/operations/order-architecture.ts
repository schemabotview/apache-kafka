import type { Scene } from '@graphlearning/flow'

// §11.8 — the whole course in one picture: the orders platform with every piece introduced along
// the way, labelled with the chapter that justified it.
export const orderArchitecture: Scene = {
  id: 'order-architecture',
  title: 'The integrated order architecture',
  flow: 'TB',
  nodes: [
    {
      id: 'write',
      label: 'Writing',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w-checkout', label: 'Checkout + outbox', sub: 'one DB transaction: ch 6', pattern: 'service', icon: 'server' },
        { id: 'w-cdc', label: 'CDC connector', sub: 'outbox to Kafka: ch 7', pattern: 'network', icon: 'plug' },
      ],
    },
    {
      id: 'kafka',
      label: 'Kafka — RF 3, min ISR 2, KRaft, ACLs per service',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'k-orders', label: 'orders', sub: 'key: order id, 24 partitions', pattern: 'storage', icon: 'scroll' },
        { id: 'k-sales', label: 'sales-per-sku', sub: 'windowed totals', pattern: 'storage', icon: 'scroll' },
        { id: 'k-dlq', label: 'orders-dlq', sub: 'quarantined records', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'read',
      label: 'Reading — one group each',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r-fulfil', label: 'Fulfilment', sub: 'dedupe by eventId', pattern: 'service', icon: 'package' },
        { id: 'r-sales', label: 'Sales totals', sub: 'Kafka Streams: ch 8', pattern: 'service', icon: 'sigma' },
        { id: 'r-notify', label: 'Notifications', sub: 'idempotent sends', pattern: 'service', icon: 'bell' },
      ],
    },
    {
      id: 'watch',
      label: 'Watching it — ch 10 and 11',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'm-fresh', label: 'Freshness', sub: 'per group, from event time', pattern: 'network', icon: 'clock' },
        { id: 'm-isr', label: 'Replication', sub: 'under-replicated, under min ISR', pattern: 'network', icon: 'copy' },
        { id: 'm-dlq', label: 'Dead letters', sub: 'depth, with an owner', pattern: 'network', icon: 'bell' },
      ],
    },
  ],
  edges: [
    { source: 'write', target: 'kafka', label: 'at least once' },
    { source: 'kafka', target: 'read', label: 'independent groups' },
    { source: 'read', target: 'watch', dashed: true },
  ],
}
