import { Textarea, Field, Group } from '@misterbeardy/design-system';

export function InAField() {
  return (
    <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 16, maxWidth: 420 }}>
      <Group header="Notes">
        <Field label="Notes" help="Optional. Only you see these."><Textarea placeholder="Anything worth remembering" /></Field>
      </Group>
    </div>
  );
}

export function OnItsOwn() {
  return (
    <div style={{ maxWidth: 360 }}>
      <Textarea aria-label="Message to the driver" placeholder="Write a note to the driver" />
    </div>
  );
}
