/* 
# Custom Checkout Fields Implementation

1. New Tables
  - `checkout_fields_1716585600000`
    - `id` (uuid, primary key)
    - `business_id` (uuid, references auth.users)
    - `label` (text, required)
    - `type` (text, e.g., 'text', 'textarea', 'number', 'select', 'radio', 'checkbox', 'date')
    - `required` (boolean, default false)
    - `placeholder` (text)
    - `default_value` (text)
    - `options` (jsonb, for select/radio/checkbox)
    - `is_active` (boolean, default true)
    - `sort_order` (integer, default 0)
    - `created_at` (timestamptz)

2. Security
  - Enable RLS on `checkout_fields_1716585600000`
  - Add policy for businesses to manage their own fields
*/

CREATE TABLE IF NOT EXISTS checkout_fields_1716585600000 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL DEFAULT auth.uid(),
  label text NOT NULL,
  type text NOT NULL CHECK (type IN ('text', 'textarea', 'number', 'select', 'radio', 'checkbox', 'date')),
  required boolean DEFAULT false,
  placeholder text DEFAULT '',
  default_value text DEFAULT '',
  options jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE checkout_fields_1716585600000 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can manage their own checkout fields"
  ON checkout_fields_1716585600000
  FOR ALL
  TO authenticated
  USING (auth.uid() = business_id)
  WITH CHECK (auth.uid() = business_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_checkout_fields_business_id ON checkout_fields_1716585600000(business_id);