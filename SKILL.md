---
name: unified-app-theme-design
description: Use this skill to generate well-branded interfaces and assets across the MisterBeardy app portfolio (iDroveWhere, WashMyCar, OneOfUs.beer, That'll Be 5 Bucks, Idle Airport Manager, ParametricChaos, WhatWillIThinkOfNext, lookwhatibuilt.today), either for production or throwaway prototypes/mocks.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets
out and create static HTML files for the user to view. If working on production
code, copy the token CSS files and component source and read the rules here to
become an expert in designing with this system.

When adding a new app to the portfolio: open `app-registry.js`, pick (or compute)
an open accent hue slot, add a row, and build real screens from that app's actual
source where possible — don't invent placeholder content when the real repo is
available.

If the user invokes this skill without other guidance, ask them what they want to
build or design, ask some questions, and act as an expert designer who outputs
HTML artifacts _or_ production code, depending on the need.
