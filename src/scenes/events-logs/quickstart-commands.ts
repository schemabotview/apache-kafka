import type { Scene } from '@graphlearning/flow'

// §1.5 — the local KRaft quick start for Kafka 4.1, as the official quick start gives it, with the
// topic created explicitly at three partitions (the shipped server.properties defaults to one).
export const quickstartCommands: Scene = {
  id: 'quickstart-commands',
  title: 'A local KRaft broker',
  flow: 'TB',
  nodes: [
    {
      id: 'setup',
      kind: 'code',
      filename: 'terminal — one-time setup',
      label: `# 1. give the new cluster an id, then format its storage
$ KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"
$ bin/kafka-storage.sh format --standalone \\
    -t $KAFKA_CLUSTER_ID -c config/server.properties

# 2. start one process that is both broker and controller
$ bin/kafka-server-start.sh config/server.properties`,
    },
    {
      id: 'topic',
      kind: 'code',
      filename: 'terminal — create and inspect the topic',
      label: `# 3. create the topic explicitly, with three partitions
$ bin/kafka-topics.sh --create --topic orders \\
    --partitions 3 --bootstrap-server localhost:9092

# 4. confirm what was created
$ bin/kafka-topics.sh --describe --topic orders \\
    --bootstrap-server localhost:9092`,
    },
  ],
  edges: [{ source: 'setup', target: 'topic', label: 'broker on :9092' }],
}
