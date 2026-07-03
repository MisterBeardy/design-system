Chip — small pill labels for status, category, or count.

```jsx
<Chip tone="accent">SENT</Chip>
<Chip tone="neutral">DRAFT</Chip>
```

Use uppercase text with `mono` (default) for status/state chips (order status,
game state, tags). Use `tone="ink"` sparingly for a completed/terminal state.
Semantic tones — `success` (PAID, DONE), `warning` (PENDING, LOW STOCK),
`danger` (OVERDUE, FAILED) — are app-agnostic: the same state must get the
same tone in every app. Don't use them decoratively; `accent`/`neutral` cover
everything that isn't a real outcome state.
