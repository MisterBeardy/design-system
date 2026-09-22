EmptyState — fills the panel when there's nothing to show yet.

```jsx
<EmptyState
  title="No trips yet"
  action={<Button onClick={startTrip}>Start a trip</Button>}
>
  Trips you drive appear here, newest first.
</EmptyState>
```

It fills the space the content would have taken (it's `flex: 1`, so give its
parent a height or make it a flex column), centred, with a neutral GlyphTile,
a title, one sentence and one way forward.

Say why it's empty or when it won't be, not that it is: "Trips you drive
appear here" beats "No data". The action is the primary way to fill it, a
primary Button; it's usually the one primary on the screen. Leave the action
off when there's nothing to do but wait.

The tile is neutral on purpose: an empty list isn't a state to colour. Pass
`icon` for the thing that's missing (a car for trips), drawn at about 22px.

For a filter or search with no results, keep the filter visible and say what
to change: "No trips in March. Try another month."
