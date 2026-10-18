import type { Scene } from '@graphlearning/flow'

// §2.6 — five schema changes under Avro's resolution rules, checked in both directions. A missing
// field is filled from the READER's default; an unknown field is ignored.
export const evolutionCases: Scene = {
  id: 'evolution-cases',
  title: 'Five schema changes, both directions',
  flow: 'TB',
  nodes: [
    {
      id: 'cases',
      kind: 'table',
      label: 'Avro: does the read still work?',
      sub: 'old = version 1 schema, new = version 2',
      headers: ['Change in v2', 'Old reader, new data', 'New reader, old data'],
      values: [
        ['add field with default', 'yes: ignores it', 'yes: uses the default'],
        ['add field, no default', 'yes: ignores it', 'NO: nothing to fill'],
        ['remove field with default', 'yes: uses its default', 'yes: ignores it'],
        ['remove field, no default', 'NO: nothing to fill', 'yes: ignores it'],
        ['rename a field', 'NO', 'NO, unless aliased'],
      ],
    },
    {
      id: 'rules',
      label: 'The two rules behind every row',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-unknown', label: 'Unknown field', sub: 'the reader skips it', pattern: 'service', icon: 'scissors' },
        { id: 'r-missing', label: 'Missing field', sub: "needs the reader's default", pattern: 'warn', icon: 'search' },
      ],
    },
  ],
  edges: [{ source: 'cases', target: 'rules', label: 'why' }],
}
