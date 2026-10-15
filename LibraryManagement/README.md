# LibraryHub — Library Management Web Application

A React + Vite learning project for Scenario 6. It includes the same app across three experiments: component testing, optimization, and deployment.

## Requirements

- Node.js 18 or later
- npm
- Git for deployment experiments

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Experiment 1 — Implement Library Component Testing

Topics: Jest concepts, React Testing Library, component behavior.

This project uses **Vitest** with the Jest-compatible API and React Testing Library. This keeps the test style familiar while integrating directly with Vite.

Test coverage included:
- `BookCard.test.jsx`: card details, availability status, borrow click, disabled unavailable book.
- `BookList.test.jsx`: book list rendering and empty results.
- `CategoryFilter.test.jsx`: category selection interaction.
- `SearchBar.test.jsx`: controlled search input interaction.

Run all tests:

```bash
npm run test:run
```

Run tests in watch mode:

```bash
npm test
```

Additional recommended checks for a lab submission:
1. Add tests for the member profile form and required email validation.
2. Test borrowing an available book and verifying it becomes unavailable.
3. Test returning a borrowed book and verifying it becomes available.
4. Test renewing an active loan and verifying the due-date label changes.
5. If an API is added, mock the API to test loading and error states. This demo uses local in-memory data, so it has no network loading/error state.

## Experiment 2 — Optimize Library Application

Implemented:
- `React.lazy()` and `Suspense` for `BookDetails` and `MemberProfile`.
- Vite production build for module bundling and code splitting.
- `useMemo()` for category derivation and filtered book results.
- Lazy-loaded, asynchronously decoded cover images.
- PWA web app manifest and a basic service worker registered only in production.
- Accessible labels, semantic landmarks, keyboard-operable buttons, visible focus styles, status announcements, and descriptive image alternative text.
- React text rendering rather than inserting user input as HTML; input length limits and native form validation for member details.

Build and inspect:

```bash
npm run build
npm run preview
```

Security note: this is a front-end demonstration, not a production library backend. Do not store real member data in this demo. For production, use HTTPS, server-side authorization, input validation, secure session handling, API rate limiting, and server-side loan validation. The service worker is a basic offline fallback, not a complete production caching strategy.

## Experiment 3 — Deploy Library Management Application

### A. GitHub Pages

1. Create a GitHub repository named `LibraryManagement`.
2. Push this project to the repository.
3. In the repository's Settings → Pages, choose GitHub Actions or configure a deployment workflow.
4. For a repository named `LibraryManagement`, build with the base path set:

```bash
GITHUB_PAGES=true npm run build
```

5. Publish the `dist/` folder using a Pages workflow. Example workflow:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: GITHUB_PAGES=true npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Save as `.github/workflows/pages.yml`. If you choose a different repository name, update `base` in `vite.config.js`.

### B. Netlify

1. Import the GitHub repository in Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy, then open the generated site URL.

### C. Vercel

1. Import the GitHub repository in Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy and open the generated URL.

### Verification checklist

- [ ] Home page opens.
- [ ] Books page lists the sample collection.
- [ ] Search works by title and author.
- [ ] Category filtering works.
- [ ] Unavailable books cannot be borrowed.
- [ ] Borrowed books appear under My Borrowing.
- [ ] Return makes the book available again.
- [ ] Renew updates the due-date status.
- [ ] Member profile fields can be edited.
- [ ] Browser console has no critical errors.
- [ ] Production build completes successfully.

### Deployment comparison

| Platform | Build/publish setup | Strength | Note |
|---|---|---|---|
| GitHub Pages | GitHub Actions; publish `dist` | Good for GitHub-hosted static projects | Repository base path must be configured |
| Netlify | `npm run build`, `dist` | Straightforward static-site workflow | Configure redirects if adding client-side routes |
| Vercel | Vite preset, `dist` | Smooth Git integration and preview deployments | Configure routing if adding client-side routes |

## Important limitations

- Books and loans are held in React state; refreshing the page resets them.
- There is no real authentication, backend database, or actual library API.
- Sample cover images are loaded from external URLs and need internet access.
- The app demonstrates front-end borrowing interactions only; it is not a real circulation system.
