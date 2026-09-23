PageHeader — the bar at the top of a screen.

```jsx
<PageHeader
  title="Trips"
  sub="128 mi this month"
  leading={<Button variant="ghost" size="sm" aria-label="Back"><Icon name="chevron-right" style={{ transform: "rotate(180deg)" }} /></Button>}
  trailing={<Button variant="ghost" size="sm" aria-label="Add trip"><Icon name="plus" /></Button>}
/>
```

One compact height, title centred, and it never changes shape. A header that
starts tall and collapses as you scroll is a second thing to learn on every
screen, and it spends the top third of the phone on the word you just tapped
to get here. This one is furniture: the screen opens on content.

It sits on `--surface`, the same material as a `Group`, so the chrome reads as
the app's frame rather than as a card floating above the page. It's `sticky`
by default — pinned above the content, which scrolls under it. `sticky={false}`
lets it scroll away, for a screen that's read top to bottom rather than
browsed.

The title is optically centred by a three-column grid, so it stays centred
when only one side carries a control. It's the only thing that truncates; keep
`trailing` to one or two icon-only buttons at this size. `headingLevel` is 1 on
a screen's own header — the title is that screen's heading, and a screen
reader's heading list is how people jump to it.

`sub` is the quiet second line: a count, a date range, a state. It's
`--text-page-sub`, and it's muted, because it's context for the title, not a
second title.
