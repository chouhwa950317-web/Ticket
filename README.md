# Ticket

This project is a Vite + React app configured for GitHub Pages deployment.

## Run locally

1. Install dependencies:
   `npm install`
2. Start the development server:
   `npm run dev`

## Deploy to GitHub Pages

The project is configured to publish automatically to GitHub Pages through GitHub Actions.

1. Push the repository to GitHub.
2. Open the repository Settings → Pages.
3. Ensure the source is set to GitHub Actions.
4. The workflow in [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) will build and publish the site on every push to the `main` branch.

The site will be available at:
`https://<your-github-username>.github.io/Ticket/`
