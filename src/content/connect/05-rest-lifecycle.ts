import type { Section } from '../types'

// Plan §7.4 — REST lifecycle, task status, failures, and controlled restarts.
export const restLifecycle: Section = {
  id: 'rest-lifecycle',
  title: 'Status and controlled restarts',
  scene: 'rest-lifecycle',
  focus: 'status',
  slide: `## Status and controlled restarts

The **status** endpoint shows the connector **and each task**. A connector can be RUNNING while one of its tasks has **FAILED**.

### Reading the status
- Task 1 failed on worker w2, and the **trace** says why
- Its partitions are **not being processed** at all
- Monitor **task** states, not only connector states

### Lifecycle calls
- **restart** with includeTasks and onlyFailed restarts just the failed task
- **pause** and **resume** stop processing but keep resources
- **stop** frees resources, and is required before **editing offsets**
- Fix the cause first: a restart into the same error **fails again**
- A failed task does not **restart itself**; something has to call restart`,
  narration:
    "The status endpoint is where operating a connector starts. It reports the state of the connector, and separately the state of every one of its tasks, and those can disagree. Here the connector is running, and so are tasks zero and two. But task one has failed, on worker two, and the trace field says why: the warehouse refused the connection. The partitions assigned to task one are not being processed at all, while everything still looks healthy at the connector level. That is why monitoring should watch task states, not just connector states. Then the lifecycle calls. Restart, with include tasks and only failed both set to true, restarts just the failed task, without disturbing the healthy ones. Pause and resume stop processing temporarily, but keep the tasks' resources allocated, so they resume quickly. Stop shuts the tasks down and releases their resources, and a connector must be stopped before its offsets can be edited through the API. The most important habit, though, is simple: find and fix the cause before restarting. A task restarted into the same error just fails again, and repeated restarts hide the problem.",
}
