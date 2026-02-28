# Backend & Getting People to Use MainQuest

This doc outlines how to add a real backend and start getting users.

---

## Current state

- **No backend:** Feed, quests, and profile data are hardcoded or mock.
- **Add screen:** "Post sidequest" does not persist anywhere.
- **No auth:** Everyone sees the same data; no sign up / sign in.

---

## Phase 1: Backend (so data is real)

### 1.1 Choose a backend

| Option | Pros | Cons |
|--------|------|------|
| **Supabase** | Auth + Postgres + Realtime + Storage, generous free tier, good Expo docs | You manage RLS and migrations |
| **Firebase** | Auth + Firestore + Realtime, very mature | No SQL; pricing can spike with reads |
| **Custom API + DB** | Full control (e.g. Node + Postgres on Railway/Render) | More work for auth, hosting, and API design |

**Recommendation:** Start with **Supabase** (auth + database in one place; README already mentions it).

### 1.2 What to build first

1. **Auth** — Sign up / sign in (email or OAuth). Required so "people" are real users.
2. **Quests table** — Store sidequests: title, tags, when, spots, created_by (user id).
3. **API / client** — App calls Supabase to:
   - Create a quest (from Add screen).
   - List quests for feed and quest map (replace mock data).
4. **Optional:** Profiles table (display name, username, avatar) and RLS so users only edit their own data.

### 1.3 Supabase setup (high level)

1. Create a project at [supabase.com](https://supabase.com).
2. In **Authentication → Providers**, enable Email (and optionally Google/Apple for app).
3. In **SQL Editor**, run a migration for tables, e.g.:

```sql
-- Example: quests table
create table public.quests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  created_by uuid references auth.users(id) on delete cascade,
  title text not null,
  tag_ids text[] default '{}',
  spots int not null default 2,
  when_at timestamptz,
  location_name text
);

-- RLS: anyone can read; only signed-in users can insert their own
alter table public.quests enable row level security;
create policy "Anyone can read quests" on public.quests for select using (true);
create policy "Users can insert own quest" on public.quests for insert with check (auth.uid() = created_by);
```

4. In the app: set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` (e.g. in `.env`) and use the Supabase client to create/fetch quests.

---

## Phase 2: Getting people to use the app

### 2.1 Auth flow in the app

- **First launch:** If not signed in, show a welcome/sign-up screen (or redirect to a login tab).
- **After sign up / login:** Go to the main tab (feed). Profile can show the logged-in user.
- **Add screen:** Require auth; set `created_by` to `auth.uid()` when posting a quest.

### 2.2 Distribution

- **Internal / friends:** Use **Expo Go** (scan QR) or **EAS Build** and share an internal build link.
- **TestFlight (iOS):** Use EAS Submit to upload a build to TestFlight; invite testers by email.
- **Play Store (Android):** Use EAS Build to produce an AAB and upload to Internal testing track.

### 2.3 Growth levers (later)

- **Invite flow:** "Invite friends" from profile or after completing a quest.
- **Campus / org:** Optional .edu or org verification to keep the community focused.
- **Notifications:** Push when someone joins your quest or when a quest matches your interests (requires FCM/APNs and backend).

---

## Next steps (in code)

1. **Add Supabase client and env** — `.env.example` + `lib/supabase.ts` so the app can talk to your project.
2. **Wire Add screen** — "Post sidequest" creates a row in `quests` (with auth.uid() when you add auth).
3. **Add auth screens** — Sign up / sign in, then protect the app so only logged-in users can post.
4. **Feed from backend** — Replace hardcoded feed with a query to `quests` (and later join with profiles).

Once auth and quest creation work, you have a minimal “real” product to put in front of people (e.g. via TestFlight or Expo Go).
