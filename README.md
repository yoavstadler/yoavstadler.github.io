# Yoav Stadler - portfolio

Static site (plain HTML, CSS and JavaScript, no build step). Live at https://yoavstadler.github.io

## Where things are
- `index.html` - landing scene (paladin road), featured work slideshow, introduction, experience, education
- `shipped-games.html`, `student-games.html`, `game-jams.html` - the Games pages
- `fan-gdd-series.html`, `system-documents.html` - the Design Documents pages
- `3d-art.html`, `contact.html`, `404.html`
- `assets/style.css` - all colors and layout (colors are variables at the top)
- `assets/site.js` - the menu (edit the `NAV` list to change it on every page), slideshow, contact form
- `assets/scene.js` - the landing scene; edit `SECTIONS` at the top to change what each signpost links to

## Editing
Open a file on GitHub, click the pencil icon, change the text, then "Commit changes". The site updates in a minute or two.
Add a new game or GDD card by copying an existing card block in the matching page and changing the text and links.

## Landing concepts (v2)

`concepts/` holds four RPG landing pages that share one engine (`concepts/core/`) and one content file (`concepts/core/data.js`):
crossroads.html, wizard.html, dungeon.html, guild.html, plus a gallery at `concepts/index.html`.

- Put your highlight video at `assets/reel.mp4` (muted loop, 16:9, a few MB). Until it exists a placeholder shows.
- Each section has a deep link, for example `concepts/guild.html#games/clockout`.
- To make one the real home page later, copy its html file to the repo root as `index.html` and fix the three relative paths (core/, scenes/, ../).

### The Workshop (hand-drawn, layered)
`concepts/workshop.html` + `concepts/scenes/workshop.js`. Layers live in `concepts/art2/`: `plate.jpg` (empty room) and one transparent PNG per object (`raven, construct, books, about, disc`) plus `icon-*.png` for the menu.
### Workshop panel skin (UI kit)
The panels in the Workshop concept use hand-drawn UI pieces from `concepts/ui/` (frame, title plaque, close button, buttons, badges, dividers, bullet, scrollbar). The frame is a CSS 9-slice (`border-image`), the plaque and buttons are 3-slice, so they stretch to any size. The skin lives at the bottom of `concepts/core/core.css`, scoped to `body[data-theme=workshop]`; swap the PNGs to re-skin.

Cut-outs sit at their original positions in the 1024 x 572 source image; the `CUT` table and hit boxes in `workshop.js` are in those pixels. The reel rectangle is the frame interior (`reel:{x,y,w,h}` in scene units, 1600 x 900).
Art is the 2576-px-wide version of the six generated layers (scene, empty room, five objects). `plate.webp` (the empty room) has a transparent hole where the stone frame is, and the reel video sits behind it (engine option `reelBehind`), so the stones and anything overlapping them (like the About scroll) draw in front of the video.
To replace an object: export it on a flat green background at the same position, key it out, save as PNG in `art2/` and update its entry in `CUT`.
The tag font (Kalam) loads from Google Fonts in `workshop.html`; it falls back to a system handwriting font offline.

### Painted wizard concept
`concepts/wizard-art.html` uses the generated art in `concepts/art/` (`wizard-scene.jpg` plus cut-outs `wand/books/owl/robe/letter.png`).
Hotspot regions are listed in `concepts/scenes/wizard-art.js` in image pixels (1672 x 941); change them if you swap the scene image.
