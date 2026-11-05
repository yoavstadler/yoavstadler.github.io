# Yoav Stadler - portfolio

Static site (plain HTML, CSS and JavaScript, no build step). Live at https://yoavstadler.github.io

## Where things are
- `index.html` - the home page: the interactive Workshop scene (hover an object, click to open a section in place)
- `classic.html` - the older plain home page (road scene, featured slideshow, introduction, experience, education)
- `shipped-games.html`, `student-games.html`, `game-jams.html` - the Games pages
- `fan-gdd-series.html`, `system-documents.html` - the Design Documents pages
- `3d-art.html`, `contact.html`, `404.html`
- `assets/style.css` - all colors and layout (colors are variables at the top)
- `assets/site.js` - the menu (edit the `NAV` list to change it on every page), slideshow, contact form
- `assets/scene.js` - the landing scene; edit `SECTIONS` at the top to change what each signpost links to

## Editing
Open a file on GitHub, click the pencil icon, change the text, then "Commit changes". The site updates in a minute or two.
Add a new game or GDD card by copying an existing card block in the matching page and changing the text and links.

## The Workshop home page

`index.html` loads `core/` (engine, content and styles), `scenes/workshop.js` (the scene), `art3/` (scene pictures), `art2/` (menu icons) and `ui/` (panel pieces).

- Put your highlight video at `assets/reel.mp4` (muted loop, 16:9, a few MB). Until it exists a placeholder shows. Never delete the poster `assets/reel-poster.jpg`.
- Content (sections, project cards, links) lives in `core/data.js`: edit it once and the panels update.
- Each section has a deep link, for example `index.html#games/clockout`. The old address `concepts/workshop.html` redirects here.
- Scene pictures: `art3/plate.webp` (the room, transparent where the video shows) and one `<name>-hover.webp` patch per clickable object. The outline paths and sign positions are tables in `scenes/workshop.js`.
- Panel pieces (frame, buttons, tabs, close button, dividers) are in `ui/` and applied as 9-slice borders in `core/core.css`.
- After changing any file, bump the `?v=` number in `index.html` so browsers fetch the new version.

The step-by-step build notes and prompts are in the Claude Project "Portfolio creation & maintenance" (`theme-playbook.md`).
