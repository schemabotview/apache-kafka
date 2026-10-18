import type { Section } from '../types'

// Plan §7.6 — CDC snapshots, ongoing changes, deletes, and source-specific ordering.
export const cdcSnapshot: Section = {
  id: 'cdc-snapshot-stream',
  title: 'Change data capture',
  scene: 'cdc-snapshot',
  focus: 'timeline',
  slide: `## Change data capture

**Change data capture** turns a database's own change log into Kafka records. It starts with a **snapshot** of existing rows, then **streams** every change.

### What arrives
- Snapshot rows arrive as **reads**, then inserts, updates and deletes as they happen
- Updates can carry both the **before** and **after** row
- A delete becomes a delete event, then a **tombstone** for compaction

### What depends on the source
- The handover from snapshot to log must leave **no gap**
- The database must **keep its log** long enough for the connector
- Ordering is per **row key**, and transactions may span several records
- Schema changes in the database become **schema changes** in the topic
- The connector needs database **permissions** to read the log, set up by a DBA`,
  narration:
    "Change data capture is the integration pattern that the outbox in chapter six relied on. Instead of querying a table, a CDC connector reads the database's own change log, the same log the database uses for replication, and turns each change into a Kafka record. The usual connectors, such as Debezium, are third-party, so the details here vary by connector and by database. A CDC connector starts with a snapshot. It reads every existing row and publishes each one as a read event. Then it switches to streaming, and publishes every insert, update and delete as it happens. Updates can carry both the row before and after the change. A delete becomes a delete event, followed by a tombstone, so that a compacted topic eventually forgets the row. Several properties depend on the source, and are worth checking in the connector's documentation. The handover from snapshot to log has to leave no gap and no unexplained duplicate. The database has to keep its log long enough for the connector to read it, even after an outage. And ordering is per row key, not global, with database transactions possibly spread over several records.",
}
