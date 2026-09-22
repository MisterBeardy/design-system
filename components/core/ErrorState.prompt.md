ErrorState — in place of content that failed to load.

```jsx
<Group header="Recent trips">
  {error
    ? <ErrorState title="Couldn't load trips" onRetry={reload}>
        Check your connection. Nothing you've saved is lost.
      </ErrorState>
    : <TripRows />}
</Group>
```

It goes where the content would have been, usually inside its Group, so
everything else on the screen keeps working. Row-shaped: a danger GlyphTile,
a title, a sentence and a "Try again" button.

Say what failed in the person's words ("Couldn't load trips", not "Error 503"),
then what to do and what's still safe. `onRetry` adds the Try again button;
pass your own `action` instead when retrying isn't the fix (Sign in again).

When a whole screen can't load, this is still the component; put it in a
Group on its own. When something failed that isn't in view (a save, a sync),
use a danger `Banner` instead. Offline is a warning Banner, not an error: the
app still works.
