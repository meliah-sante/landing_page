# GitHub Pages Deployment Design

## Goal

Deploy the AURA landing page to GitHub Pages after changes reach `main`.

## Architecture

- A GitHub Actions workflow runs on every push to `main` and on manual dispatch.
- Bun installs the locked dependencies and runs tests, linting, and the production build.
- Vite receives `/landing_page/` as its production base path so generated asset URLs work under the GitHub project-site URL.
- The workflow uploads `dist` as the Pages artifact and deploys it with GitHub's official Pages actions.
- Pages deployment uses the minimal required `contents: read`, `pages: write`, and `id-token: write` permissions.
- A concurrency group prevents overlapping production deployments.

## Local Development

Local development and ordinary production builds continue to use `/`. The Pages-specific base path is supplied through `VITE_BASE_PATH` only in the deployment workflow.

## Verification

- Run the full Bun and Vitest suites, lint, and normal production build.
- Build with `VITE_BASE_PATH=/landing_page/` and verify generated CSS, JavaScript, favicon, and image URLs use the repository prefix.
- Validate the workflow syntax and action configuration.
- Merge the feature branch into `main`, push `main`, then monitor the Pages workflow.
- Confirm the live site responds successfully at `https://meliah-sante.github.io/landing_page/` and loads its assets.

## Failure Handling

- Test, lint, or build failures stop deployment.
- The deployment job depends on a successful build job.
- The workflow publishes the deployed page URL through the GitHub Pages environment.
- If Pages is not enabled for GitHub Actions, report the repository setting that must be changed rather than bypassing it.
