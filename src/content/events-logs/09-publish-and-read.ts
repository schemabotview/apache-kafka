import type { Section } from '../types'

// Plan §1.5 — the first publish/read trace, annotated with partitions and offsets.
export const firstPublishRead: Section = {
  id: 'publish-and-read',
  title: 'Publishing and reading three orders',
  scene: 'first-publish-read',
  focus: 'consume',
  slide: `## Publishing and reading three orders

The console producer sends each typed line as a record. With **parse.key**, the text before the colon becomes the key.

### Reading the output
- Each order lands in the partition its key hashes to, at **offset 0**
- The consumer prints them **grouped by partition**, not in sending order
- Across partitions, that order can differ from run to run

### What the consumer did not do
- It did not remove anything: running it again prints the **same three**
- Without a **group** name it remembered nothing, so every run starts again from the beginning
- The next section names the groups, and gives them a memory
- Each line is still a separate record, so pressing Enter sends it`,
  narration:
    "Now the first real trace. In the first terminal, the console producer turns each line you type into a record, and because parse key is set, the text before the colon becomes the key. Three orders go in: ten forty-one, then ten forty-two, then ten forty. In the second terminal, the console consumer reads from the beginning and prints the partition, the offset and the key in front of each value. Every order landed in the partition its key hashes to, and each one is at offset zero, because each is the first record in its partition. Look at the order of the output, though. Ten forty comes out first, even though it was sent last. The consumer reads partitions independently, so the output follows partitions, not the order of sending, and across partitions it can differ from one run to the next. That is the per-partition ordering rule from earlier, seen in a real transcript. And notice what the consumer did not do. It removed nothing. Run the same command again and it prints the same three orders.",
}
