-- Run this in the Supabase SQL editor

-- Promo codes table
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code        text UNIQUE NOT NULL,
  type        text NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value       numeric NOT NULL CHECK (value > 0),
  currency    text NOT NULL DEFAULT 'USD',
  description text,
  valid_until timestamptz,
  active      boolean NOT NULL DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- One use per customer email per code
CREATE TABLE IF NOT EXISTS public.promo_uses (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code_id  uuid NOT NULL REFERENCES public.promo_codes(id) ON DELETE CASCADE,
  customer_email text NOT NULL,
  order_id       uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  used_at        timestamptz DEFAULT now(),
  UNIQUE (promo_code_id, customer_email)
);

-- Add discount columns to existing orders table
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS promo_code_id   uuid REFERENCES public.promo_codes(id),
  ADD COLUMN IF NOT EXISTS discount_amount numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS discount_type   text;

-- RLS: admin users can manage promo codes; anyone can read active ones via the API
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_uses  ENABLE ROW LEVEL SECURITY;

-- Service-role key (used in server API routes) bypasses RLS automatically.
-- For the admin panel (anon key + admin JWT), add your own policies here as needed.
