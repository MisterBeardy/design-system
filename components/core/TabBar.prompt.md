TabBar — bottom navigation.

```jsx
<TabBar
  label="Main"
  value={tab}
  onChange={setTab}
  items={[
    { value: "trips",    label: "Trips",    icon: "map" },
    { value: "stats",    label: "Stats",    icon: "trophy" },
    { value: "places",   label: "Places",   icon: "pin" },
    { value: "settings", label: "Settings", icon: "calendar" },
  ]}
/>
```

The three to five places the app is made of. Fewer than three isn't
navigation, more than five is a menu and belongs on a screen of its own.

**The accent marks the current tab and nothing else.** Everything else is
`--text-muted`. That's the whole job of the accent here: one thing on the
screen says "you are here", and a second accent-coloured item would make it
a decoration. The mark is `--accent-text`, not `--accent` — a 10px label and a
line-art glyph on the page background have to clear 4.5:1 there.

It's translucent, and besides the `Sheet` it's the only thing that is. Same
argument: the content behind is live. The list runs under the bar and keeps
moving, so you can see there's more below and roughly how much; a solid bar
would say the list ends where the bar starts. `solid` turns that off for an
app whose content behind it is busy enough to make the labels swim, and a
reader who has asked for reduced transparency gets the opaque version anyway.

Because content runs under it, **the scrolling area above needs room at the
bottom**: `calc(var(--tabbar-height) + env(safe-area-inset-bottom, 0px))`.
Without it the last row of every list sits behind the bar.

It's a `<nav>` of buttons with `aria-current="page"` on the current one — not
a tablist. These are links between places, not tabs inside one panel.
