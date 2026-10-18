import type { Scene } from '@graphlearning/flow'

// §2.6 — the compatibility directions, phrased as who can read whom, and the upgrade order each one
// implies. BACKWARD is Confluent Schema Registry's default; the other registries use the same terms.
export const compatibilityModes: Scene = {
  id: 'compatibility-modes',
  title: 'Compatibility directions',
  flow: 'TB',
  nodes: [
    {
      id: 'modes',
      kind: 'table',
      label: 'Which side can read which',
      sub: 'checked when a new schema version is registered',
      headers: ['Mode', 'Guarantee', 'Upgrade first'],
      values: [
        ['BACKWARD', 'new readers read old data', 'consumers'],
        ['FORWARD', 'old readers read new data', 'producers'],
        ['FULL', 'both directions', 'either side'],
        ['NONE', 'nothing is checked', 'everyone at once'],
      ],
    },
    {
      id: 'v2',
      kind: 'code',
      filename: 'OrderPlaced.avsc — version 2 adds a field',
      label: `{ "type": "record", "name": "OrderPlaced",
  "fields": [
    { "name": "orderId", "type": "string" },
    { "name": "total",   "type": "double" },
    { "name": "channel", "type": "string",
      "default": "web" }
  ] }`,
    },
  ],
  edges: [{ source: 'modes', target: 'v2', label: 'a default keeps both directions' }],
}
