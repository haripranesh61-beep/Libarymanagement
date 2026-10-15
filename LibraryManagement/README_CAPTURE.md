# Scenario 6 — Experiments 1–3 Capture Pack

This pack contains the supplied React/Vite project plus a browser screenshot helper and PDF generator. The supplied project uses local in-memory sample data for its book/borrowing UI; it does not itself prove a live backend or that a site has been deployed.

## Run locally (Windows)
1. Open a terminal in this `LibraryManagement` folder.
2. Install dependencies and Playwright's browser:
   ```bat
   npm install
   npx playwright install chromium
   ```
3. Start the app in terminal 1:
   ```bat
   npm run dev -- --host 127.0.0.1
   ```
4. In terminal 2, run:
   ```bat
   npm run capture
   ```
   If the app runs on another URL, use `set APP_URL=http://127.0.0.1:5174/` before running capture.
5. Build the production version and test it:
   ```bat
   npm run test:run
   npm run build
   npm run preview
   ```
6. Create PDFs. Install Python dependencies first:
   ```bat
   py -m pip install pillow reportlab
   py make_pdfs.py
   ```
   PDFs are saved in `output`.

## Screenshot layout
- 1 screenshot: one image fills the portrait A4 page proportionally.
- 2 screenshots: stacked vertically (1 column × 2 rows).
- 3–4 screenshots: 2 × 2 grid.
- More than 4 screenshots: additional portrait A4 pages using 2 × 2 grids.
- No added headings, labels, or page numbers.
- Separate PDF per screenshot subfolder. The capture script saves images into experiment-named subfolders, and the PDF generator creates one PDF per non-empty experiment folder.

## Evidence limitations / experiment notes
- Experiment 1: the included capture script attempts home, books, search, category, and details screens. The included tests use Vitest with a Jest-compatible API and React Testing Library (see `src/tests`). Run `npm run test:run` for test evidence; screenshots alone do not prove tests passed.
- Experiment 2: captures borrow/renew/return and member profile when the expected controls are found. The app uses `React.lazy`/`Suspense`, `useMemo`, image lazy loading, a manifest, and a service worker registered in production. Check `npm run build` and `npm run preview` for production behavior.
- Experiment 3: this source provides deployment instructions and a GitHub Pages workflow. Actual GitHub Pages, Netlify, and Vercel deployment screenshots must be captured from real deployed URLs after you deploy. Do not present localhost as proof of deployment. Use `APP_URL` for one deployment URL at a time and capture the deployed app.
- Review every screenshot manually for the intended state, missing actions, clipping, and legibility. Some interactions may need adjustment if the UI labels differ.
