Banner — an outcome message in the page, until it's dismissed or resolved.

```jsx
<Banner tone="success" title="Trip saved" onDismiss={() => setSaved(false)}>
  It's in your log for March.
</Banner>

<Banner tone="warning" title="You're offline"
        action={<Button variant="secondary" size="sm" onClick={retry}>Retry</Button>}>
  Changes are kept on this device and sync when you're back.
</Banner>
```

**Banner or Toast?** A Banner stays until it's dealt with; a `Toast` leaves on
its own. Anything the person has to act on, or would be worse off for missing,
is a Banner: errors, offline, a sync that failed, a limit they've hit. A Toast
is only ever "that worked".

Put it at the top of the content it's about: above the Group whose save
failed, or at the top of the screen when it's about the whole app. Not over
content, and never more than one per screen; if two things went wrong, say
both in one.

Tones: `success`, `warning` and `danger` are outcomes, drawn in that status's
`-text` colour on its `-soft` fill. `neutral` is for information that isn't an
outcome ("Trips from before 2024 are read-only"), in ink on `--surface-alt`.
A danger Banner is announced straight away (`role="alert"`); the others
politely.

**This is the one surface that takes a status tint.** Everywhere else colour
stays on small elements (a GlyphTile, a Chip) and never washes a card. The
Banner is the exception because its tint *is* the message. Don't borrow it for
decoration: a green Banner saying "Welcome back" is a wash.

Write a short `title` for what happened, and one plain sentence under it for
what it means or what to do. Give it at most one `action`, a small secondary
Button. `onDismiss` adds a close button; leave it off when the Banner should
stay until the problem is fixed (offline clears itself when you're back).
