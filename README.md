# erikmesic.github.io

This repository hosts your personal resume website (GitHub Pages). I added a simple, responsive single-page site that is data-driven so you can edit the content without touching HTML.

Files added:

- `index.html` — single-page resume layout
- `assets/css/styles.css` — styles
- `assets/js/main.js` — populates the page from the JSON data
- `assets/js/data.json` — your profile data (edit this file to change text)

How to edit content

- Edit `assets/js/data.json` to update your name, headline, experience, projects, education, skills, honors, updates, and contact info. The site reads this JSON at runtime.
- To add a resume PDF, upload `resume.pdf` to the repository root (or update the `contact.resume` field with an external URL).

Deployment

- This repo is a `username.github.io` repository — GitHub Pages will serve the site from the `main` branch automatically. You already have a `CNAME` in the repo; the site will be available at your custom domain when DNS is configured.

Next steps I can take (pick any):

- Replace placeholder content with the full text from your LinkedIn / a supplied resume.
- Add deeper styling, printable resume PDF generation, or PDF upload.
- Add animations, light/dark theme toggle, or multi-page resume (separate pages for projects, publications, etc.).

