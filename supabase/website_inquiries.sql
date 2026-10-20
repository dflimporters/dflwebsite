-- DFL website enquiries (contact + careers forms).
-- NOT YET APPLIED. Review, then run in the Supabase SQL editor (or apply as a migration).
-- Security model: the public anon key can INSERT only. Nobody can SELECT/UPDATE/DELETE through it.

create table if not exists public.website_inquiries (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  type             text not null check (type in ('contact','careers')),
  first_name       text check (char_length(first_name) <= 80),
  last_name        text check (char_length(last_name)  <= 80),
  company          text check (char_length(company)    <= 160),
  website          text check (char_length(website)    <= 200),
  email            text not null check (char_length(email) <= 200 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone            text check (char_length(phone)      <= 40),
  parish           text check (char_length(parish)     <= 40),
  industry         text check (char_length(industry)   <= 60),
  product_interest text[] check (coalesce(array_length(product_interest,1),0) <= 10),
  message          text check (char_length(message)    <= 4000),
  source_page      text check (char_length(source_page) <= 200)
);

alter table public.website_inquiries enable row level security;

drop policy if exists "anon can insert enquiries" on public.website_inquiries;
create policy "anon can insert enquiries"
  on public.website_inquiries for insert
  to anon
  with check (true);

-- No select/update/delete policy for anon = denied. Be explicit about table privileges too:
revoke all on public.website_inquiries from anon, authenticated;
grant insert on public.website_inquiries to anon;
