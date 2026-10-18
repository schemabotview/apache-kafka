import type { Scene } from '@graphlearning/flow'

// §4.8 — where a member starts reading. A committed offset always wins; auto.offset.reset only
// decides when there is none, or when it points at records retention has already deleted.
export const startingOffsets: Scene = {
  id: 'starting-offsets',
  title: 'Where a consumer starts',
  flow: 'TB',
  nodes: [
    { id: 'start', label: 'Member starts', sub: 'assigned orders-1', pattern: 'service', icon: 'power' },
    {
      id: 'decide',
      label: 'Is there a usable committed offset?',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'd-yes', label: 'Yes', sub: 'read from it', pattern: 'service', icon: 'circlecheck' },
        {
          id: 'd-no',
          label: 'No: auto.offset.reset decides',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'r-latest', label: 'latest', sub: 'default: only new records', pattern: 'warn', icon: 'clock' },
            { id: 'r-earliest', label: 'earliest', sub: 'everything retained', pattern: 'storage', icon: 'history' },
            { id: 'r-none', label: 'none', sub: 'fail: a person decides', pattern: 'external', icon: 'ban' },
          ],
        },
      ],
    },
    {
      id: 'causes',
      label: 'Why there may be none',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c-new', label: 'New group', sub: 'never committed', pattern: 'external', icon: 'users' },
        { id: 'c-expired', label: 'Expired', sub: 'group empty for 7 days', pattern: 'external', icon: 'calendar' },
        { id: 'c-deleted', label: 'Out of range', sub: 'retention deleted it', pattern: 'external', icon: 'trash' },
      ],
    },
  ],
  edges: [
    { source: 'start', target: 'decide' },
    { source: 'decide', target: 'causes', dashed: true, label: 'no, because' },
  ],
}
