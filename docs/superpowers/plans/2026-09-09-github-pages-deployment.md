# GitHub Pages Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the AURA Vite application from `main` to the GitHub project Pages URL.

**Architecture:** Vite reads an optional `VITE_BASE_PATH` and defaults to `/` locally. A GitHub Actions workflow validates the application, builds with `/landing_page/`, uploads `dist`, and deploys through the official Pages artifact flow.

**Tech Stack:** Bun, Vite, GitHub Actions, GitHub Pages.

## Global Constraints

- Deploy only on pushes to `main` or manual workflow dispatch.
- Preserve local development at `/`.
- Use `/landing_page/` only for the Pages build.
- Run tests, lint, and build before artifact upload.
- Use official current Pages actions and minimal permissions.
- Do not commit generated `dist` files.

---

### Task 1: Configure and Deploy GitHub Pages

**Files:**
- Modify: `vite.config.ts`
- Create: `.github/workflows/deploy-pages.yml`

**Interfaces:**
- Consumes: optional environment variable `VITE_BASE_PATH`.
- Produces: a Vite `base` value defaulting to `/`.
- Produces: a `github-pages` deployment from the `dist` artifact.

- [ ] **Step 1: Verify the Pages-path build currently fails**

Run:

```bash
VITE_BASE_PATH=/landing_page/ bun run build
rg '(/landing_page/)' dist/index.html
```

Expected: the build succeeds but the search finds no prefixed asset URLs because Vite does not yet consume `VITE_BASE_PATH`.

- [ ] **Step 2: Configure Vite's environment-driven base**

Add:

```ts
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
  },
});
```

- [ ] **Step 3: Add the Pages workflow**

Create `.github/workflows/deploy-pages.yml` with:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Set up Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Test
        run: bun test
      - name: Test with Vitest
        run: bun run test
      - name: Lint
        run: bun run lint
      - name: Build
        run: bun run build
        env:
          VITE_BASE_PATH: /landing_page/
      - name: Configure GitHub Pages
        uses: actions/configure-pages@v5
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Verify the Pages build and workflow**

Run:

```bash
bun test
bun run test
bun run lint
bun run build
VITE_BASE_PATH=/landing_page/ bun run build
rg '(/landing_page/)' dist/index.html
```

Expected: 53 Bun tests and 53 Vitest tests pass, lint/build commands exit 0, and every generated local asset reference in `dist/index.html` starts with `/landing_page/`.

- [ ] **Step 5: Commit and push**

```bash
git add vite.config.ts .github/workflows/deploy-pages.yml
git commit -m "ci: deploy landing page to GitHub Pages"
git push -u origin cursor/enhanced-aura-landing-885d
```

- [ ] **Step 6: Merge and monitor**

Merge the feature branch into `main`, push `main`, monitor the `Deploy to GitHub Pages` workflow, and verify `https://meliah-sante.github.io/landing_page/` returns HTTP 200 with prefixed assets.
