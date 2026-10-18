import type { Scene } from '@graphlearning/flow'

// §2.5 — the round trip from an application object to bytes and back. The broker stores and serves
// bytes only; the two serializers have to agree on a format the broker never checks.
export const serialization: Scene = {
  id: 'serialization',
  title: 'Kafka stores bytes',
  flow: 'TB',
  nodes: [
    {
      id: 'write',
      label: 'Producer application',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'object', label: 'OrderPlaced', sub: 'a Java object', pattern: 'service', icon: 'box' },
        { id: 'serializer', label: 'Serializer', sub: 'object to bytes', pattern: 'service', icon: 'gears' },
      ],
      edges: [{ source: 'object', target: 'serializer' }],
    },
    { id: 'broker', label: 'Broker', sub: 'stores bytes, checks no format', pattern: 'storage', icon: 'harddrive' },
    {
      id: 'read',
      label: 'Consumer application',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'deserializer', label: 'Deserializer', sub: 'bytes to object', pattern: 'service', icon: 'gears' },
        { id: 'object2', label: 'OrderPlaced', sub: 'if formats agree', pattern: 'service', icon: 'box' },
      ],
      edges: [{ source: 'deserializer', target: 'object2' }],
    },
    {
      id: 'formats',
      label: 'Common formats',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'f-json', label: 'JSON', sub: 'readable, no enforced shape', pattern: 'external', icon: 'braces' },
        { id: 'f-avro', label: 'Avro', sub: 'compact, needs its schema', pattern: 'external', icon: 'table' },
        { id: 'f-proto', label: 'Protobuf', sub: 'compact, field numbers', pattern: 'external', icon: 'hash' },
      ],
    },
  ],
  edges: [
    { source: 'write', target: 'broker', label: 'bytes' },
    { source: 'broker', target: 'read', label: 'same bytes' },
    { source: 'read', target: 'formats', dashed: true, label: 'pick one' },
  ],
}
