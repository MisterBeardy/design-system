import { EmptyState, Button } from '@misterbeardy/design-system';

export function NoTripsYet() {
  return (
    <div style={{ display: 'flex', minHeight: 280, maxWidth: 480, background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: 14 }}>
      <EmptyState title="No trips yet" action={<Button>Start a trip</Button>}>
        Trips you drive appear here, newest first.
      </EmptyState>
    </div>
  );
}
