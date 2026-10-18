import type { Scene } from '@graphlearning/flow'

// §2.7 — a schema registry beside Kafka, not inside it. The producer registers the schema and sends
// only its id with each record; the consumer looks the id up. Kafka itself stores opaque bytes.
export const schemaRegistry: Scene = {
  id: 'schema-registry',
  title: 'A schema registry is a separate service',
  flow: 'TB',
  nodes: [
    {
      id: 'clients',
      label: 'Applications with registry-aware serializers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'producer', label: 'Producer', sub: 'registers OrderPlaced v2', pattern: 'service', icon: 'server' },
        { id: 'consumer', label: 'Consumer', sub: 'looks up schema 7', pattern: 'service', icon: 'package' },
      ],
    },
    {
      id: 'outside',
      label: 'Two separate systems',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'registry', label: 'Schema registry', sub: 'ecosystem service, not Kafka', pattern: 'external', icon: 'table' },
        { id: 'kafka', label: 'Kafka broker', sub: 'stores the bytes only', pattern: 'storage', icon: 'harddrive' },
      ],
    },
    {
      id: 'wire',
      kind: 'table',
      label: 'One record value on the wire',
      sub: 'Confluent wire format',
      headers: ['Bytes', 'Meaning'],
      values: [
        ['0', 'magic byte: format version'],
        ['1 to 4', 'schema id: 7'],
        ['5 onwards', 'the Avro-encoded order'],
      ],
    },
  ],
  edges: [
    { source: 'clients', target: 'outside', label: 'schema by id, records by topic' },
    { source: 'outside', target: 'wire', label: 'what Kafka sees' },
  ],
}
