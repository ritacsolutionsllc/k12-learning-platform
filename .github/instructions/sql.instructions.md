---
applyTo: "supabase/migrations/**"
---
Use explicit enums and constraints that encode license rules, `security
definer` helpers with `set search_path = public`, deny-by-default policies,
explicit grants, and `revoke all ... from anon`. Every migration needs a rollback
note at the top. Once schema migrations land, follow the latest approved tenancy
migration as the style reference.
