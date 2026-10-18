import type { Section } from '../types'

// Plan §5.1 — partition logs, segments, indexes, page cache, and sequential I/O.
export const logSegments: Section = {
  id: 'log-segments',
  title: 'A partition on disk',
  scene: 'log-segments',
  focus: 'active',
  slide: `## A partition on disk

Each partition is a **directory** on a broker, and its log is split into **segments**. Only the newest, the **active segment**, is ever written to.

### What a segment holds
- A **.log** file with the records themselves, in offset order
- An **.index** that maps offsets to positions in the file
- A **.timeindex** that maps timestamps to offsets, for time-based lookups
- A new segment starts at **1 GiB** or after **7 days**, whichever comes first

### Why it is fast
- Writes are **appends** at the end of one file, which disks do well
- Reads of recent data are usually served from the OS **page cache**
- Closed segments are never modified, only read, and later **deleted whole**`,
  narration:
    "Underneath the abstractions, a partition is something very concrete: a directory on a broker's disk. Its log is not one ever-growing file. It is split into segments, each named after the first offset it contains. Every segment has three files. The log file holds the records themselves, in offset order, exactly as the producer's batches arrived. The index maps offsets to byte positions in that file, so a consumer asking for offset five thousand two hundred can be served without scanning from the start. The time index maps timestamps to offsets, which is what makes resetting a group to a point in time possible. Only the newest segment, the active one, is ever written to. When it reaches one gibibyte, or after seven days, it is closed and a new active segment starts. This design is why Kafka is fast on ordinary disks. Writes are appends at the end of a single file, which is the access pattern disks handle best. Recent data is usually still in the operating system's page cache, so most reads never touch the disk. And closed segments are never modified. They are only read, and eventually deleted as a whole.",
}
