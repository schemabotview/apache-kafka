import type { Section } from '../types'

// Plan §2.6 — schema evolution, compatibility direction, and defaults.
export const compatibilityModes: Section = {
  id: 'compatibility',
  title: 'Compatibility directions',
  scene: 'compatibility-modes',
  focus: 'modes',
  slide: `## Compatibility directions

Schemas change, and producers and consumers cannot all upgrade at the same moment. **Compatibility** says which old and new versions can still read each other's data.

### The two directions
- **Backward**: new readers can read **old** data, so upgrade **consumers first**
- **Forward**: old readers can read **new** data, so upgrade **producers first**
- **Full** gives both, so either side can go first
- **None** checks nothing: every producer and consumer must change **at once**

### Defaults make it work
- Version 2 adds *channel* **with a default**
- Old readers ignore it; new readers fill it in for old records
- That one default keeps the change compatible **in both directions**
- Defaults belong in the schema, not in each reader's code`,
  narration:
    "Schemas change, and the producers and consumers of a busy topic cannot all be upgraded at the same moment. Compatibility is the rule that says which versions can still read each other's data during that transition. There are two directions, and the names are easy to mix up, so phrase them as who reads whom. Backward compatibility means new readers can read old data. If you have that, upgrade the consumers first, because the data they meet will still be old for a while. Forward compatibility means old readers can read new data. Then the producers can upgrade first, because consumers that have not been upgraded will still cope. Full compatibility gives both, so either side can go first. And none means nothing is checked, and everyone must change at once. The code card shows how a single default makes a change safe. Version two adds a channel field with a default of web. An old reader simply ignores the new field. A new reader reading an old record fills in web. That one default keeps the change compatible in both directions.",
}
