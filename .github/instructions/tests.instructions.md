---
applyTo: "tests/**"
---
The RLS harness must be introduced with the first RLS test infrastructure. Once
`tests/rls/harness.ts` exists, each test file owns its orgs and users and tears
them down in `afterAll`. Never truncate shared tables. Assert on rows returned.
