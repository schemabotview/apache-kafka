import type { Section } from '../types'

// Plan §4.8 — safe replay and reset procedures with a stopped group and a bounded range.
export const offsetReset: Section = {
  id: 'safe-offset-reset',
  title: 'A safe, bounded replay',
  scene: 'offset-reset',
  focus: 'preview',
  slide: `## A safe, bounded replay

Replaying on purpose means **moving the committed offsets** of a group. Done carelessly, it reprocesses far more than intended, or skips data.

### The safe sequence
- **Stop every member**: the tool requires an inactive group
- Run **--reset-offsets** without --execute: it only **previews** the new offsets
- Check each partition's new offset against what you meant to replay
- Repeat with **--execute**, then restart the group

### Bounding the replay
- **--to-datetime** picks the first offset at or after a time, per partition
- Readers must tolerate the **repeats** a replay causes
- **--shift-by**, **--to-offset** and **--to-earliest** are the other common choices
- A time-based reset uses record **timestamps**, which producers set`,
  narration:
    "Sometimes you want a group to read records again, for example after fixing a bug that mishandled the last hour of orders. That means moving the group's committed offsets, and done carelessly it either replays far more than intended, or skips data entirely. Here is the safe sequence. First, stop every member of the group. The tool requires that, because a running member would immediately overwrite the reset with its own commits. Then run kafka consumer groups with reset offsets, but without execute. Without execute, the tool only prints the plan. Here, to datetime nine o'clock picks, for each partition, the first offset at or after that time: twelve, thirty-one and nine. Check those numbers against what you meant to replay, partition by partition. Then run exactly the same command again, adding execute, and restart the group. It will reprocess everything from those offsets onwards. Two cautions. A reset by time uses record timestamps, which come from producers. And every reader of the replayed records must tolerate seeing them twice, which, once again, is chapter six's subject.",
}
