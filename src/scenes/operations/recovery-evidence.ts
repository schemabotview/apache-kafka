import type { Scene } from '@graphlearning/flow'

// §11.4 — the difference between "the processes are healthy" and "the service has recovered". Only
// the right-hand column answers whether customers are being served.
export const recoveryEvidence: Scene = {
  id: 'recovery-evidence',
  title: 'Healthy processes are not recovery',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'After the incident: what has actually been shown?',
      sub: 'process evidence versus service evidence',
      headers: ['Process evidence', 'Service evidence'],
      values: [
        ['all brokers running', 'orders produced and acknowledged'],
        ['consumer pods ready', 'fulfilment freshness back under 10 s'],
        ['no error logs', 'backlog from the outage drained'],
        ['ISR full again', 'no orders lost: counts reconciled'],
      ],
    },
    {
      id: 'checks',
      label: 'Declare recovery when',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'k-flow', label: 'Data flows', sub: 'end to end, measured', pattern: 'service', icon: 'workflow' },
        { id: 'k-fresh', label: 'Fresh again', sub: 'within the target', pattern: 'service', icon: 'clock' },
        { id: 'k-counts', label: 'Counts match', sub: 'source against sink', pattern: 'service', icon: 'sigma' },
        { id: 'k-written', label: 'Written down', sub: 'timeline and evidence', pattern: 'storage', icon: 'scroll' },
      ],
    },
  ],
  edges: [{ source: 'compare', target: 'checks', label: 'so' }],
}
