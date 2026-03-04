/* 
# Notification Bar Targeting, Behavior and Scheduling

1. Changes to `notification_bars_1716585600007`
  - Behavior:
    - `delay_seconds` (numeric)
    - `auto_hide_seconds` (numeric)
    - `show_close_button` (boolean)
    - `reappear_days` (numeric)
  - Targeting:
    - `audience` (text)
    - `pages` (text)
    - `custom_url_pattern` (text)
    - `device` (text)
    - `min_cart_value` (numeric)
    - `target_products` (uuid array)
    - `target_categories` (uuid array)
  - Scheduling:
    - `start_at` (timestamptz)
    - `end_at` (timestamptz)
    - `timezone` (text)

2. Purpose
  - Enables granular control over when and to whom the notification bar is shown.
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notification_bars_1716585600007' AND column_name = 'delay_seconds') THEN
    ALTER TABLE notification_bars_1716585600007 
    ADD COLUMN delay_seconds numeric DEFAULT 0,
    ADD COLUMN auto_hide_seconds numeric DEFAULT 0,
    ADD COLUMN show_close_button boolean DEFAULT true,
    ADD COLUMN reappear_days numeric DEFAULT 1,
    ADD COLUMN audience text DEFAULT 'all',
    ADD COLUMN pages text DEFAULT 'all',
    ADD COLUMN custom_url_pattern text DEFAULT '',
    ADD COLUMN device text DEFAULT 'both',
    ADD COLUMN min_cart_value numeric DEFAULT 0,
    ADD COLUMN target_products uuid[] DEFAULT '{}',
    ADD COLUMN target_categories uuid[] DEFAULT '{}',
    ADD COLUMN start_at timestamptz,
    ADD COLUMN end_at timestamptz,
    ADD COLUMN timezone text DEFAULT 'UTC';
  END IF;
END $$;