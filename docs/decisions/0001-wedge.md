# Decision 0001: Product wedge

## Status

Approved project direction. The 90-day scope freeze begins 2026-11-23 and ends
2027-02-21.

## Decision

| Decision | Value |
| --- | --- |
| Initial customers | Parents and homeschoolers first; teachers second; schools after launch |
| Grades | 6-8 |
| Subject and standards | Math using CCSS only |
| Product | Downloadable packs and online lessons |
| Application stack | Next.js 15.5.29, App Router, TypeScript, Supabase Postgres/RLS/private storage |
| Payments | Stripe only at Phase 4 |

Supabase RLS is the tenancy boundary. Private storage and authenticated
server-side operations must preserve that boundary. No hosting, storage,
payment, or product decision outside the table above is implied.

## Out of scope during the freeze

- AI tutor
- LTI or SCORM
- District SSO
- Marketplace
- Native apps
- Subjects other than math
- Grades outside 6-8
- Standards other than CCSS
- Stripe before Phase 4

COPPA obligations still apply to learners under 13.

## Consequence

Work that would expand this wedge requires a new decision record. This record
must be reconciled with the issue and approved stack before dependent schema or
content work is considered unblocked.
