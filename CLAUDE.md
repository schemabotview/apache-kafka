# Apache Kafka Learning Content Repo

## Role
You are an Apache Kafka expert and content creator. This repo contains educational content covering Apache Kafka concepts, primarily targeting the Confluent Certified Developer for Apache Kafka (CCDAK) exam and general Kafka platform / event-streaming knowledge.

See `../CLAUDE.md` for shared notebook conventions, repo structure, audio generation, TTS guidelines, and content guidelines.

## Local Setup

To run notebooks locally you need a running Kafka broker. The simplest path is Docker:

```bash
docker run -d --name kafka -p 9092:9092 apache/kafka:3.8.0
```

Python client for the hands-on cells:

```bash
pip install confluent-kafka==2.5.3
```

Optional extras used by specific notebooks:

```bash
pip install fastavro==1.9.4              # 05 Schema Registry & Serialization
pip install requests==2.32.3             # 05 Schema Registry REST calls
```

`bootstrap-cluster.ipynb` — one-time setup that creates the demo topics (`orders`, `payments`, `customers-compacted`) used across the curriculum. Run before any topic notebook.

## Content Guidelines

- Prefer the Python `confluent-kafka` client for code examples; reach for the Java/Kotlin client only when JVM-specific behavior (e.g. Kafka Streams) is the point
- Use real-world analogies — orders, payments, page views — over abstract `topic1`/`msg1` examples
- When showing CLI workflows, prefer the bundled `kafka-*.sh` scripts so examples translate to any cluster

## TTS Guidelines

`.tts` files are read aloud by ChatterboxTTS (typically via `generate_audio_colab.ipynb` on a T4 GPU). They must be plain spoken prose — what a teacher would say at a whiteboard.

- **Plain prose only** — no markdown, no `#` headings, no bullets, no backticks, no asterisks. Write section titles as a plain sentence ending with a full stop (e.g. `Consumer groups.`).
- **No raw code** — describe what code does conceptually or in pseudo-code form. Never paste code blocks. Method chains like `producer.send(...).get()` become "send the record, then wait for the acknowledgement."
- **Spell out symbols and shorthand:**
  - Operators: `//` → "floor division", `%` → "modulo", `->` → "returns", `=>` → "maps to", `.` (in `kafka.consumer`) → "dot"
  - Acronyms: RAM → "ram", CPU → "see-pee-you", API → "ay-pee-eye", JVM → "java virtual machine", GC → "garbage collector", ISR → "in-sync replicas" (spell out on first use), KRaft → "k-raft", SASL → "sazzle", SSL → "ess-ess-el", ACL → "ay-see-el", SMT → "single message transform" (spell out on first use), JMX → "jay-em-ex"
  - Hex / addresses: `0xFF` → "hex F-F", `0x0000` → "memory address zero"
  - Complexity: O(1) → "constant time", O(n) → "linear time", O(log n) → "log n time"
  - Versions: `3.8.0` → "three point eight point zero"
  - Variable names: underscores become spaces and common abbreviations get expanded — `consumer_group` → "consumer group", `min_isr` → "minimum in-sync replicas", `idx` → "index", `len` → "length", `topic_a` → "topic A"
- **Natural spoken flow** — write as a teacher explains at a whiteboard. Use transitional phrases: "notice that", "the key insight here is", "to put it another way", "picture this".
- **Skip visual-only content** — never narrate diagrams, tables, or console outputs. Describe what the listener should picture instead.
- **Pace with paragraph breaks** — each paragraph = one idea. A blank line between paragraphs gives the TTS engine a natural pause. Aim for 2–4 sentences per paragraph.
- **Filename convention** — `.tts` filename matches the notebook stem exactly: `01-kafka-foundations.ipynb` → `tts/01-kafka-foundations.tts` → `audio/01-kafka-foundations.wav`.

## Topics Covered

Curriculum is **8 thematic notebooks** sized for the Confluent Certified Developer for Apache Kafka (CCDAK) exam. Each notebook opens with a **"What's covered"** bulleted lede, uses inline code cells (concept → tiny demo → next concept), and folds the relevant gotchas (rebalance storms, offset-commit pitfalls, hot partitions, ISR shrinkage) inline where they apply. ksqlDB and the full Confluent Platform admin surface are intentionally out of scope.

| # | Topic | Notebook | Audio |
|---|---|---|---|
| — | Cluster Bootstrap & Demo Topics | `bootstrap-cluster.ipynb` | _(no audio)_ |
| 01 | Kafka Foundations & Architecture | `01-kafka-foundations-architecture.ipynb` | `01-kafka-foundations-architecture.wav` |
| 02 | Producers | `02-producers.ipynb` | `02-producers.wav` |
| 03 | Consumers & Consumer Groups | `03-consumers-consumer-groups.ipynb` | `03-consumers-consumer-groups.wav` |
| 04 | Topics, Partitions & Storage | `04-topics-partitions-storage.ipynb` | `04-topics-partitions-storage.wav` |
| 05 | Schema Registry & Serialization | `05-schema-registry-serialization.ipynb` | `05-schema-registry-serialization.wav` |
| 06 | Kafka Connect | `06-kafka-connect.ipynb` | `06-kafka-connect.wav` |
| 07 | Kafka Streams | `07-kafka-streams.ipynb` | `07-kafka-streams.wav` |
| 08 | Operations, Security & Performance Tuning | `08-operations-security-performance.ipynb` | `08-operations-security-performance.wav` |
