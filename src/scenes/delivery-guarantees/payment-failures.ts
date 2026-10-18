import type { Scene } from '@graphlearning/flow'

// §6.5 — charging a card from a consumer, in both orders, with a crash between the two steps. Only
// the idempotency key turns the repeat in the second order into a harmless one.
export const paymentFailures: Scene = {
  id: 'payment-failures',
  title: 'Charging a card from a consumer',
  flow: 'TB',
  nodes: [
    {
      id: 'cases',
      kind: 'table',
      label: 'OrderPaid for o-1041, then a crash between the steps',
      sub: 'what the restarted consumer does',
      headers: ['Order of steps', 'After restart', 'Customer sees'],
      values: [
        ['commit, then charge', 'skips the record', 'never charged'],
        ['charge, then commit', 'charges again', 'charged twice'],
        ['charge with key, then commit', 'retries the same key', 'charged once'],
      ],
    },
    {
      id: 'key',
      kind: 'code',
      filename: 'the payment call carries an idempotency key',
      label: `payments.charge(order.customerId(), order.total(),
                event.eventId());   // idempotency key: 7f3c…6a13
// same key again: the provider returns the first result`,
    },
    {
      id: 'provider',
      label: 'Check with the provider',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'p-support', label: 'Keys supported', sub: 'on this endpoint', pattern: 'external', icon: 'key' },
        { id: 'p-window', label: 'Kept long enough', sub: 'past your longest replay', pattern: 'external', icon: 'calendar' },
      ],
    },
  ],
  edges: [
    { source: 'cases', target: 'key', label: 'the third row' },
    { source: 'key', target: 'provider', label: 'only if' },
  ],
}
