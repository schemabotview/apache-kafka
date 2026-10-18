import type { Scene } from '@graphlearning/flow'

// §1.1 — the same order handled twice: once as a chain of direct calls, once through a retained
// log. The top board shows the coupling; the bottom one shows what removing it buys.
export const syncVsLog: Scene = {
  id: 'sync-vs-log',
  title: 'Direct calls versus a retained log',
  flow: 'LR',
  nodes: [
    {
      id: 'direct',
      label: 'Calling each service directly',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'd-checkout', label: 'Checkout', sub: 'waits for all three', pattern: 'service', icon: 'server' },
        { id: 'd-fulfil', label: 'Fulfilment', sub: 'down? checkout fails', pattern: 'warn', icon: 'package' },
        { id: 'd-analytics', label: 'Analytics', sub: 'slow? checkout is slow', pattern: 'warn', icon: 'barchart' },
        { id: 'd-email', label: 'Notifications', sub: 'new? edit checkout', pattern: 'warn', icon: 'bell' },
      ],
      edges: [
        { source: 'd-checkout', target: 'd-fulfil', label: 'call' },
        { source: 'd-fulfil', target: 'd-analytics', label: 'call' },
        { source: 'd-analytics', target: 'd-email', label: 'call' },
      ],
    },
    {
      id: 'via-log',
      label: 'Publishing once to a log',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'l-checkout', label: 'Checkout', sub: 'publishes and returns', pattern: 'service', icon: 'server' },
        { id: 'l-log', label: 'orders log', sub: 'keeps every event', pattern: 'storage', icon: 'scroll' },
        {
          id: 'l-readers',
          label: 'Readers, each at its own pace',
          pattern: 'group',
          cols: 1,
          children: [
            { id: 'l-fulfil', label: 'Fulfilment', sub: 'reads when ready', pattern: 'service', icon: 'package' },
            { id: 'l-analytics', label: 'Analytics', sub: 'catches up later', pattern: 'service', icon: 'barchart' },
            { id: 'l-email', label: 'Notifications', sub: 'added next month', pattern: 'service', icon: 'bell' },
          ],
        },
      ],
      edges: [
        { source: 'l-checkout', target: 'l-log', label: 'append' },
        { source: 'l-log', target: 'l-readers', label: 'read' },
      ],
    },
  ],
  edges: [],
}
