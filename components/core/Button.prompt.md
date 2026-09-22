Button — the call-to-action control used for every clickable action across apps.

```jsx
<Button variant="primary">Send to customer</Button>
<Button variant="secondary">Cancel</Button>
```

Variants: `primary` (solid accent with an `--on-accent` label: white in light,
dark in dark, 4.5:1 or better for every app; use it for the one main action per view), `secondary`
(bordered, neutral — the default for anything not the headline action), `soft`
(accent-tinted background, for a secondary action that still wants some accent
presence), `ghost` (no fill/border, for the lowest-emphasis action, e.g. "remove").
Sizes: `md` (default) and `sm` (inline/table-row actions). Every variant is the
same height, so a primary and a secondary sit level side by side.

Built-in states, nothing to add per app: keyboard focus draws the system's 2px
`--accent` ring, offset 2px outside the button; `disabled` drops to 50% opacity
with no pointer, the same as `Row` and `Switch`.
