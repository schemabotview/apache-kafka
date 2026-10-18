import type { Scene } from '@graphlearning/flow'

// §1.5 — three keyed orders in, the same three out, with partition and offset printed. The
// partitions are murmur2(key) mod 3, so this is the output the commands really produce.
export const firstPublishRead: Scene = {
  id: 'first-publish-read',
  title: 'Three orders in, three orders out',
  flow: 'TB',
  nodes: [
    {
      id: 'produce',
      kind: 'code',
      filename: 'terminal 1 — publish',
      label: `$ bin/kafka-console-producer.sh --topic orders \\
    --bootstrap-server localhost:9092 \\
    --property parse.key=true --property key.separator=:
>o-1041:{"total":12.50}
>o-1042:{"total":30.00}
>o-1040:{"total":8.75}`,
    },
    {
      id: 'consume',
      kind: 'code',
      filename: 'terminal 2 — read from the beginning',
      label: `$ bin/kafka-console-consumer.sh --topic orders \\
    --from-beginning --bootstrap-server localhost:9092 \\
    --property print.partition=true --property print.offset=true \\
    --property print.key=true
Partition:0   Offset:0   o-1040   {"total":8.75}
Partition:1   Offset:0   o-1041   {"total":12.50}
Partition:2   Offset:0   o-1042   {"total":30.00}`,
    },
  ],
  edges: [{ source: 'produce', target: 'consume', label: 'topic orders' }],
}
