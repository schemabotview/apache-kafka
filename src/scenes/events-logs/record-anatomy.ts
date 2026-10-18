import type { Scene } from '@graphlearning/flow'

// §1.3 — one order record, field by field, with who sets each field. The bottom three rows are not
// written by the application at all: they are where the record ends up.
export const recordAnatomy: Scene = {
  id: 'record-anatomy',
  title: 'Anatomy of a record',
  flow: 'TB',
  nodes: [
    {
      id: 'record',
      kind: 'table',
      label: 'One record in the orders topic',
      sub: 'what the producer sends',
      headers: ['Field', 'Example', 'Set by'],
      values: [
        ['key', 'o-1041', 'producer'],
        ['value', '{"orderId":1041,"total":12.50}', 'producer'],
        ['headers', 'source=web', 'producer'],
        ['timestamp', '2026-10-18T09:14:03Z', 'producer, by default'],
      ],
    },
    {
      id: 'placement',
      kind: 'table',
      label: 'Where it lands',
      sub: 'decided on the way in',
      headers: ['Field', 'Example', 'Set by'],
      values: [
        ['topic', 'orders', 'producer names it'],
        ['partition', '1', 'partitioner, from the key'],
        ['offset', '0', 'broker, on append'],
      ],
    },
  ],
  edges: [{ source: 'record', target: 'placement', label: 'append' }],
}
