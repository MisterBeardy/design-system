import { ErrorState, Group } from '@misterbeardy/design-system';

export function InGroup() {
  return (
    <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, maxWidth: 480 }}>
      <Group header="Recent trips">
        <ErrorState title="Couldn't load trips" onRetry={() => {}}>
          Check your connection. Nothing you've saved is lost.
        </ErrorState>
      </Group>
    </div>
  );
}
