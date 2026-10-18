import type { Section } from '../types'

// Plan §9.6 — quotas, tenant isolation, topic ownership, and change review.
export const quotasTenancy: Section = {
  id: 'quotas-and-ownership',
  title: 'Quotas, ownership and change review',
  scene: 'quotas-tenancy',
  focus: 'controls',
  slide: `## Quotas, ownership and change review

A **shared cluster** needs limits and ownership, or one team's mistake becomes everyone's outage.

### Quotas
- **Byte-rate quotas** cap a principal's produce and fetch rates, per broker
- A client over its quota is **throttled**: slowed down, not failed
- A **request quota** caps the share of broker threads one client can use

### Ownership and review
- Every topic has **one owning team**, recorded where people can find it
- Topic, ACL and quota changes are **code**, reviewed before they apply
- A reviewer checks the effect on **other teams**: keys, retention, schemas`,
  narration:
    "On a cluster shared by many teams, isolation becomes a design problem of its own. Without limits and clear ownership, one team's mistake becomes everyone's outage. Quotas are the technical limit. A byte-rate quota caps how fast a principal may produce, and how fast it may fetch, here ten mebibytes per second in and twenty out for analytics, enforced per broker. A client that goes over its quota is throttled rather than failed: the broker delays its responses until it is back under the limit. So a runaway analytics job slows itself down instead of saturating the brokers for everyone else. A request quota caps the share of broker request-handling threads one client can use, which protects against clients that send huge numbers of small requests. Ownership is the organisational limit. Every topic has one owning team, recorded somewhere people can actually find it, as chapter two described. And changes to topics, ACLs and quotas are treated as code: written down, reviewed, and applied by a pipeline. The reviewer's main question is the effect on other teams, through keys, retention and schemas.",
}
