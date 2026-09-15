# Architectural walkthrough example

This design includes the approved architectural walkthrough and subsequent refinements. Production acceptance requires separate verification.

## Restore point

`outputs/design-checkpoints/before-architectural-walkthrough.tar.gz` contains the exact source, package files, configuration, documentation, scripts and tests from immediately before this experiment. It includes the approved copy and restored original animations. Environment secrets and unrelated output folders are not included. Existing image files are unchanged.

To request a rollback, ask Codex to restore the pre-walkthrough snapshot. Stop the local server before restoring. Extract the archive into the project, remove only the three new components `StudioScene.jsx`, `StudioWalkthrough.jsx`, and `StudioPageHero.jsx`, then reinstall the restored dependencies and rebuild. Preserve any later unrelated edits before extraction. This archive is independent of Git's older committed version.

## Experience

- Real browser-rendered 3D architecture built from lightweight geometry, a generated concrete texture and existing project screenshots.
- Four guided scroll chapters: entrance, project gallery, workshop and meeting area.
- Normal HTML copy, links, chapter controls and a pause toggle.
- The same building appears from related viewpoints on Services, Work, Pricing and New Business.
- Original architectural image remains behind the canvas as a fallback.
- Reduced-motion preference holds the camera still; chapter navigation remains available.
- Rendering skips unchanged frames, limits pixel density and stops drawing when offscreen or the page is hidden.
- No new contact flows, tracking providers or form submissions.

## Art direction

Charcoal concrete, repeated portal frames, lime inlays, warm light and planting. This is a stylised procedural architectural example, not a photorealistic offline render.

## Verification

Production build, lint and the four existing form/security tests pass. The live local example was reviewed on desktop and at 390px width. The homepage and four related hero pages fit without horizontal overflow; chapter controls and the pause/resume control work, and the inspected browser session reported no console errors. Desktop lighting and final camera framing were visually checked. Performance on physical low-end phones and the reduced-motion/browser-loss fallback still need device testing before a public release.

## Daylight sections

Services, Process and the final invitation now use a shared shallow 3D concrete wall. Scroll position controls sunlight direction, warmth and shadow length. Services uses morning light, Process crosses the daylight arc, and the final invitation uses evening light with lime inlays. Text surfaces remain stable and opaque. Scenes load near the viewport and render on scroll/resize, with static CSS fallbacks and reduced-motion support.

The meeting room also includes the approved logo projection, grounded chairs, a tabletop plant and a tablet model. The homepage portrait uses a transparent cutout with a moving lime colour reveal.
