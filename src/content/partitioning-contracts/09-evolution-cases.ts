import type { Section } from '../types'

// Plan §2.6 — old/new reader and writer compatibility cases, under Avro resolution rules.
export const evolutionCases: Section = {
  id: 'evolution-cases',
  title: 'Five schema changes',
  scene: 'evolution-cases',
  focus: 'cases',
  slide: `## Five schema changes

Every row in this table follows from two Avro rules, applied to the **reader's** schema, not the writer's.

### The two rules
- An **unknown** field in the data is skipped
- A **missing** field must have a **default** in the reader's schema, or the read fails

Protobuf and JSON Schema have their own rules; this table is Avro's.

### Reading the cases
- Adding or removing a field **with a default** is safe both ways
- Adding a field without a default breaks **new readers** of old data
- Removing a field without a default breaks **old readers** of new data
- Changing a field's **type** is usually unsafe in both directions
- A rename looks like a removal plus an addition, so it breaks both, unless the reader declares an **alias**`,
  narration:
    "Here are five common schema changes, each checked in both directions, under Avro's rules. Protobuf and JSON Schema have their own rules, so treat this table as Avro-specific. Every row follows from just two rules, both applied to the reader's schema. First, if the data contains a field the reader does not know, the reader skips it. Second, if the reader expects a field the data does not contain, it needs a default for that field in its own schema, or the read fails. Now the rows. Adding a field with a default: old readers skip it, and new readers use the default for old records. Safe both ways. Adding a field with no default: old readers are still fine, but a new reader meeting an old record has nothing to fill the field with, and fails. Removing a field that had a default is safe, and removing one without a default breaks old readers of new data. A rename is the nasty one. To Avro it is a removal plus an addition, so it fails both ways, unless the new reader declares the old name as an alias. A registry can run exactly these checks before a new version is accepted.",
}
