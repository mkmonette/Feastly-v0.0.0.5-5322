/* 
# Notification Bar Settings Implementation

1. New Tables
  - `notification_bar_settings_1716585600006`
    - `id` (uuid, primary key)
    - `business_id` (uuid, references auth.users)
    - `is_enabled` (boolean, default false)
    - `message` (text, default '')
    - `background_color` (text, default '#FF4F01')
    - `text_color` (text, default '#FFFFFF')
    - `button_text` (text, default '')
    - `button_link` (text, default '')
    - `created_at` (timestamptz)

2. Security
  - Enable RLS on `notification_bar_settings_1716585600006`
  - Add policy for businesses to manage their own notification bar settings
*/

CREATE TABLE IF NOT EXISTS notification_bar_settings_1716585600006 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL DEFAULT auth.uid(),
  is_enabled boolean DEFAULT false,
  message text DEFAULT '',
  background_color text DEFAULT '#FF4F01',
  text_color text DEFAULT '#FFFFFF',
  button_text text DEFAULT '',
  button_link text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(business_id)
);

ALTER TABLE notification_bar_settings_1716585600006 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can manage their own notification bar settings"
  ON notification_bar_settings_1716585600006
  FOR ALL
  TO authenticated
  USING (auth.uid() = business_id)
  WITH CHECK (auth.uid() = business_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_notification_bar_settings_business_id ON notification_bar_settings_1716585600006(business_id);