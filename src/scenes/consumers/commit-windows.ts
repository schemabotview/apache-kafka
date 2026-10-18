import type { Scene } from '@graphlearning/flow'

// §4.3 — where a crash lands relative to the commit decides the outcome. Committing after the work
// replays on a crash; committing before it, or handing work to another thread, can skip records.
export const commitWindows: Scene = {
  id: 'commit-windows',
  title: 'Crash windows around a commit',
  flow: 'TB',
  nodes: [
    {
      id: 'cases',
      kind: 'table',
      label: 'Batch of offsets 7 to 9, then a crash',
      sub: 'what the restarted member does',
      headers: ['Order of steps', 'Crash lands', 'On restart'],
      values: [
        ['process, then commit 10', 'after processing', 'replays 7 to 9'],
        ['process, then commit 10', 'after the commit', 'nothing lost or repeated'],
        ['commit 10, then process', 'between the two', 'skips 7 to 9: lost'],
        ['auto-commit, async workers', 'workers unfinished', 'can skip: lost'],
      ],
    },
    {
      id: 'rule',
      label: 'The rule',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'r-after', label: 'Commit after', sub: 'the work is done: replays', pattern: 'service', icon: 'circlecheck' },
        { id: 'r-before', label: 'Commit before', sub: 'the work is done: loses', pattern: 'warn', icon: 'ban' },
        { id: 'r-auto', label: 'Auto-commit', sub: 'safe only for in-loop work', pattern: 'external', icon: 'clock' },
        { id: 'r-replay', label: 'Replays', sub: 'made harmless in chapter 6', pattern: 'storage', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'cases', target: 'rule', label: 'so' }],
}
