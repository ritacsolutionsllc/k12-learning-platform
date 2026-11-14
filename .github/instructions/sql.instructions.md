---
applyTo: "supabase/migrations/**"
---
Match the style of `20261114000300_identity_and_tenancy.sql`: enums, constraints
that encode license rules, `security definer` helpers with
`set search_path = public`, deny-by-default policies, explicit grants, and a
`revoke all ... from anon`. Every migration needs a rollback note at the top.
