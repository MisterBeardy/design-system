# Presskits

A presskit is how an app shows itself on **lookwhatibuilt.today**: a
`presskit/` folder in the app's repo with its copy, its screenshots and the
notes a person should read. The site imports it from there. This file is
the format and the routine; the importer lives in the lookwhatibuilt.today
repo.

## When to make one

Three moments, and the prompt below names which one it is:

- **A new app**, or one that has never had a presskit. Build it from
  scratch, or from whatever marketing copy and screenshots the repo already
  has.
- **After a design-system upgrade.** The app looks different now, so every
  screenshot is out of date. Re-take them all, and set `hue` and `chroma` from
  the registry. The copy stays as it is unless it describes the old look.
  Leave `updated` alone: a new look isn't a new feature.
- **After shipping a feature worth showing off.** Add screenshots of it, with a
  `feature` title, name it in `details`, and set `updated` to the day it shipped.
  Re-take other screenshots only where the feature changed them.

## The prompt

Paste this into a session in the app, with the reason filled in:

```text
Make or refresh this app's presskit for lookwhatibuilt.today. Reason: <new
app | design-system upgrade | new feature: what it is>.

Read PRESSKIT.md in the design system, at
node_modules/@misterbeardy/design-system/PRESSKIT.md, or ../design_system if
that folder exists. Follow "When to make one" for this reason, and "Before you
build" and "The format" end to end. Walk the real app for the feature list,
not the README. Take the screenshots yourself where you can; where you can't,
list them in NOTES.md. Then tell me what you changed and what NOTES.md asks me
to decide.
```

## Before you build

1. **Look for what's there.** A `presskit/` folder (possibly an older
   format), stray marketing copy (`COPY-*.md`, `PRESS*.md`, a `marketing/` or
   `press/` folder, App Store descriptions), and screenshots anywhere in the
   repo (`shots/`, `screenshots/`, `fastlane/`, `assets/`). Reconcile it to the
   format below rather than starting again: keep good copy and usable
   screenshots, tighten the wording to the voice, and note in `NOTES.md`
   anything rewritten or dropped so it can be vetoed.
2. **Decide the platform:** web, iOS, or both.
3. **List the features.** Walk the app itself (routes, screens, settings,
   menus) and list every feature it really ships. Each one ends up **shown in
   a screenshot**, **named in `desc` or `details`**, or **left out on
   purpose**, with a line in `NOTES.md` saying why. Record the list and where
   each went as a "Feature coverage" checklist in `NOTES.md`. Never invent a
   feature or a number.

## The format

In the app repo's root:

```
presskit/
  presskit.json     # the entry the site imports, plus its copy
  shots/            # the screenshots, named to match presskit.json
  NOTES.md          # decisions and doubts for a person to read
```

### presskit.json

```jsonc
{
  "slug": "idrovewhere",                 // short lowercase id, no spaces. The app's identity; names the shots.
  "name": "I Drove Where Today?",        // display name; a "…Today?" question if it fits
  "path": "i-drove-where",               // optional story address: lookwhatibuilt.today/<path>
  "url": "idrovewhere.today",            // bare domain, no https://. "" if there's no domain yet.
  "publish": true,                       // false = not ready to show; the site skips it
  "appStore": "",                        // iOS only, optional: full App Store URL
  "testflight": "",                      // iOS only, optional: full TestFlight URL
  "status": "live",                      // "live" | "wip"
  "date": "2026-01-18",                  // first shipped, YYYY-MM-DD
  "updated": "",                         // optional: YYYY-MM-DD of the last real feature
  "tags": ["Web"],                       // any of "Web", "iOS", "watchOS", "Android"
  "want": "I wanted to see every county, state and road my car had ever driven through.",
  "desc": "One or two sentences for the list: the answer to the want.",
  "details": "One richer paragraph: why it exists, how it works, real numbers worth bragging about.",
  "hue": 256,                            // the app's accent, from app-registry.js
  "chroma": 0.15,
  "tagline": "Optional single punchy line.",
  "images": [
    { "file": "idrovewhere-map.png",   "orientation": "landscape", "caption": "Living map of every drive.", "feature": "Every drive, on one map" },
    { "file": "idrovewhere-stats.png", "orientation": "landscape", "caption": "Lifetime dashboard.",        "feature": "The numbers" }
  ]
}
```

- **`slug`** is how the site recognises the app: pick it once and never change
  it. That's what lets `url` appear or change later without a duplicate entry.
- **`path`** is where the app's story page lives, and the address to share:
  the title without "Today?", lowercase, with hyphens (`should-i-wash-my-car`).
  Leave it out and the site keeps the path it has.
- **`url`** is a bare domain, because the site links it as `https://{url}`.
  For an iOS app, its marketing domain. App Store and TestFlight links have
  their own fields. `""` when there's no domain yet; the card then shows no
  link.
- **`publish: false`** hides the app entirely (and removes it if it was
  there): an empty scaffold, something half built, anything not for public
  eyes yet. It isn't `status`: a `wip` app still shows, as "building". When
  unsure, judge the app as it is, set `false`, and say why in `NOTES.md`.
- **`status`**: on the web, `live` means deployed and reachable at the domain.
  On iOS, `live` means on the App Store; TestFlight-only is `wip`, and
  `NOTES.md` says so.
- **`want`** is the spine of the site. Every project reads *"I wanted X → so I
  built [name]"*, so this is the itch that came before the app, in the first
  person and one sentence: *"I wanted to stop washing the car an hour before it
  rained."* The itch, not the feature list (that's `desc`). If it can't be said
  in the builder's voice, leave it `""` and flag it in `NOTES.md`.
- **`updated`** moves the app up the list and shows "updated 3d ago". Only a
  real feature sets it; not a typo fix and not a design-system upgrade. `""`
  until there is one.
- **`hue` and `chroma`** are the app's registry row, so the site draws it in
  its own colour. From the app, with its key in `app-registry.js`:

  ```sh
  node -e 'import("@misterbeardy/design-system/app-registry").then(r => { const a = r.appFor("<app-key>"); console.log(a.hue, a.chroma) })'
  ```

  An app with no row yet gets one first (`ADOPTING.md`, step 1). Leave both
  out only if the app isn't in the registry; the site then uses a default.
- **`desc` and `details`**: dry, understated, faintly self-deprecating British
  wit, about what it does for the person, not the stack. Two real ones to
  match:
  - *"One big button. Tap it. Stop second-guessing yourself at 11pm. Resets
    every morning and quietly logs the streak."*
  - *"A step counter that is quietly, gently disappointed in you. Syncs from
    the watch and never, ever congratulates you."*
- **`images`**: the 4 to 8 screens that between them cover the most important
  features, not just the prettiest, main view first. Each has `file`,
  `orientation` (`"portrait"` or `"landscape"`) and `caption`. Features that
  don't fit go in `details`.
- **`feature`**, on an image, is a short title for what it shows ("Today's
  verdict"). The story page walks through the screenshots as you scroll;
  screenshots in a row with the same `feature` make one step, where the title
  stays and only the picture and caption change. A screenshot without one is a
  step of its own, headed by its caption.

### shots/

Real PNGs, named exactly as their `file` says: no debug overlays, no lorem,
real populated data.

| Platform | Capture                                                    | orientation | Name                      |
|----------|------------------------------------------------------------|-------------|---------------------------|
| Web      | a browser 1280–1440px wide, plus one phone-width shot if it's responsive | `landscape` | `<slug>-<view>.png`       |
| iOS      | simulator or device, portrait                              | `portrait`  | `<slug>-<view>.png`       |
| watchOS  | watch simulator                                            | `portrait`  | `<slug>-watch-<view>.png` |

Take each one in a state that shows its feature working: not empty, and not a
case that hides the point (a "shows its working" screen on a day with nothing
to show). If the right state can't be reached now, take the best there is and
say in `NOTES.md` what to re-take and when. If you can't take screenshots at
all, fill in `images` anyway and list in `NOTES.md` each screen to grab, its
orientation and its file name.

### NOTES.md

Anything a person should decide or know, so the JSON stays clean: assumptions
("`wip` because it's TestFlight-only; `live` once approved"), a domain you
weren't sure of, what you rewrote or dropped, the Feature coverage checklist,
and any screenshot that needs re-taking.

## Getting it onto the site

On the lookwhatibuilt.today side, from its repo:

```sh
node import-presskit.js /path/to/app-repo/presskit            # add or update the app
node import-presskit.js /path/to/app-repo/presskit --dry-run  # preview, write nothing
```

`--scan` lists the presskits in the sibling repos and what changed in each.
The admin page's "scan repos" button does the same and imports one per click. The importer matches on `slug` and copies the
screenshots. Anything set by hand on the site (`want`, `hue`, `chroma`,
`updated`, `path`, a screenshot's `feature`) is kept when the presskit
leaves it out.
