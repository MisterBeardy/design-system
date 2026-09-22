import { Banner, Button } from '@misterbeardy/design-system';

export function Tones() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 520 }}>
      <Banner tone="success" title="Trip saved" onDismiss={() => {}}>It's in your log for March.</Banner>
      <Banner tone="warning" title="You're offline">Changes are kept on this device and sync when you're back.</Banner>
      <Banner tone="danger" title="Couldn't save the trip"
              action={<Button variant="secondary" size="sm">Try again</Button>}>
        Your edits are still here.
      </Banner>
      <Banner tone="neutral">Trips from before 2024 are read-only.</Banner>
    </div>
  );
}
