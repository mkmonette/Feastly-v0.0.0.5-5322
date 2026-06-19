/* 
# Order Settings Implementation

1. New Tables
  - `order_settings_1716585600004`
    - `id` (uuid, primary key)
    - `business_id` (uuid, references auth.users)
    - `prefix` (text, default 'ORD')
    - `suffix` (text, default '')
    - `number_padding` (integer, default 4)
    - `next_number` (integer, default 1)
    - `receipt_template` (text, default 'Default')
    - `created_at` (timestamptz)

2. Security
  - Enable RLS on `order_settings_1716585600004`
  - Add policy for businesses to manage their own order settings
*/

CREATE TABLE IF NOT EXISTS order_settings_1716585600004 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL DEFAULT auth.uid(),
  prefix text DEFAULT 'ORD',
  suffix text DEFAULT '',
  number_padding integer DEFAULT 4 CHECK (number_padding >= 1),
  next_number integer DEFAULT 1 CHECK (next_number >= 1),
  receipt_template text DEFAULT 'Default' CHECK (receipt_template IN ('Default', 'Modern (Compact)', 'Minimal', 'Modern (Card)', 'Invoice')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(business_id)
);

ALTER TABLE order_settings_1716585600004 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can manage their own order settings"
  ON order_settings_1716585600004
  FOR ALL
  TO authenticated
  USING (auth.uid() = business_id)
  WITH CHECK (auth.uid() = business_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_order_settings_business_id ON order_settings_1716585600004(business_id);