# CLAUDE.md — apache-kafka

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*.

## What this repo is

The GraphL concept app for **Apache Kafka**: one concept, 11 courses, each course a list of
sections. A **section** is `(scene, slide, narration)` and is one segment of the course video. One
section = one slide.

`APACHE-KAFKA-COURSE-PLAN.md` is the syllabus and the source of scope: audience, the Kafka 4.1.x
baseline, the retail-orders running example, and the 11 chapters / 83 numbered plan sections. A
**plan section is a conceptual unit, not a repo section** — one plan section becomes one or more
repo sections (slides), never fewer.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version** (`flow@^1.2.0`, `shell@^0.8.0`). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css` — nothing else.

## Route contract and course arc

Routes are `#/<courseId>-<sectionId>`; `#/` is the catalog. Course ids, in syllabus order (plan
chapter → course id → publish title in `scripts/titles.json`):

| ch | course id | plan sections |
| --- | --- | --- |
| 1 | `events-logs` | 6 |
| 2 | `partitioning-contracts` | 7 |
| 3 | `producers` | 7 |
| 4 | `consumers` | 8 |
| 5 | `storage-replication` | 8 |
| 6 | `delivery-guarantees` | 8 |
| 7 | `connect` | 8 |
| 8 | `streams` | 8 |
| 9 | `security` | 7 |
| 10 | `performance` | 8 |
| 11 | `operations` | 8 |

Files: `src/content/<course>/NN-<section-id>.ts`, `src/scenes/<course>/<scene-id>.ts`,
`public/audio/<course>/<section-id>.wav`. Each `public/audio/<course>/` exists with a `.gitkeep`
(`npm run check` reads every entry there as a course folder).

**`COURSES` must never be empty**: the shell throws `Cannot read properties of undefined (reading
'sections')` on `#/` and renders a blank page. `events-logs` is registered with `sections: []` for
that reason until its first section lands.

## Scene inventory

One row per scene: id, shape, and the section that uses it. Partition numbers in every scene are
real: `murmur2(key) mod partitions`, as Kafka's default partitioner computes it (o-1040 → 0,
o-1041 → 1, o-1042 → 2, o-1043 → 1, o-1047 → 0, o-1050 → 1 for 3 partitions; region keys eu → 1,
us → 1, apac → 2). Keep new examples consistent with that, or recompute.

| course | scene | shape | section |
| --- | --- | --- | --- |
| events-logs | `event-command-state` | diagram | `events-commands-state` |
| events-logs | `sync-vs-log` | diagram, two columns | `why-asynchronous` |
| events-logs | `integration-styles` | 2×2 containers | `integration-styles` |
| events-logs | `retained-log` | diagram | `reading-does-not-delete` |
| events-logs | `record-anatomy` | two tables | `record-anatomy` |
| events-logs | `topic-partitions` | nested containers | `topics-partitions-offsets` |
| events-logs | `cluster-roles` | nested containers | `brokers-producers-consumers` |
| events-logs | `quickstart-commands` | two code cards | `local-kraft-quickstart` |
| events-logs | `first-publish-read` | two code cards | `publish-and-read` |
| events-logs | `reader-resumes` | code card + 2×2 cards | `groups-resume` |
| events-logs | `local-limits` | containers + code card | `local-limits` |
| partitioning-contracts | `topic-boundaries` | 2 containers | `topic-boundaries` |
| partitioning-contracts | `topic-ownership` | table + containers | `topic-ownership-naming` |
| partitioning-contracts | `key-choices` | 2×2 containers | `choosing-keys` |
| partitioning-contracts | `hot-partition` | nested containers | `hot-keys` |
| partitioning-contracts | `event-time` | table + containers | `order-and-event-time` |
| partitioning-contracts | `adding-partitions` | nested containers | `adding-partitions` |
| partitioning-contracts | `serialization` | diagram | `serialization` |
| partitioning-contracts | `compatibility-modes` | table + code card | `compatibility` |
| partitioning-contracts | `evolution-cases` | table + containers | `evolution-cases` |
| partitioning-contracts | `schema-registry` | containers + table | `schema-registry` |
| partitioning-contracts | `event-contract` | code card + 2×2 cards | `event-contract` |
| producers | `producer-lifecycle` | code card + 2×2 cards | `producer-lifecycle` |
| producers | `metadata-discovery` | table + containers | `metadata-discovery` |
| producers | `async-send` | code card + 2×2 cards | `async-send` |
| producers | `where-errors-surface` | table + containers | `publish-errors` |
| producers | `batching` | nested containers | `batching` |
| producers | `throughput-latency` | table + containers | `throughput-latency` |
| producers | `acks-levels` | table + nested containers | `acks` |
| producers | `lost-ack` | table + containers | `lost-acknowledgement` |
| producers | `retry-reorder` | containers | `retry-reordering` |
| producers | `idempotent-producer` | table + containers | `idempotent-producer` |
| producers | `business-duplicates` | table + 2×2 cards | `business-duplicates` |
| consumers | `poll-loop` | code card + 2×2 cards | `poll-loop` |
| consumers | `positions` | 2×2 cards + table | `positions-and-commits` |
| consumers | `commit-windows` | table + 2×2 cards | `commit-crash-windows` |
| consumers | `explicit-commit` | code card + 2×2 cards | `explicit-commits` |
| consumers | `group-assignment` | nested containers | `group-assignment` |
| consumers | `rebalance` | table + containers | `rebalances` |
| consumers | `group-protocols` | table + 2×2 cards | `group-protocols` |
| consumers | `liveness` | nested containers + table | `liveness` |
| consumers | `bounded-concurrency` | code card + 2×2 cards | `pause-and-concurrency` |
| consumers | `starting-offsets` | nested containers | `starting-offsets` |
| consumers | `offset-reset` | code card + 2×2 cards | `safe-offset-reset` |
| storage-replication | `log-segments` | nested containers | `log-segments` |
| storage-replication | `replicas-isr` | containers + table | `leaders-followers-isr` |
| storage-replication | `failure-matrix` | table + 2×2 cards | `durability-settings` |
| storage-replication | `min-isr-one` | table + containers | `min-isr-default` |
| storage-replication | `high-watermark` | table + stacked cards | `high-watermark` |
| storage-replication | `leader-election` | containers | `leader-election` |
| storage-replication | `availability-loss` | nested containers | `availability-or-data` |
| storage-replication | `kraft-planes` | containers + table | `kraft-controllers` |
| storage-replication | `quorum-loss` | table + 2×2 cards | `quorum-loss` |
| storage-replication | `retention` | table + stacked cards | `retention-and-replay` |
| storage-replication | `compaction` | two tables | `log-compaction` |
| storage-replication | `compaction-timing` | table + 2×2 cards | `compaction-timing` |
| delivery-guarantees | `delivery-semantics` | nested containers | `delivery-semantics` |
| delivery-guarantees | `transactions-api` | code card + containers | `kafka-transactions` |
| delivery-guarantees | `fencing` | table + stacked cards | `zombie-fencing` |
| delivery-guarantees | `isolation` | table + containers | `consumer-isolation` |
| delivery-guarantees | `eos-boundary` | two columns | `exactly-once-boundary` |
| delivery-guarantees | `payment-failures` | table + code card + containers | `external-idempotency` |
| delivery-guarantees | `dedup-state` | code card + 2×2 cards | `deduplication-state` |
| delivery-guarantees | `dual-write` | containers + table | `dual-write` |
| delivery-guarantees | `outbox` | diagram | `transactional-outbox` |
| delivery-guarantees | `retry-topics` | containers + table | `poison-records` |
| delivery-guarantees | `replay-correctness` | table + stacked cards | `replay-correctness` |
| connect | `connect-roles` | nested containers | `connect-roles` |
| connect | `distributed-mode` | table + stacked cards | `distributed-workers` |
| connect | `connector-config` | code card + 2×2 cards | `connector-configuration` |
| connect | `connect-offsets` | containers + two tables | `connect-offsets` |
| connect | `rest-lifecycle` | code card + 2×2 cards | `rest-lifecycle` |
| connect | `transforms` | code card + table | `single-message-transforms` |
| connect | `error-tolerance` | table + 2×2 cards | `error-tolerance` |
| connect | `cdc-snapshot` | table + stacked cards | `cdc-snapshot-stream` |
| connect | `sink-repeat` | table + 2×2 cards | `connector-guarantees` |
| connect | `connect-or-custom` | table + stacked cards | `connect-or-custom` |
| streams | `sales-topology` | code card + 2×2 cards | `streams-library` |
| streams | `tasks-threads` | nested containers | `tasks-and-threads` |
| streams | `stream-table` | table + nested tables | `stream-table-duality` |
| streams | `repartition` | two columns | `repartitioning` |
| streams | `state-stores` | containers + table | `state-stores` |
| streams | `restoration` | table + 2×2 cards | `state-restoration` |
| streams | `windows-grace` | table + stacked cards | `windows-and-grace` |
| streams | `joins` | nested containers + stacked cards | `joins` |
| streams | `join-outputs` | two tables | `join-outputs` |
| streams | `output-semantics` | two tables + containers | `output-semantics` |
| streams | `testing-boundaries` | code card + table | `testing-and-boundaries` |

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error.
  `check` fails over 1000 modelled design px; the band below gives the floor too. Bullets cost far
  more than prose of the same length.
  The model runs a little HIGH: a slide modelling 930–1000 typically renders 865–960. A line within a
  few characters of the ~53-character bullet width wraps in the model but not on screen, which is how
  a slide can render at 0.85 and still fail `check` — reword the boundary line rather than cutting
  content.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card, or whether the frame is too
empty. Look at the route. Neither it nor `density` catches **text too small to read**: a code card
with very long lines (fully qualified class names, say) widens the board until fitView shrinks every
glyph. Keep code lines under ~70 characters, and move long names into a table.

### Density targets — the frame must use the space it has

The guarded failure is a slide that overflows. The unguarded one is its opposite: a frame that
builds green, reads correctly, and leaves half its pane empty. Against the ~1080 design px pane:

| | target | why |
| --- | --- | --- |
| slide height | **80–95 %** of the pane (≈ 865–1025px; `SLIDE_H_MAX` caps the top at 1000) | below 80 % the right half looks empty; above ~95 % it risks clipping |
| scene, binding axis | ≥ 0.85 of the pane | the board should reach the edge it is limited by |
| scene, area | ≥ 0.55 of the pane (w × h) | a wide board that fills the width but a third of the height wastes the pane |
| eyebrow | no node under the top-left eyebrow label | boards that bind on height run up to y≈30 |

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it (0.12–0.17) for tall boards that touch
the eyebrow.

`npm run density` (`scripts/density.mjs`) measures all four on the rendered routes; it starts its own
Vite server, so no dev server is needed. `-- <course>` limits it to one course, `--shots <dir>` saves a
PNG per route. A deliberately sparse board says so with `// density-accept: <reason>` in its section
file. `check` models no density at all. The two ratios come
from one repo's ~80 frames of diagram-and-code-card boards, so a deliberately sparse board can sit
under them. Targets, not thresholds.

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check && npm run density
```

All three are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
