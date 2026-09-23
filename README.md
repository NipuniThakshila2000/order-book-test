# THE ORDER Interactive Digital Book Platform

Production-oriented React/TanStack Start application for an authenticated, entitlement-gated interactive version of **THE ORDER**. The app keeps the existing premium reading experience from the supplied workspace and adds database-backed schema, auth, account pages, purchase scaffolding, admin review, progress sync, journal/response persistence, and protected member routes.

## Installation

```bash
npm install
cp .env.example .env
npm run dev
```

Local dev runs on `http://localhost:8080`.

## Environment

Copy `.env.example` to `.env` and configure:

- `DATABASE_URL`: production Postgres/Neon. Leave unset for local in-memory PGLite.
- `VITE_AUTH_ENABLED`: set `true` for real Better Auth sessions.
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`: required for production auth.
- `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`: payment integration.
- `PRIVATE_UPLOAD_ROOT`, `STORAGE_PROVIDER`: private file storage abstraction.
- `EMAIL_*`: placeholders for welcome, reset, purchase, and verification emails.

Never commit real secrets.

## Database

Schema is in `migrations/`:

- `0001_auth.sql`: Better Auth users, sessions, accounts, verification tokens.
- `0002_order_platform.sql`: profiles, purchases, entitlements, books, sections, chapters, content blocks, responses, journal, progress, assessment, seven steps, prayers, glossary, downloads, book-owner verification, settings, and admin audit.

Run production migrations:

```bash
npm run db:migrate
```

Seed/demo records are inserted by `0002_order_platform.sql` and are clearly labelled demo/placeholders. They do not pretend to be the real book text.

```bash
npm run seed
```

## Development

```bash
npm run dev
npm run typecheck
npm test
npm run build
```

The local fallback database is PGLite and applies migrations automatically at startup.

## Production

Set `DATABASE_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, payment env vars, and storage/email env vars in the deployment platform. Then run:

```bash
npm run build
```

The build script compiles the app and runs migrations against `DATABASE_URL`.

## Authentication

Better Auth is configured in `src/lib/auth`. Email/password is enabled for this app, and OAuth broker support remains configurable. Protected server functions use `authMiddleware`, which resolves the verified user server-side and rejects unauthenticated access.

Routes such as `/experience`, `/battlefield`, `/assessment`, `/authority`, `/journal`, `/record`, `/print`, and `/experience/downloads` are guarded by `AccessBoundary`. Server-side data functions also scope all user-generated data by `user_id`.

## Payments

`/purchase` creates a server-side pending purchase. When `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` are configured, `createCheckout` creates a Stripe Checkout Session. The app does not grant access from a frontend success return. Entitlements are activated by server-side confirmation/webhook integration or an admin grant.

Webhook processing should validate `STRIPE_WEBHOOK_SECRET`, look up `metadata.purchase_id`, mark the purchase paid, and create a `book_access` entitlement.

## Admin

`/admin` shows analytics, users, purchases, content counts, and book-owner verification submissions. Admins can approve/reject verification and grant access. The local `dev-user` is treated as admin only for no-database development; production should set real admin roles in `user_profile`.

## Content

The platform is content-driven:

- `book`, `section`, `chapter`, and `content_block` model the reading experience.
- `assessment_item`, `seven_step`, `prayer`, `glossary_term`, and `download_resource` support specialized sections.
- Existing source files under `src/lib/content` power the current premium prototype UI and can be migrated into database records through admin/import tooling.

Use the admin/database to add chapters, exercises, prayers, glossary terms, downloads, and audio. Demo records are placeholders only.

## File Storage

Private uploads are represented by secure storage references (`photo_ref`, `file_path`) rather than public guessed URLs. Configure `STORAGE_PROVIDER` and `PRIVATE_UPLOAD_ROOT`; production should back this with S3/R2/Blob storage and signed serving routes. Book-owner verification photos must remain private and manually reviewed.

## Key Routes

- `/`: public landing page
- `/sign-in`: register/sign in
- `/purchase`: checkout and book-owner verification request
- `/dashboard`: resume, progress, quick access
- `/account`: profile/access state
- `/experience`: protected member index
- `/experience/how-to-use`: public guide alias
- `/experience/chambers`, `/experience/assessment`, `/experience/authority`, `/experience/light`, `/experience/prayers`
- `/experience/journal`, `/experience/pages`, `/experience/glossary`, `/experience/search`, `/experience/downloads`
- `/admin`: secure admin panel

## Testing

Run:

```bash
npm test
npm run typecheck
npm run build
```

Critical flows to verify manually:

- Visitor -> register -> purchase checkout creation.
- Book owner -> submit verification -> admin approval -> discount entitlement.
- Admin -> grant access -> user can open protected experience.
- User -> read/chamber -> write response -> autosave/sync -> dashboard resume.
- User -> journal/pages/search/glossary/downloads.

# order-book-test
