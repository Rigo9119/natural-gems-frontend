# Admin Auth Plan — Magic Link via Supabase Auth

## Context

Admin routes (`/admin/*`) are currently public. We protect them using Supabase Auth with magic links (passwordless). Sessions persist via Supabase's built-in token refresh.

Access control is managed entirely in the Supabase dashboard — no allowlist in code. New user signups are disabled, so only manually invited users can sign in.

---

## Supabase Dashboard Setup (do before coding)

1. **Authentication → Settings → disable "Enable new user signups"**
2. **Authentication → Users → Invite user** — add each admin email
3. **Authentication → URL Configuration → Redirect URLs**
   - Dev: `http://localhost:3000/auth/callback`
   - Prod: `https://yourdomain.com/auth/callback`

---

## Auth Flow

```
User visits /admin/*
  → beforeLoad: getSession()
  → No session → redirect /login?redirect=/admin

Login page
  → Enter email → signInWithOtp()
  → "Revisa tu correo — te enviamos un enlace de acceso"
  → Click link in email → /auth/callback?code=xxx

Callback page
  → exchangeCodeForSession(code)
  → Session established → redirect /admin

Admin panel
  → Session active, auto-refreshed by Supabase SDK
  → Sign out → signOut() → redirect /login
```

---

## Files

| Action | File | Notes |
|--------|------|-------|
| Create | `src/routes/login.tsx` | Standalone page, no Header/Footer |
| Create | `src/routes/auth/callback.tsx` | Processes magic link code |
| Edit | `src/routes/admin.tsx` | Add `beforeLoad` guard + sign-out button |
| Edit | `src/routes/__root.tsx` | Exclude `/login` and `/auth` from main layout |

---

## Verification Checklist

- [ ] Visiting `/admin` unauthenticated redirects to `/login`
- [ ] Login page sends magic link to invited email
- [ ] Non-invited email is rejected by Supabase
- [ ] Clicking link establishes session and lands on `/admin`
- [ ] Session persists after page refresh
- [ ] Sign-out clears session and redirects to `/login`
- [ ] `/login` and `/auth/callback` render without Header/Footer
