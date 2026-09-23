-- Production data model for The Order interactive digital book platform.

create table if not exists user_profile (
  user_id text primary key references "user"("id") on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  access_status text not null default 'none' check (access_status in ('none', 'pending_payment', 'paid', 'book_owner', 'discount_eligible', 'disabled')),
  purchase_status text not null default 'none' check (purchase_status in ('none', 'pending', 'paid', 'failed', 'refunded')),
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists app_setting (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists product (
  id text primary key,
  name text not null,
  description text not null default '',
  price_cents integer not null default 0 check (price_cents >= 0),
  currency text not null default 'usd',
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists purchase (
  id text primary key,
  user_id text not null references "user"("id") on delete cascade,
  product_id text references product(id) on delete set null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null,
  status text not null check (status in ('pending', 'paid', 'failed', 'cancelled', 'refunded')),
  provider text not null default 'stripe',
  provider_transaction_id text,
  provider_checkout_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists purchase_user_idx on purchase(user_id);
create unique index if not exists purchase_provider_txn_idx on purchase(provider, provider_transaction_id) where provider_transaction_id is not null;

create table if not exists entitlement (
  id text primary key,
  user_id text not null references "user"("id") on delete cascade,
  type text not null check (type in ('book_access', 'discount', 'admin_grant')),
  status text not null default 'active' check (status in ('active', 'revoked', 'expired')),
  source text not null default 'system',
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists entitlement_user_idx on entitlement(user_id, status, type);

create table if not exists book (
  id text primary key,
  title text not null,
  subtitle text,
  author text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists section (
  id text primary key,
  book_id text not null references book(id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null default '',
  section_type text not null default 'chapter',
  sort_order integer not null default 0,
  requires_access boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(book_id, slug)
);

create table if not exists chapter (
  id text primary key,
  section_id text not null references section(id) on delete cascade,
  slug text not null,
  title text not null,
  summary text not null default '',
  sort_order integer not null default 0,
  audio_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(section_id, slug)
);

create table if not exists content_block (
  id text primary key,
  chapter_id text references chapter(id) on delete cascade,
  section_id text references section(id) on delete cascade,
  block_type text not null check (block_type in ('heading', 'paragraph', 'quote', 'image', 'audio', 'video', 'question', 'text-input', 'textarea', 'checkbox', 'exercise', 'breathing-exercise', 'activation', 'glossary-term', 'download', 'divider')),
  title text,
  body text,
  prompt text,
  data jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (chapter_id is not null or section_id is not null)
);
create index if not exists content_block_chapter_idx on content_block(chapter_id, sort_order);
create index if not exists content_block_section_idx on content_block(section_id, sort_order);

create table if not exists user_response (
  id text primary key,
  user_id text not null references "user"("id") on delete cascade,
  content_block_id text references content_block(id) on delete cascade,
  response_key text not null,
  section_slug text,
  chapter_slug text,
  prompt text,
  response text not null default '',
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, response_key)
);
create index if not exists user_response_user_idx on user_response(user_id, updated_at desc);

create table if not exists journal_entry (
  id text primary key,
  user_id text not null references "user"("id") on delete cascade,
  title text not null,
  body text not null default '',
  source_section text,
  source_chapter text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists journal_entry_user_idx on journal_entry(user_id, updated_at desc);

create table if not exists progress (
  user_id text primary key references "user"("id") on delete cascade,
  section_slug text,
  chapter_slug text,
  content_id text,
  route text not null default '/dashboard',
  scroll_y integer not null default 0,
  completed_chapters text[] not null default '{}',
  completed_steps text[] not null default '{}',
  completed_assessment_items text[] not null default '{}',
  completed_prayers text[] not null default '{}',
  stillness_minutes integer not null default 0,
  light_completed boolean not null default false,
  last_activity_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists assessment_item (
  id text primary key,
  slug text not null unique,
  title text not null,
  prompt text not null default '',
  sort_order integer not null default 0,
  active boolean not null default true
);

create table if not exists assessment_response (
  id text primary key,
  user_id text not null references "user"("id") on delete cascade,
  item_id text references assessment_item(id) on delete cascade,
  response text not null default '',
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(user_id, item_id)
);

create table if not exists seven_step (
  id text primary key,
  number integer not null unique,
  title text not null,
  description text not null default '',
  teaching_content text not null default '',
  audio_url text,
  practice_prompt text not null default '',
  downloadable_resources jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  active boolean not null default true
);

create table if not exists seven_step_progress (
  user_id text not null references "user"("id") on delete cascade,
  step_id text not null references seven_step(id) on delete cascade,
  response text not null default '',
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, step_id)
);

create table if not exists prayer (
  id text primary key,
  slug text not null unique,
  title text not null,
  prayer_text text not null default '',
  decree_text text not null default '',
  audio_url text,
  sort_order integer not null default 0,
  active boolean not null default true
);

create table if not exists prayer_progress (
  user_id text not null references "user"("id") on delete cascade,
  prayer_id text not null references prayer(id) on delete cascade,
  spoken boolean not null default false,
  response text not null default '',
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, prayer_id)
);

create table if not exists glossary_term (
  id text primary key,
  term text not null unique,
  definition text not null default '',
  related_terms text[] not null default '{}',
  expanded text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists download_resource (
  id text primary key,
  title text not null,
  description text not null default '',
  file_path text not null,
  file_type text not null default 'application/octet-stream',
  file_size integer,
  permission text not null default 'book_access' check (permission in ('public', 'registered', 'book_access', 'admin')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists book_owner_verification (
  id text primary key,
  user_id text not null references "user"("id") on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  photo_ref text not null,
  note text,
  rejection_reason text,
  reviewed_by text references "user"("id") on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists verification_user_idx on book_owner_verification(user_id, created_at desc);
create index if not exists verification_status_idx on book_owner_verification(status, created_at desc);

create table if not exists admin_action (
  id text primary key,
  admin_user_id text references "user"("id") on delete set null,
  action text not null,
  target_type text,
  target_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

insert into product(id, name, description, price_cents, currency, active, metadata)
values ('order-digital-access', 'THE ORDER Digital Experience', 'Configurable access product for the interactive book platform.', 0, 'usd', true, '{"placeholder": true}'::jsonb)
on conflict (id) do nothing;

insert into app_setting(key, value)
values
  ('pricing', '{"currency":"usd","priceCents":0,"discountPercent":0,"stripePriceId":null}'::jsonb),
  ('access_rules', '{"requirePayment":true,"allowBookOwnerDiscount":true,"pdfDownloadRequiresEntitlement":true}'::jsonb),
  ('storage', '{"provider":"local","privateUploadRoot":"storage/private","maxUploadMb":10}'::jsonb)
on conflict (key) do nothing;

insert into book(id, title, subtitle, author, status)
values ('the-order', 'THE ORDER', 'Interactive digital book experience', 'Kirby de Lanerolle', 'draft')
on conflict (id) do nothing;

insert into section(id, book_id, slug, title, description, section_type, sort_order, requires_access)
values
  ('sec-how', 'the-order', 'how-to-use', 'How to Use', 'Beginner-friendly guide for navigating the experience.', 'guide', 0, false),
  ('sec-stillness', 'the-order', 'stillness', 'Stillness', 'Preparation, breathing, and audio-ready meditation flow.', 'stillness', 10, true),
  ('sec-chambers', 'the-order', 'chambers', 'Chambers', 'Data-driven chapter and exercise structure.', 'chambers', 20, true),
  ('sec-assessment', 'the-order', 'assessment', 'Assessment', 'Structured assessment placeholders from the product specification.', 'assessment', 30, true),
  ('sec-authority', 'the-order', 'authority', 'Authority', 'Reusable seven-step authority section.', 'authority', 40, true),
  ('sec-light', 'the-order', 'light', 'Walking in the Light', 'Post-steps continuation section placeholders.', 'light', 50, true),
  ('sec-prayers', 'the-order', 'prayers', 'Prayers and Decrees', 'Audible prayer and decree resources.', 'prayers', 60, true)
on conflict (book_id, slug) do nothing;

insert into chapter(id, section_id, slug, title, summary, sort_order)
values
  ('chap-demo-1', 'sec-chambers', 'demo-chapter-1', 'Demo Chapter 1', 'Placeholder chapter used to test the CMS and reading flow.', 10),
  ('chap-demo-2', 'sec-chambers', 'demo-chapter-2', 'Demo Chapter 2', 'Placeholder chapter used to test continuation and autosave.', 20)
on conflict (section_id, slug) do nothing;

insert into content_block(id, chapter_id, block_type, title, body, prompt, sort_order)
values
  ('block-demo-heading', 'chap-demo-1', 'heading', 'Demo Teaching Content', null, null, 10),
  ('block-demo-paragraph', 'chap-demo-1', 'paragraph', null, 'Demo placeholder text. Replace this in the admin CMS with approved book content.', null, 20),
  ('block-demo-question', 'chap-demo-1', 'textarea', 'Demo Exercise', null, 'Demo exercise prompt. Replace with approved source material.', 30)
on conflict (id) do nothing;

insert into assessment_item(id, slug, title, prompt, sort_order)
values
  ('assess-prayer-before', 'prayer-before-beginning', 'Prayer before beginning', 'Demo placeholder prompt. Replace with approved assessment text.', 10),
  ('assess-name-occupies', 'name-what-occupies', 'Name what occupies', 'Demo placeholder prompt. Replace with approved assessment text.', 20),
  ('assess-doorway', 'doorway', 'Doorway', 'Demo placeholder prompt. Replace with approved assessment text.', 30),
  ('assess-how-in', 'how-did-it-get-in', 'How did it get in', 'Demo placeholder prompt. Replace with approved assessment text.', 40),
  ('assess-occupants', 'occupants', 'Occupants', 'Demo placeholder prompt. Replace with approved assessment text.', 50),
  ('assess-legal-story', 'legal-story', 'Legal story', 'Demo placeholder prompt. Replace with approved assessment text.', 60),
  ('assess-bloodline', 'bloodline', 'Bloodline', 'Demo placeholder prompt. Replace with approved assessment text.', 70),
  ('assess-speech', 'speech', 'Speech', 'Demo placeholder prompt. Replace with approved assessment text.', 80)
on conflict (slug) do nothing;

insert into seven_step(id, number, title, description, teaching_content, practice_prompt, sort_order)
values
  ('step-1', 1, 'Demo Step 1', 'Placeholder seven-step record.', 'Demo teaching content. Replace in admin CMS.', 'Demo practice prompt.', 10),
  ('step-2', 2, 'Demo Step 2', 'Placeholder seven-step record.', 'Demo teaching content. Replace in admin CMS.', 'Demo practice prompt.', 20),
  ('step-3', 3, 'Demo Step 3', 'Placeholder seven-step record.', 'Demo teaching content. Replace in admin CMS.', 'Demo practice prompt.', 30),
  ('step-4', 4, 'Demo Step 4', 'Placeholder seven-step record.', 'Demo teaching content. Replace in admin CMS.', 'Demo practice prompt.', 40),
  ('step-5', 5, 'Demo Step 5', 'Placeholder seven-step record.', 'Demo teaching content. Replace in admin CMS.', 'Demo practice prompt.', 50),
  ('step-6', 6, 'Demo Step 6', 'Placeholder seven-step record.', 'Demo teaching content. Replace in admin CMS.', 'Demo practice prompt.', 60),
  ('step-7', 7, 'Demo Step 7', 'Placeholder seven-step record.', 'Demo teaching content. Replace in admin CMS.', 'Demo practice prompt.', 70)
on conflict (number) do nothing;

insert into prayer(id, slug, title, prayer_text, decree_text, sort_order)
values ('prayer-demo', 'demo-prayer', 'Demo Prayer', 'Demo prayer placeholder. Replace with approved text.', 'Demo decree placeholder. Replace with approved text.', 10)
on conflict (slug) do nothing;

insert into glossary_term(id, term, definition, related_terms, expanded)
values ('gloss-demo-jurisdiction', 'jurisdiction', 'Demo glossary definition. Replace with approved definition.', '{"authority"}', 'Demo expanded explanation placeholder.')
on conflict (term) do nothing;

insert into download_resource(id, title, description, file_path, file_type, file_size, permission)
values
  ('download-book-pdf', 'Book PDF', 'Protected PDF download for entitled users.', 'public/order.pdf', 'application/pdf', null, 'book_access'),
  ('download-seven-steps-demo', 'Demo Seven Steps Resource', 'Placeholder downloadable resource entry.', 'storage/private/demo-seven-steps.pdf', 'application/pdf', null, 'book_access')
on conflict (id) do nothing;
