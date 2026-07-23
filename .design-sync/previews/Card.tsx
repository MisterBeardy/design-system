import { Card } from '@misterbeardy/design-system';

export function Basic() {
  return (
    <Card style={{ maxWidth: 340 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--text-ink)' }}>
        Quote #1042
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
        Sent 2 days ago · $128.40
      </div>
    </Card>
  );
}

export function Panel() {
  return (
    <Card style={{ maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--text-ink)' }}>
        Trip summary
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
        <span>Distance</span>
        <span style={{ color: 'var(--text-ink)', fontVariantNumeric: 'tabular-nums' }}>546 mi</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
        <span>Drive time</span>
        <span style={{ color: 'var(--text-ink)', fontVariantNumeric: 'tabular-nums' }}>8h 27m</span>
      </div>
    </Card>
  );
}
