# When To Use AI — The 10-Second Architecture Challenge

A Duolingo-styled, timed quiz game that teaches the core decision framework of
**When To Use AI**: match every system problem to **Humans**, **Rules / Code**,
**Machine Learning**, or **Generative AI** — in **10 seconds per round**, so instinct
(not Google) does the answering.

Built with **Vite 8.2.1 + React 19.2.8** (vite8-architect stack), styled after the
Duolingo iOS design language (feather green `#58CC02`, 3D push buttons, streaks, XP,
league medals), and ready to deploy to **Netlify** in minutes.

---

## 1. What the game does

| Feature | Detail |
|---|---|
| **20 rounds** | All 20 questions + answer explanations from `When-To-Use-AI-Game-20Q.html`, transcribed verbatim into `src/data/questions.js`. |
| **10-second timer** | Circular countdown ring per round (green → amber → red pulse). Timeout counts as a miss and reveals the correct answer — no time to look answers up online. |
| **Gamification** | XP with speed bonus (`10 + seconds left`), streak flame, live HUD, Duolingo-style "Excellent!" / "Not quite." feedback banners, confetti bursts, league medals (Diamond / Silver / Bronze). |
| **Hybrid-architecture diagrams** | Rounds 6 & 20 render the GenAI → Rules → Humans pipeline chips. |
| **Keyboard play** | Press `1–4` to answer instantly. |
| **Contact page** | Separate screen (`#/contact`) for **Gregory Kennedy** with three buttons — *Book A Lesson with Gregory*, *Discuss your AI Project Idea*, *Build my Project* — each revealing clickable `mailto:peacedude@gmail.com` and LinkedIn links. |
| **Accessibility** | `aria-live` feedback, focus rings, `prefers-reduced-motion` support, semantic roles. |

---

## 2. Tech stack (verified latest-stable as of 19 Aug 2026)

| Package | Version | Why |
|---|---|---|
| `vite` | **8.2.1** | Current stable major (Rolldown/Oxc-based; v5–7 outdated). Verified via npm registry + FireCrawl (vite.dev releases). |
| `@vitejs/plugin-react` | **6.0.5** | Oxc-based React plugin; no Babel. |
| `react` / `react-dom` | **19.2.8** | Latest stable React 19. |
| `framer-motion` | **13.1.0** | Reserved for future spring/transition upgrades (screen choreography currently CSS-driven for zero-JS-animation cost). |
| `canvas-confetti` | **1.9.4** | Dependency-free, GPU-cheap celebration bursts — the single biggest "game feel" win per kilobyte. |
| `lucide-react` | **1.32.0** | Crisp tree-shakeable icons (brand icons like LinkedIn are inlined as SVG since lucide 1.x removed them). |
| Node.js | **≥ 20.19 or ≥ 22.12** | Vite 8 minimum. Netlify pinned to Node 22 via `netlify.toml`. |
| pnpm | **10.x** | Required package manager (per vite8-architect). |

> **Why no Tailwind / router / state library?** The design is a bespoke Duolingo-style
> system (hand-tuned CSS tokens in `src/styles/index.css`), navigation is a 4-screen
> state machine with hash deep-linking (`#/contact`) — adding react-router or a state
> store would add weight without adding capability. Fewer dependencies = faster builds,
> smaller bundle, fewer security updates.

---

## 3. Project structure

```
when-to-use-ai-game/
├── index.html                  # Entry, Nunito font, meta, favicon
├── netlify.toml                # Netlify build + caching + SPA redirect
├── package.json                # Vite 8 / React 19 / pnpm
├── vite.config.js              # Vite 8 canonical config (Oxc, LightningCSS)
├── public/
│   └── favicon.svg             # Owl-green app mark
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # Screen router + HUD + hash routing
    ├── data/questions.js       # ALL 20 questions, answers, explanations, timer=10
    ├── styles/index.css        # Duolingo design system (colors, 3D buttons, cards)
    └── components/
        ├── StartScreen.jsx     # Splash: mascot, trade-off cards, CTA
        ├── QuizScreen.jsx      # Timer logic, options, feedback, XP/streak scoring
        ├── TimerRing.jsx       # SVG 10s countdown ring
        ├── ResultsScreen.jsx   # League medal, stats, confetti, takeaway
        └── ContactScreen.jsx   # Gregory Kennedy contact page (3 reveal buttons)
```

---

## 4. Setup — for every level of developer

### Level 0 — "I just want to play it"
1. Deploy to Netlify (section 5) or ask whoever built it for the URL.
2. Open the URL on any phone or desktop browser. Play. That's it.

### Level 1 — Beginner (first time with Node)
1. **Install Node.js 22 LTS** from <https://nodejs.org> (or `brew install node@22`).
   Verify: `node --version` → must print `v20.19+` or `v22+`.
2. **Enable pnpm** (ships with Node's corepack):
   ```bash
   corepack enable
   corepack prepare pnpm@10.6.2 --activate
   ```
3. Open a terminal in this folder and run:
   ```bash
   pnpm install     # downloads dependencies (~10 s)
   pnpm dev         # starts http://localhost:3000
   ```
4. Open <http://localhost:3000> and play.

### Level 2 — Intermediate (build & ship)
```bash
pnpm install
pnpm build         # production bundle → dist/
pnpm preview       # serve the production bundle locally to sanity-check
```
Deploy `dist/` anywhere static files are served (Netlify Drop, S3, GitHub Pages…).

### Level 3 — Advanced notes
- **Vite 8 specifics**: transformation is Oxc; bundling is Rolldown. `esbuild: false`
  is a deprecated no-op (do not add it), Babel configs are forbidden, and Rollup's
  object-form `manualChunks` is rejected — Rolldown auto-splits vendors.
- **CSS minification** uses bundled LightningCSS (`cssMinify: 'lightningcss'`).
- **Timer accuracy**: the countdown is deadline-based (`performance.now()`), immune to
  interval drift and background-tab throttling surprises.
- **Bundle budget**: ~75 KB gzipped total including React. Manual chunking is
  unnecessary at this size; revisit only if you add heavy libraries.
- **Reduced motion**: all animation collapses under `prefers-reduced-motion`.

---

## 5. Deploy to Netlify (detailed)

The repo already contains a production-ready `netlify.toml`
(build command `pnpm build`, publish dir `dist`, Node 22, pnpm 10, SPA redirect,
immutable asset caching).

### Option A — Git-based (recommended, auto-deploys on every push)
1. Push this folder to a Git host:
   ```bash
   cd when-to-use-ai-game
   git init && git add -A && git commit -m "When To Use AI game"
   git branch -M main
   git remote add origin https://github.com/<you>/when-to-use-ai-game.git
   git push -u origin main
   ```
2. Go to <https://app.netlify.com> → **Add new site → Import an existing project** →
   choose GitHub/GitLab/Bitbucket → select the repo.
3. Netlify reads `netlify.toml` automatically. Confirm the detected settings show:
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Environment: `NODE_VERSION=22`, `PNPM_VERSION=10`
4. Click **Deploy**. In ~30–60 s you get a live URL like
   `https://when-to-use-ai.netlify.app`. Every future `git push` redeploys, and each
   deploy gets a preview URL (Deploy Previews) for review.

### Option B — Netlify Drop (no Git, 60 seconds)
1. Locally: `pnpm install && pnpm build` → produces `dist/`.
2. Open <https://app.netlify.com/drop>.
3. Drag the **dist** folder onto the page. Done — instant public URL.
   (Use this for quick shares; use Option A for anything you'll update.)

### Option C — Netlify CLI (terminal deploy with CI-like control)
```bash
pnpm dlx netlify-cli login          # one-time browser auth
pnpm dlx netlify-cli link           # link this folder to a new/existing site
pnpm dlx netlify-cli deploy --build # build + deploy a draft
pnpm dlx netlify-cli deploy --build --prod  # ship to the live URL
```

### Post-deploy checklist
- [ ] Open the site; start screen loads with the green mascot.
- [ ] Start a round; the ring counts 10 → 0 and times out correctly.
- [ ] Visit `https://<your-site>.netlify.app/#/contact` directly (deep link works).
- [ ] Click each contact button; email + LinkedIn links are clickable.
- [ ] Lighthouse (optional): Performance/Accessibility ≥ 95.

### Custom domain (optional)
Netlify dashboard → **Domain management → Add custom domain** → follow DNS
instructions (Netlify DNS or external). HTTPS certificates are automatic.

---

## 6. Customizing content

All questions live in **one file**: `src/data/questions.js`.
Each entry: `label`, `title`, `prompt`, `correct`, `feedbackTitle`, `feedback`,
optional `pipeline` (diagram chips). Change `ROUND_SECONDS` to adjust the timer.
No other file needs touching to edit content.

Contact details live at the top of `src/components/ContactScreen.jsx`
(`EMAIL`, `LINKEDIN`, and the three `ACTIONS` buttons).

---

## 7. Design credits

Visual language adapted from Duolingo's iOS app (see `images-duolingo/` screenshots):
feather green `#58CC02` with `#46A302` 3D button shadows, sky blue `#1CB0F6`,
streak orange `#FF9600`, XP gold `#FFC800`, error red `#FF4B4B`, Super purple
`#CE82FF`, rounded extrabold **Nunito** type, pill progress bars, league medals,
and bottom-sheet feedback banners.

---

## 8. License & contact

Created by **Gregory Kennedy** — [peacedude@gmail.com](mailto:peacedude@gmail.com) ·
[linkedin.com/in/gregorykennedymindfuldude](https://www.linkedin.com/in/gregorykennedymindfuldude/)