# apache-kafka

The GraphL concept app for **Apache Kafka** — from event-streaming foundations to reliable
production systems, in 11 courses. Each section is a scene (left), a slide (right) and a narration
clip, and is one segment of the course video.

The syllabus is [`APACHE-KAFKA-COURSE-PLAN.md`](APACHE-KAFKA-COURSE-PLAN.md) (Kafka 4.1.x baseline,
KRaft only, a retail-orders running example). Scaffolded from
[`schemabotview/content-repo-template`](https://github.com/schemabotview/content-repo-template).

```sh
npm install
npm run dev          # http://localhost:5173
```

## The content model

- **concept ⊃ course ⊃ section.** A **section** is the atomic unit of a video:
  `(scene, slide, narration)`. One section = one slide.
- **Left = scene, right = slide.** The scene is a react-flow diagram *or* a code card — both
  rendered by `@graphlearning/flow`. The slide is markdown.
- **Scenes are declarative.** Nodes, edges and nesting only; the engine computes every position and
  size. **Never write x or y.**
- Narration wavs come from a Colab + Chatterbox pass (`scripts/colab_generate_audio.ipynb`), never
  by hand.

## What is in here

```
src/content/    courses → sections (one file per section) + registry
src/scenes/     hand-authored scenes + registry
src/main.tsx    mounts <ConceptApp> from @graphlearning/shell
src/theme.css   --brand / --brand-hover / --accent-2 — the repo's whole design surface
scripts/        check-content.mjs · colab notebook · concept.json · titles.json
public/audio/<course>/    narration wavs
.github/workflows/deploy.yml    Pages deploy on push to main
```

## Verifying a change

```sh
npm run build        # must be clean
npx tsc --noEmit     # must be clean
npm run check        # content budgets: card overflow, slide clipping, dead focus, missing wavs
```

…and **the section looked at in the browser** — the three commands pass on frames that are visually
wrong. Routes are `#/<course>-<section>`, e.g. `#/events-logs-why-events`. `#/` is the catalog.
