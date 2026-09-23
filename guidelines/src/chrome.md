# Chrome

The frame around the content: `PageHeader`, `Toolbar`, `TabBar`. It's the
first thing a person reads on any screen and the last thing they think about,
which is the point — chrome that asks to be noticed is chrome that's in the
way.

## One height, always

`PageHeader` is a compact bar and stays one. The alternative — a large title
that collapses as the list scrolls under it — is the more fashionable one, and
it loses twice: the top third of a phone goes to the word you just tapped to
get here, and the header becomes a second thing to learn, because it looks
different depending on where you are in a list you can't see the top of.

So: one height, title centred, `--text-subhead`, on `--surface`. Same material
as a `Group`, so the chrome is the app's frame rather than a card floating
above the page.

The title is centred by a three-column grid, not a flex row with a spacer, so
it stays optically centred when only one side has a control. One or two
icon-only actions; anything more is a screen, a `Sheet` or a `Popover`.

## What goes where

| | Where it sits | Scrolls away? |
|---|---|---|
| `PageHeader` | `--surface`, pinned at the top | No (`sticky={false}` if it should) |
| `Toolbar` | page background, under the header | Yes, with the content |
| `TabBar` | fixed to the bottom, translucent | No |

The `Toolbar` is deliberately not attached to the header. Attached, the two
make one tall block of chrome that's always on screen; loose, the filters
scroll away with the list they filter, which is what they belong to. It has no
surface, no border, and vertical padding only — so it lines up with the
`Group`s in the same column rather than double-padding the gutter.

A `Toolbar` brings nothing new to draw: it's `Segmented`, `Button`, `Chip` and
`Switch` composed by the app, plus the spacing and the accessible name.

## How they compose with Group

```jsx
<PageHeader title="Trips" subtitle="128 mi this month" actions={…} />
<main style={{ padding: "0 var(--space-4)",
               paddingBottom: "calc(var(--tabbar-height) + env(safe-area-inset-bottom, 0px))" }}>
  <Toolbar label="Filter trips">…</Toolbar>
  <Group header="Recent">…</Group>
  <Group header="Earlier">…</Group>
</main>
<TabBar items={tabs} value={tab} onChange={setTab} />
```

The screen's horizontal gutter belongs to the content column, not to the
chrome: the header and the tab bar run full width, and the `Toolbar` and the
`Group`s share the column's padding. That's what makes the filters line up
with the cards under them.

**The bottom padding is not optional.** The tab bar is translucent and the
list runs under it; without the padding the last row of every list sits behind
the bar. `--tabbar-height` and `--header-height` are tokens precisely so app
code can do this arithmetic.

## Translucency, again

The system spends translucency twice: the `Sheet` and the `TabBar`. Both on
the same argument, the one in `guidelines/elevation.md` — the content behind
is live and still matters. Under a tab bar the list keeps moving, and seeing
it move is how you know there's more below and roughly how much. A solid bar
says the list ends where the bar starts.

That's the whole licence. A translucent `PageHeader` would be texture: what's
behind it is the top of a list you've already scrolled past. A translucent
`Toolbar` would be texture for the same reason. Neither gets it.

`solid` on the `TabBar` is there for an app whose content is busy enough to
make {{size:--text-tab}}px labels swim over it, and a reader who has asked their system for
reduced transparency gets the opaque version without asking.

Unlike the `Sheet`, the tab bar carries **no shadow**. The `Sheet` is the
system's one elevation; the tab bar is part of the frame, and a hairline is
all an edge needs.

## The accent

The `TabBar` uses the accent for the current tab and nothing else — the one
place on the screen that says "you are here". A second accent-coloured item in
the bar makes the first one decoration.

It's `--accent-text`, not `--accent`: a {{size:--text-tab}}px label and a line-art glyph on the
page background have to clear 4.5:1, and the raw accent is tuned to carry
white on a filled button, not to be read as text. `npm run check` fails if
either colour drops below its floor, for every app in the registry, in both
themes.

## Navigation, not tabs

`TabBar` is a `<nav>` of buttons with `aria-current="page"` on the current
one. It is not a `tablist`: these are links between places, not tabs inside
one panel, and the difference is what a screen reader announces.

`Toolbar` is `role="group"` for the same kind of reason — `role="toolbar"`
promises arrow-key movement between its controls, and the control most often
in a toolbar is a `Segmented`, which is a radiogroup and owns the arrow keys
already.
