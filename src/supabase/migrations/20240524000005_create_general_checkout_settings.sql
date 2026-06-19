/* 
# General Checkout Settings Implementation

1. New Tables
  - `checkout_general_settings_1716585600005`
    - `id` (uuid, primary key)
    - `business_id` (uuid, references auth.users)
    - `guest_checkout` (boolean, default true)
    - `enable_tipping` (boolean, default false)
    - `min_order_value` (numeric, default 0)
    - `min_order_fee` (numeric, default 0)
    - `created_at` (timestamptz)

2. Security
  - Enable RLS on `checkout_general_settings_1716585600005`
  - Add policy for businesses to manage their own checkout settings
*/

CREATE TABLE IF NOT EXISTS checkout_general_settings_1716585600005 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL DEFAULT auth.uid(),
  guest_checkout boolean DEFAULT true,
  enable_tipping boolean DEFAULT false,
  min_order_value numeric DEFAULT 0 CHECK (min_order_value >= 0),
  min_order_fee numeric DEFAULT 0 CHECK (min_order_fee >= 0),
  created_at timestamptz DEFAULT now(),
  UNIQUE(business_id)
);

ALTER TABLE checkout_general_settings_1716585600005 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can manage their own general checkout settings"
  ON checkout_general_settings_1716585600005
  FOR ALL
  TO authenticated
  USING (auth.uid() = business_id)
  WITH CHECK (auth.uid() = business_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_checkout_general_settings_business_id ON checkout_general_settings_1716585600005(business_id);