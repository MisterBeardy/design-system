SideNav — the places in one part of an app, down its side.

```jsx
<SideNav
  label="Settings"
  value={page}             // null on a phone means "show the list"
  onChange={setPage}
  items={[
    { value: "general", label: "General", icon: "bolt" },
    { value: "display", label: "Display", icon: "map", children: [
      { value: "display/appearance", label: "Appearance" },
      { value: "display/camera",     label: "Camera" },
    ] },
    { value: "about", label: "About", icon: "info" },
  ]}
>
  <SettingsPage page={page} />
</SideNav>
```

For a part of an app with more pages than a `Segmented` holds and fewer than
need search: settings, an account area, a long form split into steps. The
app's own top-level places are a `TabBar` on a phone, not this.

**One level of nesting, no more.** An item with `children` is a section: on
the rail it opens and closes under its name, and opening one goes to its
first page. It is a heading, not a page of its own. The section holding the
current page is always open when you arrive at it.

**Below `narrow` (700px) it becomes the grouped list a phone expects**:
chevron `Row`s, each section's pages in a `Group` headed by its name, top-level
pages with their icon in a `GlyphTile`. Given the page as `children`,
`SideNav` lays it out for you: beside the rail when there's room, and on a
phone either the list (when `value` is `null`) or the page under a back bar
whose button reads `label` and calls `onChange(null)`. Focus goes to the
page's heading on the way in and back to its row on the way out. Without
`children` it's only the navigation, in whichever form `layout` asks for, and
the page is yours to place.

The current page takes `--accent-soft` with `--accent-text`, the one accent on
the rail, as on the `TabBar`. It's a `<nav>` named by `label` with
`aria-current="page"` on the current page and `aria-expanded` on each
section; items are 44px tall on a touch screen.
