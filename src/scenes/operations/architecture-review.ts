import type { Scene } from '@graphlearning/flow'

// §11.8 — the review questions the course has built up, one per area, each answered with evidence
// rather than intent.
export const architectureReview: Scene = {
  id: 'architecture-review',
  title: 'An architecture review',
  flow: 'TB',
  nodes: [
    {
      id: 'questions',
      kind: 'table',
      label: 'Reviewing the orders platform',
      sub: 'each answer needs evidence, not intent',
      headers: ['Area', 'Question', 'Evidence'],
      values: [
        ['contracts', 'can the schema change safely?', 'compatibility check in CI'],
        ['ordering', 'which events must stay in order?', 'key and topic choice'],
        ['duplicates', 'what happens on a repeat?', 'dedupe test, replay test'],
        ['durability', 'which failures lose data?', 'failure matrix, settings'],
        ['security', 'who can read orders?', 'ACL listing, audit log'],
        ['capacity', 'how fast is catch-up?', 'measured recovery run'],
        ['recovery', 'is recovery proven?', 'rehearsal record'],
      ],
    },
    { id: 'next', label: 'Then evolve it', sub: 'check current docs before each change', pattern: 'service', icon: 'repeat' },
  ],
  edges: [{ source: 'questions', target: 'next', dashed: true }],
}
