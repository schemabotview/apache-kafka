import type { Section } from '../types'

// Plan §9.4 — granting and listing ACLs with kafka-acls.
export const aclCommands: Section = {
  id: 'granting-acls',
  title: 'Granting ACLs',
  scene: 'acl-commands',
  focus: 'cmds',
  slide: `## Granting ACLs

ACLs are managed with **kafka-acls**, or the Admin API. Two shorthands, **--producer** and **--consumer**, grant what those roles normally need.

### The commands
- **--producer** grants Write, Describe and Create on the topic
- **--consumer** grants Read and Describe on the topic, and Read on the **group**
- **--list** shows what a resource currently allows

### Doing it safely
- Use **prefixed** patterns for families of names, never a bare wildcard
- Keep ACLs in **version control** and apply them from a pipeline
- Review the --list output: ACLs are **additive**, so stale ones linger
- A missing ACL fails only at **runtime**, so test permissions in staging
- Removing an ACL applies to the **next request**, not the next connection`,
  narration:
    "ACLs are managed with the kafka ACLs tool, or the equivalent Admin API calls from automation. The connection settings for an administrative principal are omitted here, but in a secured cluster the tool authenticates like any other client. Two shorthands save a lot of typing. The producer flag grants write, describe and create on the named topic, which is what a producer normally needs. The consumer flag grants read and describe on the topic, and read on the named group. So the second command gives fulfilment everything it needs in one line, including the group permission that is so often forgotten. List shows what a resource currently allows, which is the first thing to run when a client reports an authorization error. A few habits make ACLs safe to operate. Use prefixed resource patterns for families of names, such as every topic starting with an application's prefix, rather than a bare wildcard. Keep ACL definitions in version control, and apply them from a pipeline, so every change is reviewed and can be traced. And review the listing regularly, because ACLs only accumulate. Nothing removes a stale permission except a deliberate change.",
}
