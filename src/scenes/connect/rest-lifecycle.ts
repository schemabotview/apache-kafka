import type { Scene } from '@graphlearning/flow'

// §7.4 — reading a connector's status and restarting only what failed. The connector can report
// RUNNING while one of its tasks has FAILED, which is the case dashboards most often miss.
export const restLifecycle: Scene = {
  id: 'rest-lifecycle',
  title: 'Status and controlled restarts',
  flow: 'TB',
  nodes: [
    {
      id: 'status',
      kind: 'code',
      filename: 'GET /connectors/orders-warehouse/status',
      label: `{ "name": "orders-warehouse",
  "connector": { "state": "RUNNING", "worker_id": "w1:8083" },
  "tasks": [
    { "id": 0, "state": "RUNNING", "worker_id": "w1:8083" },
    { "id": 1, "state": "FAILED",  "worker_id": "w2:8083",
      "trace": "...SQLException: connection refused..." },
    { "id": 2, "state": "RUNNING", "worker_id": "w3:8083" } ] }`,
    },
    {
      id: 'actions',
      label: 'Lifecycle calls',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'a-restart', label: 'Restart failed', sub: '?includeTasks=true &onlyFailed=true', pattern: 'service', icon: 'repeat' },
        { id: 'a-pause', label: 'pause / resume', sub: 'keeps task resources', pattern: 'network', icon: 'power' },
        { id: 'a-stop', label: 'stop', sub: 'frees resources; offsets editable', pattern: 'network', icon: 'ban' },
        { id: 'a-fix', label: 'Fix the cause', sub: 'a restart alone may fail again', pattern: 'warn', icon: 'wrench' },
      ],
    },
  ],
  edges: [{ source: 'status', target: 'actions', label: 'then' }],
}
