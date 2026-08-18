# Implementation Plan & Tasks — When To Use AI Game

Status: **COMPLETE** (all tasks below executed and verified on 18 Aug 2026).

## 1. Goals
1. Turn all 20 Q&As from `When-To-Use-AI-Game-20Q.html` into a gamified, timed app.
2. 10-second per-question timer to prevent answer lookups.
3. Build on the **vite8-architect** stack (Vite 8.2.1 / plugin-react 6.0.5 / Node ≥20.19).
4. Duolingo iOS design language (from `images UI Duolingo iOS.pdf` screenshots).
5. Deploy-ready for Netlify with detailed instructions; README for all dev levels.
6. Separate Contact page for Gregory Kennedy with 3 reveal buttons.

## 2. Package verification (security requirement)
- npm registry (18 Aug 2026): vite **8.2.1**, @vitejs/plugin-react **6.0.5**,
  react/react-dom **19.2.8**, framer-motion **13.1.0**, canvas-confetti **1.9.4**,
  lucide-react **1.32.0**; local Node **v24.16.0**, pnpm **10.6.2**.
- FireCrawl developer search confirmed Vite 8.2.1 is the current supported line
  (8.0/8.1 unsupported; Vite 8 stable Mar 2026, 8.1 Jun 2026, 8.2.x current).

## 3. Architecture decisions
- 4-screen SPA state machine (start / quiz / results / contact) + hash deep link `#/contact`.
- Deadline-based timer (`performance.now()`) — drift-proof.
- Scoring: +1 score, streak++, XP = 10 + ceil(seconds remaining); timeout = miss.
- Design tokens lifted from Duolingo screenshots; Nunito 700–900 type.
- No router/state libs: minimal attack surface and bundle (~75 KB gzip).

## 4. Task list (as executed)
- [x] Transcribe all 20 questions/answers/explanations → `src/data/questions.js`
- [x] vite8-architect `package.json` + `vite.config.js` (pnpm-only, no Babel, no esbuild flag)
- [x] Duolingo design system CSS (3D buttons, banners, medals, timer ring)
- [x] Start / Quiz / Timer / Results / Contact components
- [x] Gamification: XP, streaks, confetti, leagues, keyboard shortcuts
- [x] Contact page: 3 buttons → reveal mailto + LinkedIn links
- [x] `netlify.toml` (Node 22, pnpm 10, dist publish, SPA redirect, cache headers)
- [x] `pnpm install` + `pnpm build` green (fixed Rolldown manualChunks + lucide brand-icon removal)
- [x] Browser-verified: start screen, timeout path, correct path (XP/streak), contact reveal, deep link
- [x] README.md (setup for Levels 0–3 + 3 Netlify deploy options + checklist)

## 5. Issues found & fixed during build
1. **Rolldown rejects object-form `manualChunks`** (Rollup legacy). Fix: removed;
   Rolldown auto-splits.
2. **`esbuild: false` deprecated no-op in Vite 8** (warning). Fix: removed; Oxc is default.
3. **lucide-react 1.x removed brand icons** (`Linkedin`). Fix: inline SVG mark.

## 6. Future enhancements (optional)
- WebAudio SFX (correct chime / timeout buzz) behind a mute toggle.
- localStorage best-score + "daily challenge" seed.
- framer-motion spring transitions between screens.
- i18n + share-card image (OG) for social.