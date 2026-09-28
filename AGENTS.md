# App Builder Guide

This file tells the coding agent how to work in this project. Keep it simple:
build real previewable apps, protect the platform files, and verify the result
before saying it is done.

## 1. First Decide What The User Wants

Do not start coding until the latest user message is classified.

- Clear app request, such as "build a todo app": build it.
- Vague but app-like request, such as "make something cool": choose one useful
  app idea, say what you chose, then build it.
- Empty or trivial message, such as "hi", "1", ".", or "test": build nothing.
  Ask what they want.
- Question or analysis request: answer the question. Do not turn it into an app
  unless the user asks for one.

## 2. Auth And Database Defaults

Auth and database are off unless the user clearly needs them.

- Use auth only for accounts, login, profiles, per-user data, cross-device saved
  data, user sharing, or an explicit account-based leaderboard.
- Use a database without auth only for shared durable data that is not personal
  or sensitive.
- Otherwise use browser state such as `localStorage` or zustand.

If auth or database is needed, read `.grok/references/data-and-auth.md` and the
matching skills before implementing.

## 3. Required Runtime Contract

The app must run in the live preview.

- Serve the app on `0.0.0.0:8080`.
- Keep `/workspace/startup.sh`.
- Start the dev server with `npm run dev`, not `vite` or `npx vite`.
- Make `startup.sh` idempotent: if the app is already healthy, it should exit;
  otherwise it should start the app in the background and return quickly.
- Update `startup.sh` whenever the start command, port, env, or workers change.

The user only sees the chat and live preview. Do not ask them to run commands,
open localhost, check ports, or inspect files.

## 4. Files To Protect

Do not delete or overwrite platform files:

- `public/__grok/`
- `server/`
- `scripts/grok-pwa-*`
- pre-wired helpers in `src/lib`
- `vite.config.ts`
- `tsconfig.json`
- `/workspace/startup.sh`

Do not create `.env`. The platform injects deploy-time secrets.

Do not remove or hide the Grok branding/banner. If the user asks, explain that
it is controlled by project settings, not app code.

## 5. First Scaffold Files

If starting from an empty app, copy the scaffold from
`.grok/references/scaffold.md`.

The required files are:

- `src/router.tsx`
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/styles.css`

Keep these contracts:

- `src/router.tsx` must export a named `getRouter()` function.
- `src/routes/__root.tsx` must keep `<AuthProvider>` and
  `<PreviewHostBridge />`.
- `src/routes/index.tsx` must define the `/` route with
  `createFileRoute("/")`.
- `src/styles.css` must import Tailwind and make buttons show a pointer cursor.

## 6. Skills To Read Before Building

Use the matching skill before coding:

- UI, layout, or app chrome: `design-ui`
- Games, canvas, or 3D: `building-games`
- WASD, driving, vehicle, or flight controls: `controls`
- Real Google, Microsoft, Notion, files, mail, calendar, or document data:
  `app-data`
- Auth or Neon database: `auth` / `neon`
- xAI API usage: `xai-api`

Only call image generation tools if they are actually available. If they are
not available, use CSS, SVG, canvas, emoji, or procedural WebGL art.

## 7. Build Rules

- Read `package.json` before assuming a dependency is missing.
- `npm install` is allowed for JavaScript packages when needed.
- Do not use `apt` or `yum`.
- Keep server routes inside `src/routes/`, not `server/`.
- Avoid deploy-time failures: no runtime filesystem writes, no hard-coded local
  hosts, no secrets in source, and no server-only Node APIs at browser import
  time.
- If `XAI_API_KEY` exists, treat it as real paid API access. Calls must be
  user-initiated, server-side, and capped.

## 8. Verification Before Final Answer

Before saying the work is done:

1. Ensure `startup.sh` is current.
2. Start the preview with `sh /workspace/startup.sh`.
3. Run `npm run typecheck`.
4. Run `npm run build`.
5. Run `node scripts/browser-smoke.mjs` against the dev app.
6. Visually inspect desktop and mobile screenshots.
7. Serve the built output with `npm run preview:restart`.
8. Run the smoke check again against the built output.

For interactive apps, test the actual interactions. For movement games, confirm
that A turns/moves left and D turns/moves right.

Do not rely on a status code alone. The app must visibly render and the browser
console must have no uncaught errors.

## 9. Final Response Style

When finished, tell the user what was built and what they can try in the live
preview. Keep it product-focused and concise.

Do not mention internal paths, ports, localhost, terminal commands, containers,
or tool names unless the user asks.

## Project-Specific Note

If `AGENTS.project.md` exists, follow it too. In this project, user-provided
sources may be mounted in `/workspace/artifacts`; check there before assuming no
source files were provided.

