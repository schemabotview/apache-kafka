import type { Scene } from '@graphlearning/flow'

// §6.5 — deduplication when the effect is in our own database: record the eventId in the SAME
// database transaction as the effect, so both happen or neither does.
export const dedupState: Scene = {
  id: 'dedup-state',
  title: 'Deduplicating in the database',
  flow: 'TB',
  nodes: [
    {
      id: 'sql',
      kind: 'code',
      filename: 'one database transaction per event',
      label: `BEGIN;
INSERT INTO processed_events (event_id) VALUES ('7f3c…6a13');
    -- duplicate key? the event was handled: ROLLBACK and skip
UPDATE stock SET reserved = reserved + 1 WHERE sku = 'mug-blue';
COMMIT;
-- only now commit the Kafka offset`,
    },
    {
      id: 'outcomes',
      label: 'Crash anywhere, then replay',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'o-before', label: 'Before COMMIT', sub: 'nothing kept: redo it', pattern: 'service', icon: 'repeat' },
        { id: 'o-after', label: 'After COMMIT', sub: 'duplicate key: skip it', pattern: 'service', icon: 'circlecheck' },
        { id: 'o-offset', label: 'Offset late', sub: 'replay is harmless', pattern: 'service', icon: 'shieldcheck' },
        { id: 'expire', label: 'Keep the ids', sub: 'for the replay horizon', pattern: 'warn', icon: 'calendar' },
      ],
    },
  ],
  edges: [{ source: 'sql', target: 'outcomes', label: 'so' }],
}
