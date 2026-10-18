import type { Section } from '../types'

// Plan §11.1 — topic administration, configuration changes, deletion, and offset-reset safeguards.
export const topicAdmin: Section = {
  id: 'administration-safeguards',
  title: 'Administration and safeguards',
  scene: 'topic-admin',
  focus: 'ops',
  slide: `## Administration and safeguards

Most day-to-day changes are a single command. What matters is **how hard each one is to undo**, and putting a safeguard in front of the irreversible ones.

### Reading the table
- Raising retention is easy to undo; **lowering** it deletes data within minutes
- Adding partitions and **deleting topics** cannot be undone at all
- An offset reset can only be reversed if the **old offsets** were saved

### Habits for every change
- Keep topic and config changes **as code**, reviewed before they apply
- **Record the current state** before changing it
- Use **previews** and dry runs wherever the tool offers them
- The topic's **owner** agrees, and its readers are told`,
  narration:
    "Operating Kafka day to day is mostly a matter of single commands: change a topic's retention, add partitions, reset a group, delete a topic. Each is easy to type. What separates a safe operation from an incident is knowing how hard each change is to undo. Raising retention is easy to undo, though check disk headroom first. Lowering it is not, because the broker deletes newly expired segments at its next retention check, within minutes, and a slow reader loses whatever it had not read yet. Adding partitions can never be undone, and it moves keys, as chapter two showed. Resetting a group's offsets can only be reversed if somebody saved the old offsets first. And deleting a topic is permanent. So put a safeguard in front of every irreversible change. Keep topic and configuration changes as code, in version control, reviewed before a pipeline applies them. Record the current state before changing anything: the configuration, the partition assignment, the group offsets. Use previews and dry runs wherever a tool offers them, as the offset reset did in chapter four. And make sure the topic's owner agrees, and its readers are told.",
}
