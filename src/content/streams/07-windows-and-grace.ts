import type { Section } from '../types'

// Plan §8.5 — event time, stream time, windows, grace periods, and late records.
export const windowsGrace: Section = {
  id: 'windows-and-grace',
  title: 'Windows, stream time and grace',
  scene: 'windows-grace',
  focus: 'arrivals',
  slide: `## Windows, stream time and grace

Windows group records by **event time**. Because records arrive late, each window stays open for a **grace period**, measured in **stream time**.

### Three terms
- **Event time** is the record's timestamp: when the order was paid
- **Stream time** is the largest event time a task has seen so far
- **Grace** is how far behind stream time a record may be and still count

### Reading the table
- Window 09:00–09:05 with 1 minute of grace closes at stream time **09:06**
- The 09:06:30 record moves stream time past that, so the window **closes**
- The 09:04 record then arrives too late, and is **dropped**
- Stream time is kept **per task**, so a quiet partition can hold windows open`,
  narration:
    "Windowed aggregation groups records by event time, which brings back the late record from chapter two. Three terms explain what happens to it. Event time is the record's own timestamp, when the order was actually paid. Stream time is the largest event time a task has seen so far. It only moves forward, and it moves as records arrive, not with the wall clock. And grace is how far behind stream time a record is allowed to be and still count. This window covers nine o'clock up to five past, with one minute of grace, so it closes once stream time reaches six minutes past nine. Follow the arrivals. A record at one minute past is added to the window. Then a record at six minutes thirty seconds arrives. It belongs to the next window, but it also moves stream time past six minutes, so the nine o'clock window closes. Then a record from four minutes past arrives, from a phone that was offline. It belongs to the closed window, so it is dropped, and the total for that window will never include it. Grace is a trade-off between completeness and how long results stay open to change.",
}
