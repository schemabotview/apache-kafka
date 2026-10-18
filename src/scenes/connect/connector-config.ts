import type { Scene } from '@graphlearning/flow'

// §7.2 — creating a sink connector through the REST API. The connector class comes from a plugin
// installed on every worker; converters decide how Kafka bytes become connector records.
export const connectorConfig: Scene = {
  id: 'connector-config',
  title: 'Configuring a connector',
  flow: 'TB',
  nodes: [
    {
      id: 'request',
      kind: 'code',
      filename: 'POST /connectors — a third-party JDBC sink',
      label: `{
  "name": "orders-warehouse",
  "config": {
    "connector.class": "io.example.jdbc.JdbcSinkConnector",
    "tasks.max": "3",
    "topics": "orders",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable": "false",
    "connection.url": "jdbc:postgresql://warehouse:5432/sales",
    "insert.mode": "upsert"
  }
}`,
    },
    {
      id: 'layers',
      label: 'Who owns each setting',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'l-framework', label: 'Framework', sub: 'name, tasks.max, topics', pattern: 'service', icon: 'layers' },
        { id: 'l-converter', label: 'Converters', sub: 'bytes to records', pattern: 'network', icon: 'gears' },
        { id: 'l-plugin', label: 'Plugin', sub: 'connection, insert mode', pattern: 'external', icon: 'plug' },
        { id: 'l-install', label: 'Installed', sub: 'on every worker', pattern: 'warn', icon: 'package' },
      ],
    },
  ],
  edges: [{ source: 'request', target: 'layers', label: 'three layers' }],
}
