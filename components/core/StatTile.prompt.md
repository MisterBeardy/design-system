StatTile — labeled metric tile for dashboards, KPI strips, and HUDs.

```jsx
<StatTile label="Open quote value" value="$128.40" sub="3 active" accent />
```

Only the single headline metric on a screen should set `accent` — everything
else stays ink-colored so the accent keeps its "this is the important number" meaning.
