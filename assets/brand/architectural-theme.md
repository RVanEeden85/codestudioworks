# CodeStudioWorks — Architectural Monolith visual system

## Direction

The website uses a restrained brutalist language inspired by monumental architecture: raw concrete, near-black negative space, hard directional light, structural rules, oversized typography, and a single acid-lime brand accent. The imagery is original and was created specifically for CodeStudioWorks with OpenAI ImageGen; it does not reproduce any reference photograph or stage design.

## Generated website imagery

### `public/images/architectural-hero.png`

Purpose: homepage and contact-page cinematic hero background.

Final prompt:

> Create an original ultra-wide cinematic abstract brutalist architectural environment for a website hero. Monumental ribbed concrete monoliths emerge from deep black space, reading as architecture rather than a concert set or a copy of any known scene. Use a vast shadowed architectural void, a subtle matte dark floor plane, and layered monolithic forms receding into darkness. Concentrate massive vertical fluted concrete slabs and one or two sculptural curved brutalist volumes predominantly on the right half. Premium minimalist architectural photography, photorealistic, editorial luxury design campaign, restrained and sophisticated. 16:9 landscape framing. Keep the left 42–48% as elegant, uncluttered deep-black negative space with only a very soft tonal gradient for large light headline text. Concentrate visual drama, architectural mass, depth, and highest contrast on the right. Use a slightly low, wide-angle architectural viewpoint suitable for a full-bleed website banner. Narrow grazing spotlights skim the concrete from low side angles, revealing controlled silver-gray highlights and deep velvety shadows. Palette: deep black, charcoal, graphite, cool raw gray concrete, subtle warm-neutral undertones only. Materials: ribbed cast concrete, board-formed marks, fine aggregate, worn matte mineral surfaces, crisp architectural edges. Entirely original; no people, performers, audience, stage, equipment, visible light fixtures, instruments, screens, text, letters, logos, signage, or watermark. Avoid centered symmetry, sci-fi machinery, glossy metal, colorful lighting, neon, orange glow, heavy fog, domestic interiors, ruins, visible sky, concert imagery, and excessive visual noise.

### `public/images/concrete-passage.png`

Purpose: bright inner-page hero and transitional architectural background.

Final prompt:

> Create a premium editorial architectural photograph of a long, empty raw-concrete passage in one-point perspective. Use monumental rectangular openings, a distant foggy aperture, a honed concrete floor, cool mineral grays, board-formed texture, and calm diffuse daylight. Keep the broad left-side foreground wall and nearby negative-space planes softly illuminated in pale cool mineral gray so sparse dark-charcoal website copy remains clearly legible. Preserve airy tonal balance and quiet shadow depth. No furniture, plants, people, decorative objects, signage, text, letters, numbers, logos, watermarks, orange cast, or dramatic sunlight. 16:9 landscape framing.

### `public/images/concrete-sculpture.png`

Purpose: high-impact call-to-action and feature imagery.

Final prompt:

> Create one original portrait-oriented abstract brutalist concrete sculpture made from interlocking rectangular portals and tall vertical slabs. Isolate it in a near-black contemporary gallery void with no visible walls, fixtures, or surrounding objects. The single monumental sculpture should be asymmetrical but visually balanced, with thick rectilinear frames and monolithic planes; newly conceived and not based on recognizable architecture or any reference object. Premium museum installation photography, photorealistic, refined editorial art direction, mysterious and minimal. 4:5 portrait composition, centered with generous dark breathing room, slightly low three-quarter camera angle, entire sculpture visible, strong readable silhouette. One narrow hard beam of clean white light cuts diagonally from above, catching selected edges and planes while most of the room remains dark, with dramatic long shadow geometry. Palette: charcoal black, graphite, cool raw concrete gray, and one tiny restrained acid-lime reflected glint on a lower edge. Honest raw cast-cement texture with fine pores, faint formwork marks, slight chips, mineral variation, and realistic weight; matte, never glossy. No people, plants, furniture, text, letters, logos, watermark, border, collage, or duplicate sculpture. Avoid decorative ornament, pastel or colorful illumination, fantasy elements, obscuring fog, excessive lime color, studio cyclorama, and product pedestals.

### `public/images/concrete-panel-wall.png`

Purpose: photographic material layer for pale cast-concrete content walls.

The asset is an original, front-facing six-slab concrete elevation generated from a material-only reference. It deliberately contains no baked directional shadows so the website can add its own scroll-controlled cast-light system without visual conflict.

## Core palette

- Architectural black: `#080909`
- Carbon: `#101211`
- Graphite: `#1b1e1c`
- Dark concrete: `#555956`
- Concrete: `#b8b8b1`
- Mineral: `#eeece5`
- Brand acid lime: existing CodeStudioWorks accent token

## Usage principles

- Use imagery as spatial atmosphere, not decoration.
- Keep copy over deliberately quiet negative space with strong contrast.
- Use lime sparingly for calls to action, indices, and short rules.
- Favor flat structural slabs, crisp borders, and restrained radii over floating card effects.
- Alternate immersive dark scenes with pale concrete sections to maintain rhythm and readability.
- Preserve the exact CodeStudioWorks CSW mark and its lime terminal accent.

## Motion language — Monolith in Motion

- Movement should feel weighted, spatial, and architectural rather than playful or decorative.
- The homepage hero uses layered depth, pointer parallax, scroll-linked camera movement, and a slow grazing-light sweep.
- Public pages share a restrained construction reveal, animated lime rules, route curtains, scroll progress, and moving mineral grain.
- Interactive slabs use shallow perspective, directional light, and shadow only on fine-pointer devices.
- Primary calls to action use a small magnetic response; navigation and forms use precise line-drawing feedback.
- The homepage project rail is scroll-linked on desktop and becomes a standard vertical sequence on touch-sized layouts.
- A first-visit CSW reveal introduces the brand once per browser session rather than interrupting every page view.
- Pale content bands use a stationary photographic concrete surface with mineral bloom, pores, hairline joints, and restrained form-tie marks. Soft diagonal cast shadows travel west to east across the individual blocks as each wall crosses the viewport, while the joint shadows deepen and lengthen to reinforce the slabs' physical weight.
- Image-backed concrete sections receive the same moving light source at a lower intensity so the site feels like one continuous illuminated space.
- Every continuous or scroll-linked effect must yield to `prefers-reduced-motion`; mobile omits cursor lighting and moving grain.
