---
applyTo: "tests/**"
---
Use `tests/rls/harness.ts`. Each file owns its orgs and users and tears them
down in `afterAll`. Never truncate shared tables. Assert on rows returned.
