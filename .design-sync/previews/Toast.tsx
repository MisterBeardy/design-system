import { Toast } from '@misterbeardy/design-system';

export function Confirmations() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Toast inline open duration={Infinity} message="Copied to clipboard" />
      <Toast inline open duration={Infinity} message="Trip archived" action={{ label: 'Undo' }} />
    </div>
  );
}
