/* 
# Customizable Payment Methods Implementation

1. New Tables
  - `payment_methods_1716585600001`
    - `id` (uuid, primary key)
    - `business_id` (uuid, references auth.users)
    - `name` (text, required) - e.g., "GCash Personal"
    - `account_name` (text)
    - `account_number` (text)
    - `details` (text) - Additional instructions
    - `qr_image_url` (text) - URL for the QR code image
    - `is_active` (boolean, default true)
    - `created_at` (timestamptz)

2. Security
  - Enable RLS on `payment_methods_1716585600001`
  - Add policy for businesses to manage their own payment methods
*/

CREATE TABLE IF NOT EXISTS payment_methods_1716585600001 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL DEFAULT auth.uid(),
  name text NOT NULL,
  account_name text,
  account_number text,
  details text,
  qr_image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payment_methods_1716585600001 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can manage their own payment methods"
  ON payment_methods_1716585600001
  FOR ALL
  TO authenticated
  USING (auth.uid() = business_id)
  WITH CHECK (auth.uid() = business_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_payment_methods_business_id ON payment_methods_1716585600001(business_id);