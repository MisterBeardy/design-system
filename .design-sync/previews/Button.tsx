import { Button } from '@misterbeardy/design-system';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary">Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="soft">Add trip</Button>
      <Button variant="ghost">Dismiss</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <Button variant="primary" disabled>Saving…</Button>
      <Button variant="secondary" disabled>Cancel</Button>
    </div>
  );
}
