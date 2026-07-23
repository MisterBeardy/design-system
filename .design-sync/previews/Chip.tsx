import { Chip } from '@misterbeardy/design-system';

export function Tones() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip tone="neutral">DRAFT</Chip>
      <Chip tone="accent">SENT</Chip>
      <Chip tone="success">PAID</Chip>
      <Chip tone="warning">PENDING</Chip>
      <Chip tone="danger">OVERDUE</Chip>
      <Chip tone="ink">ARCHIVED</Chip>
    </div>
  );
}

export function DisplayTags() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Chip mono={false} tone="neutral">Road trips</Chip>
      <Chip mono={false} tone="accent">Featured</Chip>
    </div>
  );
}
