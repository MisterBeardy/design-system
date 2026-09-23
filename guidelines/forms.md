---
category: Components
---
<!-- Generated from guidelines/src/forms.md by scripts/build-guidelines.mjs, with values from tokens/*.css. Edit that file, not this one, then run npm run build. -->

# Forms — grouped lists that take input

A form is a grouped list whose rows take input. Related fields share a `Group` with a header naming them, exactly like a settings screen; the page stays tinted and the Group is the only box.

| Piece | Use |
|---|---|
| `Field` + `Input` | A line of text: a name, a number, an address |
| `Field` + `Select` | One of five or more options, or a list that changes. The platform's own picker opens |
| `Field` + `Textarea` | Prose. Its label goes above it and it takes the full width |
| `Checkbox row` | Yes or no, applied on submit |
| `Segmented` | One of two to four peers, always visible |
| `Switch` | On or off, taking effect now: a settings screen with no Save button |

## Layout

- Label on the left in `type-row-label`, value on the right, drawn bare: no border or fill of its own. A Field row is 44px tall on a touch screen, and the whole row draws the focus ring.
- One line of help under a row when the label isn't enough. A sentence about the whole group goes in the Group footer.
- One primary action after the last Group: a full-width `Button` on a phone. Cancel, when there is one, is a secondary Button or the navigation's back.
- On their own (a search box, a single field on a card), `Input`, `Select` and `Textarea` are boxed: Input's surface, 1px border and `radius-md`.

## Errors

- Check when the person leaves a field or submits, not on every keystroke.
- `Field error="…"` replaces the help line. The label, value and message turn `danger-text` and an alert glyph follows the value: never colour alone. `aria-invalid` and `aria-describedby` are set for you.
- Say what's wrong and how to fix it, in the person's words: "Numbers only: take out the km." Never "Invalid input".
- A submit that fails for a reason outside any one field (offline, a server error) is a danger `Banner` above the form.

## Accessibility

- Every control has a visible label. A placeholder is an example, never the label.
- Keep the native controls: `Checkbox` and `Switch` are real checkboxes, `Select` is a real `<select>`, so keyboards, screen readers and autofill work unchanged.
- Colour: `danger-text` on the surface is at least 4.5:1, and an unticked checkbox outline and an invalid border at least 3:1, in both themes (`npm run check` holds all three).
