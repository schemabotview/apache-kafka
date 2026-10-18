import type { Section } from '../types'

// Plan §10.1 — workload models: record sizes, rates, skew, fan-out, and peak behaviour.
export const workloadModel: Section = {
  id: 'workload-model',
  title: 'A workload model',
  scene: 'workload-model',
  focus: 'model',
  slide: `## A workload model

Every capacity decision starts from a **workload model**: the traffic written down as numbers, with their **sources**, so anyone can check them.

### The dimensions that matter
- **Rates**, both average and **peak**: sizing for the average fails on sale day
- **Record size**: bytes fill disks and networks, not record counts
- **Fan-out**: three consumer groups read every byte three times
- **Key skew**: how much the busiest key carries

### Making it trustworthy
- Take rates from **order history**, by hour, not by guess
- Measure sizes on **real serialized records**, including headers
- Label every figure as an **assumption** until it is measured
- Model **growth** too: next year's peak, not this year's`,
  narration:
    "Every capacity decision in this chapter starts from one thing: a workload model. It is simply the expected traffic, written down as numbers, together with where each number came from, so that anyone can check it and change it. A few dimensions matter most. Rates, both the average and the peak. The orders topic averages two hundred records a second, but on a sale day it peaks at two thousand, and a system sized for the average fails on exactly the day that matters most. Record size, because bytes, not record counts, fill disks and networks. Fan-out: three consumer groups read every record, so the brokers serve three times as many bytes as they receive. Key skew, how much traffic the busiest key carries, here the top product is five percent of all orders. And retention, which turns rates into disk. To make the model trustworthy, take rates from real order history, by hour, rather than from a guess. Measure record sizes on real, serialized records, including headers, rather than estimating them from the schema. And label every figure clearly as an assumption until it has been measured, like the ones on screen.",
}
