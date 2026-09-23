Toast — a brief confirmation that leaves on its own.

```jsx
const [toast, setToast] = useState(null);

<Toast open={!!toast} message={toast?.message} action={toast?.action}
       onClose={() => setToast(null)} />

// after archiving:
setToast({ message: "Trip archived", action: { label: "Undo", onClick: unarchive } });
```

For "that worked": saved, copied, archived, sent. **Never for an error, or
anything the person needs to act on:** it disappears, so it can't hold a
problem. Use a `Banner` for those.

One at a time. Render a single Toast near the root of the app and change its
`message` to replace what's showing; the timer restarts. Queued toasts stack
up behind each other and arrive after the moment they describe.

It stays 5 seconds, or 8 with an action, long enough to read and reach for the
button. It holds while the pointer is over it or focus is in it, and starts
again when they leave. Escape closes it, and so does pressing its action.
`duration={Infinity}` keeps it until closed, which is rarely right: if it
needs to stay, it's a Banner.

Give it at most one action, and make it a way back: Undo, View. Label it in
one word.

It sits at the bottom centre of the viewport, clear of the home indicator,
over everything. It's a surface card with a 1px border and `--shadow-popover`,
one of the two places the system uses a shadow: the shadow says "this is
floating above the page", which the Toast is. In dark mode the shadow barely
shows, so the border does most of that work.

It's announced to screen readers through a live region that's always in the
page, so render the Toast once and keep it rendered with `open={false}`,
rather than mounting it when there's something to say. `fixed={false}` drops
the fixed positioning, for a toast inside a panel and for previews.
