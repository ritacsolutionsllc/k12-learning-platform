# k12-learning-platform
K-12 Learning Platform

## Venice API smoke test

The server-side Node.js client uses `VENICE_API_KEY`; it must never be exposed
to browser code. Use Node.js 20.6 or later. Create an untracked `.env` file in
the repository root containing your actual key as `VENICE_API_KEY`. Do not
commit or share it. Then run from the repository root:

```powershell
node --env-file=.env scripts\venice-chat.mjs
```

The script selects the first non-deprecated text model from Venice's live model
list and sends a short chat completion. This request may consume paid credits;
see [Venice pricing](https://docs.venice.ai/pricing). Model availability and
pricing can change. Run the local, mocked checks with:

```powershell
node --test tests\venice.test.mjs
```
