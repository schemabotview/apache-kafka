import type { Scene } from '@graphlearning/flow'

// §7.5 — single message transforms, applied one record at a time between the connector and Kafka.
// A predicate limits a transform to matching records. All three transforms here ship with Kafka.
export const transforms: Scene = {
  id: 'transforms',
  title: 'Single message transforms',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'source connector config — the transform chain',
      label: `transforms=mask,source,dropDeletes
transforms.mask.fields=email,phone
transforms.source.static.field=origin
transforms.source.static.value=eu-orders-db
transforms.dropDeletes.predicate=isTombstone
predicates=isTombstone
# each alias also sets .type to a class, below`,
    },
    {
      id: 'classes',
      kind: 'table',
      label: 'The classes, in org.apache.kafka.connect.transforms',
      sub: 'applied in the order listed, to each record',
      headers: ['Alias', 'Class', 'Does'],
      values: [
        ['mask', 'MaskField$Value', 'blanks email and phone'],
        ['source', 'InsertField$Value', 'adds origin'],
        ['dropDeletes', 'Filter', 'drops matching records'],
        ['isTombstone', 'predicates.RecordIsTombstone', 'matches null values'],
      ],
    },
  ],
  edges: [{ source: 'config', target: 'classes', label: 'types' }],
}
