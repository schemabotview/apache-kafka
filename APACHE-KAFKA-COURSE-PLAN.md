# Apache Kafka — From Event-Streaming Foundations to Reliable Production Systems

## Audience and prerequisites

For data engineers, backend developers, and platform engineers new to Kafka. Basic programming, command-line use, processes, networking, and JSON are expected. Basic Java classes, exceptions, callbacks, and collections are required for client and Kafka Streams examples; the [Java plan](JAVA-COURSE-PLAN.md) supplies that foundation. SQL helps with CDC/database illustrations. Distributed logs, replication, and streaming concepts are taught here; Spark, Kubernetes, and cloud accounts are not prerequisites.

Scope: Kafka's record/log model, event contracts, Java producers and consumers, replication and KRaft, processing guarantees, Connect, Kafka Streams, security, performance, and operational recovery. Target capability: interpret code and execution evidence, reason about failures, and justify an event-streaming design. Individual mastery is not assessed.

Reference baseline: **Apache Kafka 4.1.x**, deliberately fixed rather than presented as the latest release. Use the corresponding Java clients and Kafka Streams library. Teach KRaft; ZooKeeper appears only as historical context. Client defaults, consumer protocols, connector capabilities, and upgrade procedures need version-specific checks when lessons are authored.

Structure: **11 chapters / 83 sections**, with section counts of 6, 7, 7, 8, 8, 8, 8, 8, 7, 8, 8. Counts follow conceptual scope rather than equal duration.

## Learning spine

Motivation and first record → event contracts and partitioning → publishing → consumption and progress → durability internals → processing correctness → external integration → stateful computation → access and governance → performance evidence → operational evolution.

A first observable result anchors the terminology. Client crash windows create the questions that storage and replication answer; those guarantees then support transactions, connectors, and stateful computation. Security awareness starts with local isolation and sensitive fields, with specialist depth after component responsibilities are clear. Performance tuning follows correctness so tuning choices preserve declared guarantees.

Recurring example: retail orders keyed by order identifier, consumed independently by fulfilment and analytics. Introduce malformed records, duplicate submissions, hot keys, late events, failed consumers, broker loss, database integration, sales aggregates, and regional recovery. Payment examples explain external-effect boundaries rather than propose a production payment system.

Teaching method: objective → mental model → annotated code/configuration or execution trace → expected result → failure contrast → outcome and bridge. Use Java for clients/Streams and console commands for first contact; Python client comparisons are optional and must name their separate library semantics. Docker may support lecturer demonstrations but is not itself taught. Following along is optional; there are no submitted exercises or learner monitoring.

YouTube delivery: chapters form playlist milestones; numbered sections are conceptual units that may span videos. Each video should state its question, recap only its immediate prerequisites, show a visible result or timeline, and point to the next dependency. Do not impose video duration or a one-section/one-video quota. Provide readable diagrams, small record tables, supplied outputs, and clear single-broker versus multi-broker labels. This plan specifies demonstrations; it does not include lessons, scripts, or executed labs.

## Chapter 1 — Events, Logs, and a First Kafka Pipeline

Objective: Explain the problem Kafka solves and trace a record through a minimal system.

1. Events, commands, state, and the need for asynchronous communication
2. Compare request/response, work queues, batch transfers, and retained event logs
3. Records, keys, values, headers, timestamps, topics, partitions, and offsets
4. Brokers, producers, consumers, and independent consumer groups
5. Trace a local KRaft quick start: create a topic, publish orders, and read records
6. Local-only configuration, explicit topic creation, safe cleanup, and the limits of a single broker

Worked illustrations: A three-order console transcript with partition/offset annotations; two independent readers; a disconnected reader that resumes. Explain why consuming a record does not delete it. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Justify Kafka for a replayable order stream and interpret the first publish/read trace.

Bridge: Next, design events and topic boundaries around business meaning and ordering needs.

## Chapter 2 — Partitioning, Ordering, and Event Contracts

Objective: Design events and topic boundaries around business meaning and ordering needs.

1. Choose topic boundaries, ownership, naming, and event granularity
2. Keys determine routing: entity ordering, parallelism, and hot keys
3. Partition-local offsets and order versus global order and business event time
4. Partition-count changes and the consequences for key placement
5. Serialization and deserialization: bytes, JSON, and typed schema formats
6. Schema evolution, compatibility direction, defaults, and consumer expectations
7. Registry responsibilities, event identifiers, sensitive fields, and contract validation

Worked illustrations: An order-key partition diagram; the same events arriving out of time order; old/new reader and writer compatibility cases. Distinguish a schema registry from Apache Kafka itself. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Compare topic/key designs and explain contract changes that can break downstream consumers.

Bridge: Next, explain how producer settings and failures affect the meaning of a successful send.

## Chapter 3 — Producers and Publish Outcomes

Objective: Explain how producer settings and failures affect the meaning of a successful send.

1. Java producer lifecycle, serializers, metadata discovery, and resource cleanup
2. Asynchronous sends, callbacks, flush, close, and application error handling
3. Batches, compression, buffering, and throughput/latency trade-offs
4. Acknowledgements and the meaning of broker acceptance
5. Timeouts, retries, ambiguous outcomes, and ordering without idempotence
6. Idempotent production, configuration constraints, and its deduplication boundary
7. Business duplicate events, validation failures, and bounded retry policies

Worked illustrations: Annotated Java sends with success/error callbacks; a lost acknowledgement timeline; a full producer buffer; duplicate business events despite transport idempotence. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Interpret publish results and choose a producer policy under explicit latency and reliability requirements.

Bridge: Next, reason about consumer progress independently from completed business work.

## Chapter 4 — Consumers, Offsets, and Parallel Work

Objective: Reason about consumer progress independently from completed business work.

1. Java consumer lifecycle: subscribe, poll, deserialize, process, and close
2. Consumer position, committed offsets, and the next record to read
3. Auto commits and explicit commits: crash windows and processing boundaries
4. Consumer groups, partition assignment, idle members, and independent applications
5. Rebalances, revocation, and in-flight work during ownership changes
6. Classic and consumer group protocols: distinguish protocol-specific settings
7. Poll cadence, heartbeats, slow processing, pause/resume, and bounded concurrency
8. Starting offsets, missing or expired commits, and safe replay/reset procedures

Worked illustrations: A partition-assignment animation; crash-before/after-commit traces; a slow handler losing ownership; a stopped-group reset preview with a clearly bounded replay range. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Predict replay, loss risks, and reassignment in consumer timelines and explain a safe progress policy.

Bridge: Next, explain the infrastructure conditions behind durability and availability.

## Chapter 5 — Storage, Replication, and KRaft

Objective: Explain the infrastructure conditions behind durability and availability.

1. Partition logs, segments, indexes, page cache, and sequential I/O
2. Leaders, followers, replica placement, and the in-sync replica set
3. Replication factor, minimum in-sync replicas, and acknowledgements together
4. High watermark, readable progress, and lagging replicas
5. Leader failure, election choices, and availability/data-loss trade-offs
6. KRaft controllers, metadata quorum, broker roles, and quorum loss
7. Time/size retention, segment deletion, and replay horizons
8. Log compaction, keys, tombstones, and why cleanup is not immediate

Worked illustrations: A three-replica failure matrix with acks=all and min.insync.replicas=2; separate metadata/data-plane diagrams; segment deletion and compaction before/after cases. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Explain which failures a configuration tolerates and what retained or compacted history can reconstruct.

Bridge: Next, locate duplicate/loss boundaries and design recovery around business effects.

## Chapter 6 — Delivery Guarantees and Reliable Processing

Objective: Locate duplicate/loss boundaries and design recovery around business effects.

1. At-most-once and at-least-once as processing/commit order choices
2. Kafka transactions: identity, fencing, atomic output, and offset commits
3. Consumer isolation, committed visibility, and transaction blocking implications
4. Exactly-once Kafka read/process/write boundaries and their assumptions
5. External database writes, idempotency keys, and deduplication state
6. Dual-write failure and the transactional outbox/CDC pattern
7. Poison records, retry topics, quarantine, and ordering consequences
8. Replay correctness: deterministic logic, changing reference data, and effect suppression

Worked illustrations: Failure tables for charge-then-commit versus commit-then-charge; commit/abort visibility; an outbox handoff; retry-topic events overtaking one another. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Defend a delivery claim by stating its scope and explain why Kafka transactions do not atomically charge an external payment service.

Bridge: Next, explain how managed connector tasks move data and recover progress.

## Chapter 7 — Kafka Connect and Data Integration

Objective: Explain how managed connector tasks move data and recover progress.

1. Source/sink connectors, workers, tasks, and standalone/distributed execution
2. Connector configuration, converters, schemas, and plugin boundaries
3. Source offsets, sink consumer offsets, and internal configuration/status topics
4. REST lifecycle, task status, failures, and controlled restarts
5. Transformations, predicates, error tolerance, and dead-letter handling limits
6. CDC snapshots, ongoing changes, deletes, and source-specific ordering
7. Connector-specific delivery guarantees and external sink idempotency
8. Connect versus custom clients, batch orchestration, and managed integrations

Worked illustrations: Annotated source/sink configuration and status responses; a snapshot-to-change-stream timeline; a sink restart that repeats an external write. Label third-party connectors and their assumptions. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Trace data and offsets through Connect and identify which guarantees require connector-specific evidence.

Bridge: Next, interpret stream-processing results through time, partitioning, and recoverable state.

## Chapter 8 — Kafka Streams and Stateful Computation

Objective: Interpret stream-processing results through time, partitioning, and recoverable state.

1. Kafka Streams as a Java library: topology, tasks, threads, and application identity
2. KStream, KTable, changelog interpretation, and stream-table duality
3. Stateless filtering/mapping and repartitioning after key changes
4. Aggregations, local state stores, changelogs, and restoration
5. Event time, stream time, windows, grace periods, and late records
6. Stream-table and stream-stream joins: keys, co-partitioning, and time boundaries
7. Processing guarantees, output updates, and downstream interpretation
8. Topology tests, restart evidence, and Kafka Streams versus Spark/Flink boundaries

Worked illustrations: An annotated Java topology for sales totals; a late order with explicit timestamps and grace assumptions; join input/output tables; state restoration after process loss. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Explain window/join outputs and how a stateful application rebuilds state without equating state recovery with external-effect deduplication.

Bridge: Next, design controlled access and ownership across applications and operators.

## Chapter 9 — Security and Shared-Platform Governance

Objective: Design controlled access and ownership across applications and operators.

1. Identity and trust boundaries across clients, brokers, controllers, and integrations
2. Listeners, advertised addresses, TLS, and connection troubleshooting
3. SASL authentication choices and credential handling
4. ACLs for topics, groups, transactional identities, and administration
5. Least privilege for Connect/Streams internal topics and service identities
6. Quotas, tenant isolation, topic ownership, and change review
7. Sensitive event data, retention/deletion limits, audit evidence, and secret rotation

Worked illustrations: A service-principal permission matrix; authentication versus authorization failures; internal/external listener address diagrams; a credential-rotation sequence. Use synthetic data and redacted configuration. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Explain a least-privilege access design and distinguish networking, authentication, authorization, and governance failures.

Bridge: Next, use workload and system evidence to diagnose bottlenecks without weakening correctness blindly.

## Chapter 10 — Performance, Capacity, and Diagnosis

Objective: Use workload and system evidence to diagnose bottlenecks without weakening correctness blindly.

1. Workload models: record sizes, rates, skew, fan-out, and peak behaviour
2. Estimate storage from ingress, retention, replication, and overhead assumptions
3. Partition/replica planning and the costs of excess partitions
4. Producer batching/compression and consumer fetch/processing trade-offs
5. Broker disk, network, CPU, memory, and request latency evidence
6. Consumer lag, processing latency, freshness, and why they differ
7. Diagnose hot partitions, under-replicated partitions, and growing backlogs
8. Controlled comparisons, quotas, headroom, and recovery throughput

Worked illustrations: A worked storage estimate with units and exclusions; supplied metric charts for slow consumers versus broker pressure; a skew case that adding consumers cannot fix. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Form a bottleneck hypothesis from supplied metrics and compare changes with correctness and recovery constraints.

Bridge: Next, plan changes and recovery around verifiable data and service outcomes.

## Chapter 11 — Operations, Recovery, and System Evolution

Objective: Plan changes and recovery around verifiable data and service outcomes.

1. Topic administration, configuration changes, deletion, and offset-reset safeguards
2. Broker addition, partition reassignment, throttling, and replica placement
3. Rolling maintenance, client compatibility, and version-specific upgrade checks
4. Controller/broker failure runbooks and service-level recovery evidence
5. Cross-cluster mirroring, consumer failover, offset translation, and duplicate risk
6. Recovery objectives, retention gaps, backups, and restoration validation
7. Self-managed versus managed Kafka: responsibilities, cost, and portability
8. Integrated order architecture: contracts, deployment, monitoring, failures, and evolution

Worked illustrations: A reassignment preview and rollback limits; an outage timeline with RPO/RTO assumptions; a cross-cluster failover that requires reconciliation; an architecture review spanning orders, analytics, and notifications. Explain assumptions, expected behaviour, and limitations; execution is optional.

Outcome: Justify an operational design and describe evidence needed to establish recovery rather than merely healthy processes.

Bridge: Continue by comparing another workload, revisiting its contracts and failure assumptions, and checking current documentation before implementing or upgrading a real system.

## Sources and scope

Official Apache Kafka 4.1 documentation anchors the technical scope: [quick start](https://kafka.apache.org/41/getting-started/quickstart/), [design](https://kafka.apache.org/41/design/design/), [producer configuration](https://kafka.apache.org/41/configuration/producer-configs/), [consumer configuration](https://kafka.apache.org/41/configuration/consumer-configs/), [KRaft](https://kafka.apache.org/41/operations/kraft/), [Connect guide](https://kafka.apache.org/41/kafka-connect/user-guide/), [Streams concepts](https://kafka.apache.org/41/streams/core-concepts/), [Streams DSL](https://kafka.apache.org/41/streams/developer-guide/dsl-api/), [monitoring](https://kafka.apache.org/41/operations/monitoring/), and [operations](https://kafka.apache.org/41/operations/basic-kafka-operations/).

Book comparisons: Scott, Gamov, and Klein, *Kafka in Action* (2022), and Zelenin and Kropp, *Apache Kafka in Action: From basics to production* (2025). Publisher descriptions and available contents/introductory material inform audience and scope comparisons; full books were not inspected. Detailed evidence, research limitations, coverage map, and review status are recorded in the repository README.

Boundaries: Kafka Streams receives coherent introductory-to-intermediate treatment; exhaustive Processor API, interactive-query serving, advanced temporal joins, and state-store tuning are deferred. Spark Structured Streaming remains in the Spark course. CDC and outbox are architectural patterns here; connector-specific deployment belongs to follow-on integration material. Schema registries and CDC connectors are ecosystem components, not bundled Kafka guarantees. Exclude complete Kubernetes/cloud administration, legacy ZooKeeper deployment/migration, exhaustive protocol/configuration catalogues, broker plugin development, and vendor certification preparation. Tiered storage and newer specialist features require separate source-backed treatment. Security configuration details and upgrade instructions require a further documentation check at lesson-authoring time. No examples or benchmarks were executed.
