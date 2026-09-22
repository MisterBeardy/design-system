import { Skeleton, Group } from '@misterbeardy/design-system';

export function Rows() {
  return (
    <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, maxWidth: 420 }}>
      <Group header="Recent trips"><Skeleton count={3} /></Group>
    </div>
  );
}

export function Tiles() {
  return <Skeleton variant="tiles" count={3} style={{ maxWidth: 520 }} />;
}
