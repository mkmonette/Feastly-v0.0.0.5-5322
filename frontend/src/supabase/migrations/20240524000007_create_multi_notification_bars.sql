/* 
# Multi-Notification Bar System

1. New Tables
  - `notification_bars_1716585600007`
    - `id` (uuid, primary key)
    - `business_id` (uuid, references auth.users)
    - `name` (text, internal reference)
    - `is_enabled` (boolean, default false)
    - `priority` (integer, default 0)
    - `status` (text, default 'Draft')
    - `message` (text, default '')
    - `background_color` (text, default '#FF4F01')
    - `text_color` (text, default '#FFFFFF')
    - `button_text` (text, default '')
    - `button_link` (text, default '')
    - `created_at` (timestamptz)

2. Security
  - Enable RLS on `notification_bars_1716585600007`
  - Add policy for businesses to manage their own notification bars
*/

CREATE TABLE IF NOT EXISTS notification_bars_1716585600007 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL DEFAULT auth.uid(),
  name text NOT NULL DEFAULT 'New Notification Bar',
  is_enabled boolean DEFAULT false,
  priority integer DEFAULT 0,
  status text DEFAULT 'Draft' CHECK (status IN ('Draft', 'Scheduled', 'Active', 'Expired')),
  message text DEFAULT '',
  background_color text DEFAULT '#FF4F01',
  text_color text DEFAULT '#FFFFFF',
  button_text text DEFAULT '',
  button_link text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notification_bars_1716585600007 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can manage their own notification bars"
  ON notification_bars_1716585600007
  FOR ALL
  TO authenticated
  USING (auth.uid() = business_id)
  WITH CHECK (auth.uid() = business_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_notification_bars_business_id ON notification_bars_1716585600007(business_id);
CREATE INDEX IF NOT EXISTS idx_notification_bars_status ON notification_bars_1716585600007(status);