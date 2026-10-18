import type { Scene } from '@graphlearning/flow'

// §9.4 — granting the matrix with kafka-acls. --producer and --consumer are shorthands for the
// operations those roles need; prefixed patterns cover families of names.
export const aclCommands: Scene = {
  id: 'acl-commands',
  title: 'Granting ACLs',
  flow: 'TB',
  nodes: [
    {
      id: 'cmds',
      kind: 'code',
      filename: 'terminal — admin client config omitted',
      label: `$ bin/kafka-acls.sh --bootstrap-server kafka-1:9092 \\
    --add --allow-principal User:svc-checkout --producer --topic orders

$ bin/kafka-acls.sh --bootstrap-server kafka-1:9092 \\
    --add --allow-principal User:svc-fulfilment \\
    --consumer --topic orders --group fulfilment

$ bin/kafka-acls.sh --bootstrap-server kafka-1:9092 \\
    --list --topic orders`,
    },
    {
      id: 'shorthands',
      kind: 'table',
      label: 'What the shorthands grant',
      sub: 'on the named topic and group',
      headers: ['Flag', 'Operations'],
      values: [
        ['--producer', 'Write, Describe, Create on the topic'],
        ['--consumer', 'Read, Describe on topic; Read on group'],
        ['prefixed', '--resource-pattern-type prefixed'],
      ],
    },
  ],
  edges: [{ source: 'cmds', target: 'shorthands', label: 'expands to' }],
}
