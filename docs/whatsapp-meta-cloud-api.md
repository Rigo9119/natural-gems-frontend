# WhatsApp Meta Cloud API — Setup Guide

## Step 1 — Create a Meta Developer App

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. **Create App** → type: **Business**
3. Add the **WhatsApp** product to it
4. Connect or create a **WhatsApp Business Account (WABA)**

> You get a free test number immediately — good enough for local dev.

---

## Step 2 — Get your credentials

In your app dashboard → **WhatsApp → API Setup**:

- Copy the **Phone Number ID**
- Generate a **temporary access token** (24h, fine for testing)

For production, create a **permanent token**:
- Meta Business Manager → **Business Settings → System Users**
- Create system user (Admin role) → Generate token → select your app → grant `whatsapp_business_messaging` permission

Add to `.env.local` (and Netlify env vars):
```
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_token
WHATSAPP_VERIFY_TOKEN=your_random_secret
VITE_WHATSAPP_NUMBER=573001234567
```

---

## Step 3 — Register your webhook

In **WhatsApp → Configuration → Webhook**:
- URL: `https://your-domain.com/api/whatsapp/webhook`
- Verify token: same value as `WHATSAPP_VERIFY_TOKEN` in your `.env.local`
- Subscribe to: **`messages`**

> The GET handler in `src/routes/api.whatsapp.webhook.ts` is already built — it verifies automatically.

For local testing use **ngrok** first:
```bash
ngrok http 3000
# use the https:// URL as your webhook in Meta dashboard
```

---

## Step 4 — Send a reply from the webhook

In `src/routes/api.whatsapp.webhook.ts`, after calling `updateOrderStatus`, add the outbound reply:

```ts
await fetch(
  `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: message.from, // customer's number from the webhook payload
      type: "text",
      text: {
        body: `¡Hola! Recibimos tu pedido *#${orderNumber}* y ya está en proceso. Te contactamos pronto. 🌿`,
      },
    }),
  }
)
```

### Send message payload reference

```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "573001234567",
  "type": "text",
  "text": {
    "preview_url": false,
    "body": "Your message here (max 4096 chars)"
  }
}
```

- `to` must be E.164 format — digits only, no `+` or spaces
- `preview_url: true` auto-expands links in the message

---

## Gotchas

| | |
|---|---|
| **Business verification** | Required for production — takes 2–10 days, needs tax/legal docs |
| **Without verification** | Limited to 250 conversations/day (fine for early testing) |
| **Phone format** | E.164 digits only — `573001234567`, no `+` or spaces |
| **HTTPS required** | Webhook must be HTTPS — use ngrok for local dev |
| **Test token expires** | In 24h — use system user token for anything persistent |
| **Rate limit** | Cloud API handles up to 500 messages/second |

---

## Order of attack

1. Create Meta app + get test credentials → add to `.env.local`
2. Run `ngrok http 3000` → register webhook URL in Meta dashboard
3. Send yourself a WhatsApp message containing an order number (e.g. `NG-20260303-1234`) → confirm status updates in Supabase
4. Add the outbound reply call to the webhook handler
5. When ready to go live → verify business in Meta Business Manager + swap in permanent system user token + use real Netlify domain
