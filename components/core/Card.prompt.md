Card — the base surface container used for panels, list rows, and stat tiles.

```jsx
<Card style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <span>Contents</span>
</Card>
```

Flat by design (no shadow) — depth comes from the border + surface/bg contrast,
not elevation. Nest padding/layout via the `style` prop per use.
