import type { Section } from '../types'

// Plan §9.4 — ACLs for topics, groups, and transactional identities.
export const permissionMatrix: Section = {
  id: 'permission-matrix',
  title: 'A least-privilege permission matrix',
  scene: 'permission-matrix',
  focus: 'matrix',
  slide: `## A least-privilege permission matrix

**ACLs** decide what each principal may do. With the **StandardAuthorizer**, a resource with no ACLs is closed to everyone except super users.

### Reading the matrix
- **svc-checkout** writes orders, and can do nothing else
- **svc-fulfilment** reads orders, and also needs **Read on its group**
- **svc-pricer** needs **Write** on its transactional ids, for transactions
- Read and Write imply **Describe**, so it is rarely granted alone

### Habits
- Grant what the code **actually does**, per topic and group
- Keep **super users** few and audited; they bypass every ACL
- Deny ACLs exist, but an **allow-only** design is far easier to review`,
  narration:
    "Authorization in Kafka is done with access control lists, ACLs, and the permission matrix is the clearest way to design them. In KRaft clusters the authorizer is the standard authorizer, and its most important behaviour is the default: a resource with no ACLs at all is closed to everyone except super users. Nothing is open by accident. Now read the matrix row by row. Checkout writes to the orders topic, and has no other permissions at all. Fulfilment reads the orders topic, and it also needs read permission on its consumer group, because committing offsets is an operation on the group. Missing that is a very common mistake. The pricer reads orders and writes priced orders, and because it uses transactions, it also needs write permission on its transactional ids. Analytics reads orders as its own group. Read and write each imply describe, so describe rarely needs granting on its own. The habits that keep this manageable are to grant exactly what each service's code actually does, topic by topic and group by group, and to keep super users few and audited, because a super user bypasses every ACL.",
}
