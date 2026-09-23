import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";

type PlatformContext = { userId: string };
export type JsonValue = null | string | number | boolean | JsonValue[] | { [key: string]: JsonValue };
export type MemberSummary = {
  profile: { role: string; access_status: string; purchase_status: string };
  hasAccess: boolean;
  progress: {
    section_slug: string | null;
    chapter_slug: string | null;
    content_id: string | null;
    route: string;
    scroll_y: number;
    completed_chapters: string[];
    completed_steps: string[];
    completed_assessment_items: string[];
    completed_prayers: string[];
    stillness_minutes: number;
    light_completed: boolean;
    last_activity_at: string;
  } | null;
  counts: { responses: number; journal: number; purchases: number; verifications: number };
  settings: Record<string, JsonValue>;
  verification: { id: string; status: string; rejection_reason: string | null; created_at: string } | null;
};
export type JournalRow = {
  id: string;
  title: string;
  body: string;
  source_section: string | null;
  source_chapter: string | null;
  created_at: string;
  updated_at: string;
};
export type PageRow = {
  id: string;
  response_key: string;
  section_slug: string | null;
  chapter_slug: string | null;
  prompt: string | null;
  response: string;
  completed: boolean;
  updated_at: string;
};
export type AdminOverview = {
  analytics: Record<string, number>;
  users: Array<{
    id: string;
    email: string | null;
    name: string | null;
    role: string | null;
    access_status: string | null;
    purchase_status: string | null;
    created_at: string;
  }>;
  verifications: Array<{
    id: string;
    user_id: string;
    email: string | null;
    status: string;
    photo_ref: string;
    note: string | null;
    rejection_reason: string | null;
    created_at: string;
  }>;
  purchases: Array<{
    id: string;
    user_id: string;
    email: string | null;
    amount_cents: number;
    currency: string;
    status: string;
    provider: string;
    provider_transaction_id: string | null;
    created_at: string;
  }>;
  content: Record<string, number>;
};

const id = () => crypto.randomUUID();

const env = (key: string) => {
  const value = process.env[key]?.trim();
  return value || undefined;
};

async function ensureProfile(userId: string) {
  const sql = await getSql();
  await sql.query(
    `insert into user_profile(user_id, role, access_status, purchase_status)
     values ($1, $2, $3, $4)
     on conflict (user_id) do nothing`,
    [userId, isBootstrapAdmin(userId) ? "admin" : "user", "none", "none"],
  );
}

function isBootstrapAdmin(userId: string) {
  return userId === "dev-user";
}

async function requireAdmin(userId: string) {
  await ensureProfile(userId);
  const sql = await getSql();
  const rows = await sql.query<{ role: string }>(
    "select role from user_profile where user_id = $1",
    [userId],
  );
  if (rows[0]?.role !== "admin" && !isBootstrapAdmin(userId)) {
    throw new Error("Forbidden");
  }
}

async function hasBookAccess(userId: string) {
  const sql = await getSql();
  const rows = await sql.query<{ ok: boolean }>(
    `select exists(
       select 1 from entitlement
       where user_id = $1 and type in ('book_access', 'admin_grant') and status = 'active'
       and (ends_at is null or ends_at > now())
     ) as ok`,
    [userId],
  );
  if (isBootstrapAdmin(userId)) return true;
  return Boolean(rows[0]?.ok);
}

const ProgressInput = z.object({
  sectionSlug: z.string().optional().nullable(),
  chapterSlug: z.string().optional().nullable(),
  contentId: z.string().optional().nullable(),
  route: z.string().min(1).max(300),
  scrollY: z.number().int().min(0).max(1_000_000).default(0),
  completedChapter: z.string().optional(),
  completedStep: z.string().optional(),
  completedAssessmentItem: z.string().optional(),
  completedPrayer: z.string().optional(),
  stillnessMinutes: z.number().int().min(0).max(10_000).optional(),
  lightCompleted: z.boolean().optional(),
});

const ResponseInput = z.object({
  responseKey: z.string().min(1).max(220),
  response: z.string().max(50_000),
  prompt: z.string().max(2_000).optional(),
  sectionSlug: z.string().max(120).optional(),
  chapterSlug: z.string().max(120).optional(),
  contentBlockId: z.string().max(120).optional(),
  completed: z.boolean().optional(),
});

const JournalInput = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(180),
  body: z.string().max(100_000),
  sourceSection: z.string().max(120).optional(),
  sourceChapter: z.string().max(120).optional(),
});

const VerificationInput = z.object({
  photoRef: z.string().min(1).max(1_000),
  note: z.string().max(2_000).optional(),
});

export const getMemberSummary = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { userId } = context as PlatformContext;
    await ensureProfile(userId);
    const sql = await getSql();
    const [profile] = await sql.query<{
      role: string;
      access_status: string;
      purchase_status: string;
    }>("select role, access_status, purchase_status from user_profile where user_id = $1", [userId]);
    const [progress] = await sql.query<{
      section_slug: string | null;
      chapter_slug: string | null;
      content_id: string | null;
      route: string;
      scroll_y: number;
      completed_chapters: string[];
      completed_steps: string[];
      completed_assessment_items: string[];
      completed_prayers: string[];
      stillness_minutes: number;
      light_completed: boolean;
      last_activity_at: string;
    }>("select * from progress where user_id = $1", [userId]);
    const [counts] = await sql.query<{
      responses: number;
      journal: number;
      purchases: number;
      verifications: number;
    }>(
      `select
        (select count(*) from user_response where user_id = $1)::int as responses,
        (select count(*) from journal_entry where user_id = $1)::int as journal,
        (select count(*) from purchase where user_id = $1)::int as purchases,
        (select count(*) from book_owner_verification where user_id = $1)::int as verifications`,
      [userId],
    );
    const settings = await sql.query<{ key: string; value: JsonValue }>(
      "select key, value from app_setting where key in ('pricing', 'access_rules')",
    );
    const [verification] = await sql.query<{
      id: string;
      status: string;
      rejection_reason: string | null;
      created_at: string;
    }>(
      `select id, status, rejection_reason, created_at
       from book_owner_verification
       where user_id = $1
       order by created_at desc
       limit 1`,
      [userId],
    );
    return {
      profile,
      hasAccess: await hasBookAccess(userId),
      progress: progress ?? null,
      counts,
      settings: Object.fromEntries(settings.map((s) => [s.key, s.value])),
      verification: verification ?? null,
    } satisfies MemberSummary;
  });

export const saveProgress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => ProgressInput.parse(data))
  .handler(async ({ context, data }) => {
    const { userId } = context as PlatformContext;
    await ensureProfile(userId);
    const sql = await getSql();
    await sql.query(
      `insert into progress(
        user_id, section_slug, chapter_slug, content_id, route, scroll_y,
        completed_chapters, completed_steps, completed_assessment_items, completed_prayers,
        stillness_minutes, light_completed, last_activity_at, updated_at
      )
      values (
        $1, $2, $3, $4, $5, $6,
        case when $7::text is null then '{}'::text[] else array[$7::text] end,
        case when $8::text is null then '{}'::text[] else array[$8::text] end,
        case when $9::text is null then '{}'::text[] else array[$9::text] end,
        case when $10::text is null then '{}'::text[] else array[$10::text] end,
        coalesce($11::int, 0), coalesce($12::boolean, false), now(), now()
      )
      on conflict (user_id) do update set
        section_slug = excluded.section_slug,
        chapter_slug = excluded.chapter_slug,
        content_id = excluded.content_id,
        route = excluded.route,
        scroll_y = excluded.scroll_y,
        completed_chapters = (
          select array(select distinct unnest(progress.completed_chapters || excluded.completed_chapters))
        ),
        completed_steps = (
          select array(select distinct unnest(progress.completed_steps || excluded.completed_steps))
        ),
        completed_assessment_items = (
          select array(select distinct unnest(progress.completed_assessment_items || excluded.completed_assessment_items))
        ),
        completed_prayers = (
          select array(select distinct unnest(progress.completed_prayers || excluded.completed_prayers))
        ),
        stillness_minutes = greatest(progress.stillness_minutes, excluded.stillness_minutes),
        light_completed = progress.light_completed or excluded.light_completed,
        last_activity_at = now(),
        updated_at = now()`,
      [
        userId,
        data.sectionSlug ?? null,
        data.chapterSlug ?? null,
        data.contentId ?? null,
        data.route,
        data.scrollY,
        data.completedChapter ?? null,
        data.completedStep ?? null,
        data.completedAssessmentItem ?? null,
        data.completedPrayer ?? null,
        data.stillnessMinutes ?? null,
        data.lightCompleted ?? null,
      ],
    );
    return { ok: true };
  });

export const upsertResponse = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => ResponseInput.parse(data))
  .handler(async ({ context, data }) => {
    const { userId } = context as PlatformContext;
    await ensureProfile(userId);
    const sql = await getSql();
    await sql.query(
      `insert into user_response(
        id, user_id, content_block_id, response_key, section_slug, chapter_slug,
        prompt, response, completed, completed_at, updated_at
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, case when $9 then now() else null end, now())
      on conflict (user_id, response_key) do update set
        content_block_id = excluded.content_block_id,
        section_slug = excluded.section_slug,
        chapter_slug = excluded.chapter_slug,
        prompt = excluded.prompt,
        response = excluded.response,
        completed = excluded.completed,
        completed_at = case when excluded.completed then coalesce(user_response.completed_at, now()) else null end,
        updated_at = now()`,
      [
        id(),
        userId,
        data.contentBlockId ?? null,
        data.responseKey,
        data.sectionSlug ?? null,
        data.chapterSlug ?? null,
        data.prompt ?? null,
        data.response,
        data.completed ?? false,
      ],
    );
    return { ok: true };
  });

export const listJournalEntries = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { userId } = context as PlatformContext;
    await ensureProfile(userId);
    const sql = await getSql();
    return sql.query<JournalRow>(
      `select id, title, body, source_section, source_chapter, created_at, updated_at
       from journal_entry
       where user_id = $1
       order by updated_at desc`,
      [userId],
    );
  });

export const upsertJournalEntry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => JournalInput.parse(data))
  .handler(async ({ context, data }) => {
    const { userId } = context as PlatformContext;
    await ensureProfile(userId);
    const sql = await getSql();
    const entryId = data.id ?? id();
    await sql.query(
      `insert into journal_entry(id, user_id, title, body, source_section, source_chapter, updated_at)
       values ($1, $2, $3, $4, $5, $6, now())
       on conflict (id) do update set
         title = excluded.title,
         body = excluded.body,
         source_section = excluded.source_section,
         source_chapter = excluded.source_chapter,
         updated_at = now()
       where journal_entry.user_id = $2`,
      [entryId, userId, data.title, data.body, data.sourceSection ?? null, data.sourceChapter ?? null],
    );
    return { id: entryId };
  });

export const deleteJournalEntry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ context, data }) => {
    const { userId } = context as PlatformContext;
    const sql = await getSql();
    await sql.query("delete from journal_entry where id = $1 and user_id = $2", [data.id, userId]);
    return { ok: true };
  });

export const listPagesArchive = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { userId } = context as PlatformContext;
    const sql = await getSql();
    return sql.query<PageRow>(
      `select id, response_key, section_slug, chapter_slug, prompt, response, completed, updated_at
       from user_response
       where user_id = $1
       order by updated_at desc`,
      [userId],
    );
  });

export const submitBookOwnerVerification = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => VerificationInput.parse(data))
  .handler(async ({ context, data }) => {
    const { userId } = context as PlatformContext;
    await ensureProfile(userId);
    const sql = await getSql();
    const verificationId = id();
    await sql.query(
      `insert into book_owner_verification(id, user_id, status, photo_ref, note)
       values ($1, $2, 'pending', $3, $4)`,
      [verificationId, userId, data.photoRef, data.note ?? null],
    );
    await sql.query(
      "update user_profile set access_status = 'pending_payment', updated_at = now() where user_id = $1",
      [userId],
    );
    return { id: verificationId, status: "pending" };
  });

export const createCheckout = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => z.object({ productId: z.string().default("order-digital-access") }).parse(data ?? {}))
  .handler(async ({ context, data }) => {
    const { userId } = context as PlatformContext;
    await ensureProfile(userId);
    const sql = await getSql();
    const [product] = await sql.query<{ id: string; price_cents: number; currency: string }>(
      "select id, price_cents, currency from product where id = $1 and active = true",
      [data.productId],
    );
    if (!product) throw new Error("Product is not configured");
    const purchaseId = id();
    const stripeSecret = env("STRIPE_SECRET_KEY");
    const stripePriceId = env("STRIPE_PRICE_ID");
    const appUrl = env("APP_URL") ?? "http://localhost:8080";
    let checkoutUrl: string | null = null;
    let providerTransactionId: string | null = null;

    if (stripeSecret && stripePriceId) {
      const body = new URLSearchParams();
      body.set("mode", "payment");
      body.set("line_items[0][price]", stripePriceId);
      body.set("line_items[0][quantity]", "1");
      body.set("success_url", `${appUrl}/purchase?status=returning`);
      body.set("cancel_url", `${appUrl}/purchase?status=cancelled`);
      body.set("client_reference_id", userId);
      body.set("metadata[purchase_id]", purchaseId);
      const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          authorization: `Bearer ${stripeSecret}`,
          "content-type": "application/x-www-form-urlencoded",
        },
        body,
      });
      if (!response.ok) {
        throw new Error("Stripe checkout creation failed");
      }
      const json = (await response.json()) as { id: string; url?: string };
      providerTransactionId = json.id;
      checkoutUrl = json.url ?? null;
    }

    await sql.query(
      `insert into purchase(
        id, user_id, product_id, amount_cents, currency, status, provider,
        provider_transaction_id, provider_checkout_url, metadata
      )
      values ($1, $2, $3, $4, $5, 'pending', 'stripe', $6, $7, $8::jsonb)`,
      [
        purchaseId,
        userId,
        product.id,
        product.price_cents,
        product.currency,
        providerTransactionId,
        checkoutUrl,
        JSON.stringify({ checkoutConfigured: Boolean(checkoutUrl) }),
      ],
    );
    await sql.query(
      "update user_profile set purchase_status = 'pending', access_status = 'pending_payment', updated_at = now() where user_id = $1",
      [userId],
    );
    return {
      purchaseId,
      checkoutUrl,
      configured: Boolean(checkoutUrl),
      message: checkoutUrl
        ? "Checkout created. Payment must still be confirmed by webhook before access is activated."
        : "Stripe is not configured. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID to create real checkout sessions.",
    };
  });

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { userId } = context as PlatformContext;
    await requireAdmin(userId);
    const sql = await getSql();
    const [analytics] = await sql.query<Record<string, number>>(
      `select
        (select count(*) from "user")::int as users,
        (select count(*) from entitlement where type = 'book_access' and status = 'active')::int as paid_users,
        (select count(*) from purchase)::int as purchases,
        (select count(*) from book_owner_verification where status = 'pending')::int as pending_verifications,
        (select count(*) from journal_entry)::int as journal_entries,
        (select count(*) from user_response)::int as responses`,
    );
    const users = await sql.query<AdminOverview["users"][number]>(
      `select u.id, u.email, u.name, p.role, p.access_status, p.purchase_status, u."createdAt" as created_at
       from "user" u
       left join user_profile p on p.user_id = u.id
       order by u."createdAt" desc
       limit 50`,
    );
    const verifications = await sql.query<AdminOverview["verifications"][number]>(
      `select v.id, v.user_id, u.email, v.status, v.photo_ref, v.note, v.rejection_reason, v.created_at
       from book_owner_verification v
       left join "user" u on u.id = v.user_id
       order by v.created_at desc
       limit 50`,
    );
    const purchases = await sql.query<AdminOverview["purchases"][number]>(
      `select p.id, p.user_id, u.email, p.amount_cents, p.currency, p.status, p.provider, p.provider_transaction_id, p.created_at
       from purchase p
       left join "user" u on u.id = p.user_id
       order by p.created_at desc
       limit 50`,
    );
    const content = await sql.query<Record<string, number>>(
      `select
        (select count(*) from section)::int as sections,
        (select count(*) from chapter)::int as chapters,
        (select count(*) from content_block)::int as content_blocks,
        (select count(*) from glossary_term)::int as glossary_terms,
        (select count(*) from download_resource)::int as downloads`,
    );
    return { analytics, users, verifications, purchases, content: content[0] } satisfies AdminOverview;
  });

export const reviewBookOwnerVerification = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) =>
    z
      .object({
        id: z.string(),
        status: z.enum(["approved", "rejected"]),
        rejectionReason: z.string().max(2_000).optional(),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    const { userId } = context as PlatformContext;
    await requireAdmin(userId);
    const sql = await getSql();
    const [verification] = await sql.query<{ user_id: string }>(
      "select user_id from book_owner_verification where id = $1",
      [data.id],
    );
    if (!verification) throw new Error("Verification not found");
    await sql.query(
      `update book_owner_verification
       set status = $2, rejection_reason = $3, reviewed_by = $4, reviewed_at = now(), updated_at = now()
       where id = $1`,
      [data.id, data.status, data.rejectionReason ?? null, userId],
    );
    if (data.status === "approved") {
      await sql.query(
        `insert into entitlement(id, user_id, type, status, source, metadata)
         values ($1, $2, 'discount', 'active', 'book_owner_verification', $3::jsonb)`,
        [id(), verification.user_id, JSON.stringify({ verificationId: data.id })],
      );
      await sql.query(
        "update user_profile set access_status = 'discount_eligible', updated_at = now() where user_id = $1",
        [verification.user_id],
      );
    }
    await sql.query(
      `insert into admin_action(id, admin_user_id, action, target_type, target_id, metadata)
       values ($1, $2, 'review_book_owner_verification', 'book_owner_verification', $3, $4::jsonb)`,
      [id(), userId, data.id, JSON.stringify({ status: data.status })],
    );
    return { ok: true };
  });

export const grantBookAccess = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => z.object({ userId: z.string(), reason: z.string().max(400).optional() }).parse(data))
  .handler(async ({ context, data }) => {
    const { userId: adminId } = context as PlatformContext;
    await requireAdmin(adminId);
    const sql = await getSql();
    await sql.query(
      `insert into entitlement(id, user_id, type, status, source, metadata)
       values ($1, $2, 'admin_grant', 'active', 'admin', $3::jsonb)`,
      [id(), data.userId, JSON.stringify({ reason: data.reason ?? "Manual grant" })],
    );
    await sql.query(
      "update user_profile set access_status = 'paid', purchase_status = 'paid', updated_at = now() where user_id = $1",
      [data.userId],
    );
    await sql.query(
      `insert into admin_action(id, admin_user_id, action, target_type, target_id, metadata)
       values ($1, $2, 'grant_book_access', 'user', $3, $4::jsonb)`,
      [id(), adminId, data.userId, JSON.stringify({ reason: data.reason ?? null })],
    );
    return { ok: true };
  });
