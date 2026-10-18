import type { Section } from '../types'

// Plan §3.2 — flush, close, and application error handling for failed sends.
export const whereErrorsSurface: Section = {
  id: 'publish-errors',
  title: 'Where publish errors surface',
  scene: 'where-errors-surface',
  focus: 'places',
  slide: `## Where publish errors surface

A failed publish does not always throw. Depending on the failure, it appears in one of **three places**, and the application has to watch all of them.

### The three places
- **send() throws** for problems in the application, such as a value that cannot be serialized
- The **callback** receives everything the broker or network reports
- **flush()** and **close()** block until pending records finish, so unsent records surface there

### Two kinds of error
- **Retriable** errors, such as a moved leader, are retried by the client itself
- **Non-retriable** errors, such as a record that is too large, are reported at once
- A **delivery timeout** means the outcome is **unknown**, not that the record was lost
- Never **swallow** a callback error: log at least the key and the eventId`,
  narration:
    "A failed publish does not always look like an exception at the call site. It can appear in three different places, and an application has to handle all three. First, send itself throws, but only for problems on the application's side, such as a value the serializer cannot handle. Second, and most commonly, the callback receives the error. That is where anything reported by a broker or the network ends up. Third, flush and close. Both block until pending records have finished, one way or the other, so a shutdown that does not wait for them can silently drop whatever was still in the buffer. The errors themselves come in two kinds. Retriable errors, like a leader that has just moved, or a temporary timeout, are retried by the producer on its own, and the application only hears about them if retries run out. Non-retriable errors, like a record larger than the broker accepts, or a failed authentication, are reported straight away, because retrying cannot help. One error deserves special care: a delivery timeout. It means the producer gave up waiting. It does not mean the record was not stored.",
}
