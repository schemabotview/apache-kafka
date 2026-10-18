import type { Scene } from '@graphlearning/flow'

// §10.5 — each broker resource with the metric that shows it saturating. Request time is split into
// parts, so a slow request says WHERE it was slow.
export const brokerEvidence: Scene = {
  id: 'broker-evidence',
  title: 'Broker resource evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'resources',
      kind: 'table',
      label: 'Resource, metric, and what saturation looks like',
      sub: 'broker JMX metrics',
      headers: ['Resource', 'Watch', 'Saturated when'],
      values: [
        ['request threads', 'RequestHandlerAvgIdlePercent', 'idle falls toward 0'],
        ['network threads', 'NetworkProcessorAvgIdlePercent', 'idle falls toward 0'],
        ['network', 'BytesInPerSec, BytesOutPerSec', 'near the link speed'],
        ['disk', 'OS disk utilisation, latency', 'busy near 100%'],
        ['memory', 'page cache hit rate (OS)', 'reads start hitting disk'],
      ],
    },
    {
      id: 'parts',
      label: 'TotalTimeMs for Produce, split into parts',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-queue', label: 'Queue: no thread', sub: 'RequestQueueTimeMs', pattern: 'network', icon: 'clock' },
        { id: 'p-local', label: 'Local: disk', sub: 'LocalTimeMs', pattern: 'storage', icon: 'harddrive' },
        { id: 'p-remote', label: 'Remote: followers', sub: 'RemoteTimeMs', pattern: 'storage', icon: 'copy' },
        { id: 'p-send', label: 'Send: the reply', sub: 'ResponseSendTimeMs', pattern: 'network', icon: 'network' },
      ],
    },
  ],
  edges: [{ source: 'resources', target: 'parts', label: 'and per request' }],
}
