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
`concepts/workshop.html` + `concepts/scenes/workshop.js`. Layers live in `concepts/art3/` (WebP, 2 px per art unit): `plate.webp` (the room, transparent where the video shows), one cut-out per object (`raven` = window, `construct`, `books`, `about`, `disc` = rune plate) The gold hover outline is a vector path per object (the `RING` table in `workshop.js`), so it stays sharp at any size; the hanging signs and their strings live in `plate.webp`. The window, books and construct also have a `NAME-hover.webp` patch (a second pose) that fades in on hover. `concepts/art2/` now only holds the menu icons.
### Workshop panel skin (UI kit)
The panels in the Workshop concept use hand-drawn UI pieces from `concepts/ui/` (frame, title plaque, close button, buttons, badges, dividers, bullet, scrollbar). The frame is a CSS 9-slice (`border-image`), the plaque and buttons are 3-slice, so they stretch to any size. The skin lives at the bottom of `concepts/core/core.css`, scoped to `body[data-theme=workshop]`; swap the PNGs to re-skin.

Cut-outs sit at their original positions in the 1024 x 572 source image; the `CUT` and `HOV` tables, `SIGN` label boxes and hit boxes in `workshop.js` are in those units. The reel rectangle is the transparent frame interior (`reel:{x,y,w,h}` in scene units, 1600 x 900).
The art was built from a Gemini master scene (2576 x 1438), an empty-room plate, and green-keyed object layers used only as masks (edges refined against the master). Hover poses come from Gemini edits of each object layer; only the changed parts are used, the rest keeps the master pixels. The reel video sits behind the plate (engine option `reelBehind`); `assets/reel-poster.jpg` is the still shown until `assets/reel.mp4` plays (replace it with a frame of your reel).
To replace an object: export it at the same position with a transparent background, save as WebP in `art3/` and update its entry in `CUT` (and `HOV` for a hover patch).
The tag font (Kalam) loads from Google Fonts in `workshop.html`; it falls back to a system handwriting font offline.

### Painted wizard concept
`concepts/wizard-art.html` uses the generated art in `concepts/art/` (`wizard-scene.jpg` plus cut-outs `wand/books/owl/robe/letter.png`).
Hotspot regions are listed in `concepts/scenes/wizard-art.js` in image pixels (1672 x 941); change them if you swap the scene image.


### Panels (all concepts)
- **Sub-tabs:** Games (Game Jams, Student Games, Shipped Games) and Design Documents (Systems Logs, Fan GDDs) show one tab at a time; each tab scrolls. Tabs are defined in `core/data.js` (`tabs:[{id,name,ids}]`). Deep links: `#games/jams`, `#games/student`, `#games/shipped`, `#docs/logs`, `#docs/fan`, or an item like `#games/clockout` (opens its tab and scrolls to it).
- **Red close button** in every theme (red tint at rest, bright red on hover and press).
- **Click-to-load embeds:** YouTube, itch.io, Vimeo and Sketchfab iframes load only when clicked (thumbnail + button).
- **Copy link** button per project; skip link and keyboard focus trap in the panel.
