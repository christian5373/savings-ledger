# Savings Ledger

A savings goal tracker built with React. Data is saved in the browser (localStorage), so it stays there between visits on the same device.

## Deploy it for free (no coding needed) — using Vercel

**Step 1: Put this project on GitHub**
1. Go to github.com and make a free account if you don't have one.
2. Click the "+" in the top right → "New repository." Name it `savings-ledger`. Keep it public. Click "Create repository."
3. On the new repo page, click "uploading an existing file."
4. Drag in every file/folder from this project (package.json, vite.config.js, index.html, src/ folder, README.md) and commit.

**Step 2: Deploy on Vercel**
1. Go to vercel.com and sign up using your GitHub account (this connects them automatically).
2. Click "Add New Project."
3. Find `savings-ledger` in the list and click "Import."
4. Leave all settings as default (Vercel auto-detects Vite) and click "Deploy."
5. Wait about a minute — Vercel will give you a live link like `savings-ledger-yourname.vercel.app`.

That link is a real, working website anyone can visit. Every time you push a change to GitHub, Vercel automatically updates the live site.

## Running it on your own computer first (optional, to preview changes)

If you eventually get comfortable with a terminal:
```
npm install
npm run dev
```
This starts a local preview at `http://localhost:5173`.

## Notes
- Data is stored per-device/per-browser (localStorage) — it won't sync between your phone and laptop. For that you'd need a real backend (e.g., Firebase), which is a good "v2" upgrade once the basic version is live.
- To eventually wrap this as an installable iOS/Android app, tools like PWA Builder (pwabuilder.com) can package a deployed website like this one — worth doing once you have some real users.
