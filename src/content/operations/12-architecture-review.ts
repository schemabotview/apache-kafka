import type { Section } from '../types'

// Plan §11.8 — an architecture review spanning monitoring, failures, and evolution.
export const architectureReview: Section = {
  id: 'architecture-review',
  title: 'An architecture review',
  scene: 'architecture-review',
  focus: 'questions',
  slide: `## An architecture review

A design is only as good as the **evidence** behind it. This review asks one question per area, and accepts only evidence as an answer.

### The questions
- **Contracts**: can the schema change safely? A compatibility check in CI
- **Duplicates**: is a repeat harmless? A tested replay
- **Durability**: which failures lose data? The failure matrix and settings
- **Recovery**: is it proven? A rehearsal record

### Keep evolving it
- Every workload brings new **contracts** and failure assumptions
- Check **current documentation** before implementing or upgrading anything
- **Ordering**, **security** and **capacity** get the same treatment, with their own evidence
- Repeat the review after every **significant change**, not only at launch`,
  narration:
    "The last step is to review the design as a whole, and the rule for this review is simple: every answer must be evidence, not intention. For contracts, can the schema change safely? The evidence is a compatibility check that runs in the build, not a promise to be careful. For ordering, which events must stay in order? The evidence is the key and topic choice, written down with its reasoning. For duplicates, what happens when a record is processed twice? The evidence is a test that replays records and shows the outcome is unchanged. For durability, which failures lose data? The failure matrix, and the settings that produce it. For security, who can read orders? The ACL listing, and the audit log. For capacity, how quickly does fulfilment catch up after an hour's outage? A measured recovery run. And for recovery, has it been proven? A rehearsal, with a record of what happened. From here, continue by taking another workload through the same questions, revisiting its contracts and its failure assumptions, and always checking current documentation before implementing or upgrading a real system.",
}
