import { StatTile } from '@misterbeardy/design-system';

export function Single() {
  return (
    <div style={{ maxWidth: 220 }}>
      <StatTile label="Open quote value" value="$128.40" sub="3 active" accent />
    </div>
  );
}

export function Strip() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: 520 }}>
      <StatTile label="Miles" value="12,480" accent />
      <StatTile label="Counties" value="37" />
      <StatTile label="Charging" value="$412" sub="-8%" />
    </div>
  );
}
