import { PageHeader, Button, Icon } from '@misterbeardy/design-system';

// The header as it sits at the top of a phone-width screen.
const Screen = ({ children }: { children: any }) => (
  <div style={{ width: 390, overflow: 'hidden', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg)' }}>
    {children}
    <div style={{ height: 36 }} />
  </div>
);

const Back = () => (
  <Button variant="ghost" size="sm" aria-label="Back"><Icon name="chevron-right" style={{ transform: 'rotate(180deg)' }} /></Button>
);
const Add = ({ label }: { label: string }) => (
  <Button variant="ghost" size="sm" aria-label={label}><Icon name="plus" /></Button>
);

export function WithSubtitleAndActions() {
  return (
    <Screen>
      <PageHeader sticky={false} title="Trips" subtitle="128 mi this month" leading={<Back />} actions={<Add label="Add trip" />} />
    </Screen>
  );
}

export function TitleOnly() {
  return (
    <Screen>
      <PageHeader sticky={false} title="Settings" />
    </Screen>
  );
}

// A title too long for the bar truncates between the controls, and stays
// centred in the bar rather than in what's left of it.
export function LongTitle() {
  return (
    <Screen>
      <PageHeader sticky={false} headingLevel={2} title="Weekend coast run and the long way back"
                  leading={<Back />} actions={<Add label="Add stop" />} />
    </Screen>
  );
}
