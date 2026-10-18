import type { Section } from '../types'

// Plan §7.5 — error tolerance and dead-letter handling limits.
export const errorTolerance: Section = {
  id: 'error-tolerance',
  title: 'Error tolerance and its limits',
  scene: 'error-tolerance',
  focus: 'settings',
  slide: `## Error tolerance and its limits

By default a connector **fails fast**: one bad record stops the task. Error settings let it **skip** bad records instead, but each choice has a cost.

### The settings
- **errors.tolerance=all** skips records that fail conversion or a transform
- **errors.retry.timeout** retries failing operations for a while first
- **errors.log.enable** logs each failure with its topic, partition and offset

### The limits
- A **dead-letter topic** is only available to **sink** connectors
- Tolerance with no DLQ and no logging **silently loses** records
- A dead-letter topic is useless unless someone **watches** it
- With context headers on, each dead letter carries its **error** in headers`,
  narration:
    "By default, Connect fails fast. One record that cannot be converted, or that breaks a transform, stops the task, and nothing behind it in that partition is processed until someone intervenes. For many pipelines that is the safest default, because it makes problems impossible to miss. The error settings let a connector keep going instead. Errors tolerance set to all makes the task skip records that fail conversion or a transform, rather than failing. Errors retry timeout retries failing operations for a while before giving up, which helps with brief outages. And errors log enable writes each failure to the worker log, with its topic, partition and offset, so it can be found later. Sink connectors can also send failed records to a dead letter topic, together with headers describing the error. Now the limits. The dead letter topic is only available for sink connectors. Tolerance set to all, with no dead letter topic and no logging, silently throws records away, which is data loss with no record of it. And a dead letter topic is only useful if someone actually monitors it and handles what lands there.",
}
