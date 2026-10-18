import type { Scene } from '@graphlearning/flow'

// §7.5 — what errors.tolerance and the dead-letter topic cover, and what they do not. They handle
// conversion and transform failures, and sink-side record failures; not everything.
export const errorTolerance: Scene = {
  id: 'error-tolerance',
  title: 'Error tolerance and its limits',
  flow: 'TB',
  nodes: [
    {
      id: 'settings',
      kind: 'table',
      label: 'Connector error settings',
      sub: 'defaults: fail fast, retry nothing, log nothing',
      headers: ['Setting', 'Default', 'Common choice'],
      values: [
        ['errors.tolerance', 'none: task fails', 'all: skip bad records'],
        ['errors.retry.timeout', '0', '5 minutes'],
        ['errors.log.enable', 'false', 'true'],
        ['errors.deadletterqueue.topic.name', 'empty', 'orders-warehouse-dlq'],
      ],
    },
    {
      id: 'covers',
      label: 'What tolerance covers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'c-convert', label: 'Conversion', sub: 'bad JSON, wrong schema', pattern: 'service', icon: 'braces' },
        { id: 'c-transform', label: 'Transforms', sub: 'a failing SMT', pattern: 'service', icon: 'gears' },
        { id: 'c-dlq', label: 'Dead letters', sub: 'sink connectors only', pattern: 'warn', icon: 'ban' },
        { id: 'c-silent', label: 'Silent skips', sub: 'all without a DLQ loses data', pattern: 'warn', icon: 'trash' },
      ],
    },
  ],
  edges: [{ source: 'settings', target: 'covers', label: 'applies to' }],
}
