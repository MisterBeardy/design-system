import { Input } from '@misterbeardy/design-system';

export function Placeholder() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Input placeholder="Search trips…" />
    </div>
  );
}

export function Filled() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Input defaultValue="idrovewhere@example.com" />
    </div>
  );
}

export function Labeled() {
  return (
    <label style={{ display: 'block', maxWidth: 320 }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>
        Email
      </span>
      <Input type="email" placeholder="you@example.com" />
    </label>
  );
}
