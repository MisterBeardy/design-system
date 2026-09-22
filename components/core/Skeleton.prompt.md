Skeleton — placeholders in the shape of what's loading.

```jsx
<Group header="Recent trips">
  {trips ? trips.map((t) => <Row key={t.id} {...} />) : <Skeleton count={4} />}
</Group>

{stats ? <StatTiles /> : <Skeleton variant="tiles" count={3} />}
```

Loading is shown as the shape it will become, in the place it will appear:
the Group's header and footer are real, and the rows inside it are
placeholders. The page doesn't jump when the data arrives, and the person can
already see what's coming. No spinners in content; a spinner says "wait"
without saying for what.

`variant="rows"` draws Row-shaped placeholders (tile, label, value) to sit
inside a `Group`. `variant="tiles"` draws StatTile-shaped cards in a wrapping
row. Set `count` to about how many you expect; three is a good guess when you
can't know.

Show it only once loading has taken a moment (around 300ms). Most loads finish
before that, and a skeleton that flashes up for a frame is worse than nothing.

The bars pulse slowly, in `--surface-alt` (`--border` in dark, where
`--surface-alt` barely shows on a card); with reduced motion they hold still.
Screen readers hear `label` ("Loading" by default) once, not every bar.
