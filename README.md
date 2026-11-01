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
