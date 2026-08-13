# erikmesic.github.io

Personal recruiting site for Erik Mesic, served through GitHub Pages.

## Architecture

The site is a multi-page, data-driven static site. Shared navigation, data population, contact behavior, theme persistence, responsive behavior, project rendering, and scroll reveals are handled by `assets/js/pageload.js`; the editorial motion and recruiter assistant live in `assets/js/visuals.js` and `assets/js/editorial.js`.

- `index.html` — homepage and masthead
- `experience.html` — longer CV-style experience history
- `projects.html` — selected and additional projects plus research interests
- `education.html` — education
- `honors.html` — honors and awards
- `hobbies.html` — hobbies and interests
- `projects/` — individual project pages
- `assets/js/data.json` — primary structured content
- `assets/js/pageload.js` — shared site loader/navigation/rendering
- `assets/js/visuals.js` — lightweight motion bootstrap
- `assets/js/editorial.js` — editorial annotations and recruiter assistant
- `assets/js/assistant-ai.js` — optional browser-native AI refinement; no API key is embedded in the public site
- `assets/css/` — core theme and targeted editorial overrides

## Editing content

Most factual content belongs in `assets/js/data.json`. Keep completed work, planned research, and research interests clearly distinguished; the recruiter assistant follows the same distinction.

## Deployment

This is a `username.github.io` repository and is served from the `main` branch through GitHub Pages.
