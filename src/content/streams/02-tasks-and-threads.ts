import type { Section } from '../types'

// Plan §8.1 — tasks, threads, and scaling across instances.
export const tasksThreads: Section = {
  id: 'tasks-and-threads',
  title: 'Tasks, threads and instances',
  scene: 'tasks-threads',
  focus: 'instances',
  slide: `## Tasks, threads and instances

Kafka Streams splits the work into **tasks**, one per input partition. Tasks are the unit of parallelism, and they move between threads and instances.

### How work is spread
- **orders** has 3 partitions, so this part of the topology has **3 tasks**
- Each instance runs **num.stream.threads** threads, 1 by default
- Tasks are spread across **every thread** of every instance
- A topology with a repartition step has a **second set** of tasks

### Scaling
- More threads than tasks leaves threads **idle**, as here
- Starting another instance **rebalances** tasks onto it
- So the **partition count** caps the parallelism, as for any consumer group
- Tasks keep their **state** with them, so moving a task can mean restoring it`,
  narration:
    "Kafka Streams divides an application's work into tasks. Each task handles one partition of the input, so the orders topic, with three partitions, gives this part of the topology three tasks, named zero underscore zero to zero underscore two. Tasks are the unit of parallelism, and they are what moves around. Each running instance of the application runs a number of stream threads, one by default, and the tasks are spread over every thread of every instance sharing the application id. Here, two instances each run two threads. That is four threads for three tasks, so one thread is idle, for exactly the same reason a consumer group member can be idle: there is nothing left to assign. A topology with a repartition step, like the sales totals, is split into two sub-topologies at that point, with a second set of tasks for the part after the repartition. Scaling out is just starting another instance with the same application id. The group rebalances, and some tasks move to the new instance. As with any consumer group, the partition count sets the ceiling on parallelism.",
}
