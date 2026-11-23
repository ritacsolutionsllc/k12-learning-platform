# Project: K-12 math platform, grades 6-8

Read `docs/decisions/0001-wedge.md` before any task. Scope is frozen for 90 days.

## Stack
Next.js 15 App Router, TypeScript strict, Supabase (Postgres + RLS + storage),
Tailwind, shadcn/ui, Vitest, Playwright. Stripe at Phase 4.

## Non-negotiable invariants

1. **RLS is the only tenancy boundary.** Every new table gets `enable row level
   security`, `force row level security`, and explicit policies in the same
   migration. No table ships without policies.
2. **Service role key is server-only.** Never `NEXT_PUBLIC_` it. The browser
   only ever holds the anon key.
3. **Never `select('*')` in app code.** Name columns. Learner PII is
   `display_name`, `grade_level`, `birth_year` and nothing else.
4. **Policies that read `memberships` must call `is_org_member`,
   `has_org_role`, or `is_org_owner`.** They are `security definer` to avoid
   recursion. Do not inline a subquery on `memberships` in a policy.
5. **Migrations are additive.** Never edit a migration that has run. New file,
   new timestamp, `supabase/migrations/YYYYMMDDHHMMSS_name.sql`.
6. **Learners are not auth users.** `learners` rows carry an optional
   `user_id`. Do not create `auth.users` for a child.
7. **`audit_log` is append-only.** Select grant only. No update, no delete.
8. **`assets.status` defaults to `unverified`.** Only a human clears an asset.
   Never set `cleared` in a script.
9. **Content license is CC BY 4.0 first edition only.** Anything matching
   `v360`, `v.360`, `accessim` is CC BY-NC and must not enter the CC BY lane.
10. **No `any`.** No `@ts-ignore` without a comment saying why.

## Do not build yet
AI tutor, LTI, SCORM, district SSO, marketplace, native apps, Stripe (until
Phase 4), any subject outside math 6-8, any grade outside 6-8.

## Working agreement
- One GitHub issue per branch, branch `p0.x/slug`, conventional commits.
- Before claiming a migration works, once the Supabase schema and RLS harness
  exist: `supabase db reset` then `npm run test:rls`.
- If a task needs a schema change, propose the migration first and stop.
- State assumptions in the PR description. Don't guess at the wedge.

## Testing
RLS failures return empty arrays on reads, not errors. Isolation tests assert
on returned rows. A test that only checks `error` is a false pass.
