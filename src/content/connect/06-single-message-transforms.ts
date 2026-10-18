import type { Section } from '../types'

// Plan §7.5 — transformations and predicates.
export const transforms: Section = {
  id: 'single-message-transforms',
  title: 'Single message transforms',
  scene: 'transforms',
  focus: 'classes',
  slide: `## Single message transforms

A **single message transform**, or SMT, changes one record at a time as it passes through a connector. Several can be chained, and a **predicate** limits one to matching records.

### This chain, in order
- **MaskField** blanks the email and phone fields
- **InsertField** adds the origin database
- **Filter**, with the **RecordIsTombstone** predicate, drops tombstones
- All three ship **with Kafka**

### Keep them small
- SMTs see **one record**: no joins, lookups or aggregation
- Business logic belongs in a **stream processor** or application
- Masking at the source keeps sensitive data **out of Kafka** entirely
- Every transform runs on **every record**, so a slow one slows the connector`,
  narration:
    "Sometimes a record needs a small change on its way through a connector, and single message transforms handle that without any custom code. A transform takes one record and returns one record, changed, or none at all. Several can be chained, and they run in the order they are listed. This source connector chains three, all of which ship with Kafka. Mask field blanks out the email and phone fields of the value, so that personal details never reach Kafka at all. Insert field adds a field naming the origin database, which is useful once several regions feed the same topic. And filter drops records. On its own it would drop everything, so it is paired with a predicate, record is tombstone, which limits it to records with a null value. So only deletions are dropped. The important limit is in the name: single message. A transform sees one record at a time, with no access to other records, other topics, or external lookups. So joins, enrichment and aggregation do not belong here. Business logic belongs in a stream processor, or in an application, where it can be tested properly.",
}
