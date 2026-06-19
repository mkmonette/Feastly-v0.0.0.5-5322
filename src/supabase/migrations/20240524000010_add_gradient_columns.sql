/* 
# Add Gradient Control Columns

1. New Columns for `notification_bars_1716585600007`:
  - `gradient_start` (text, default '#FF4F01')
  - `gradient_end` (text, default '#FF8A00')
  - `gradient_angle` (integer, default 90)

2. Purpose:
  - Provides granular control over gradient backgrounds in the Notification Bar.
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notification_bars_1716585600007' AND column_name = 'gradient_start') THEN
    ALTER TABLE notification_bars_1716585600007 
    ADD COLUMN gradient_start text DEFAULT '#FF4F01',
    ADD COLUMN gradient_end text DEFAULT '#FF8A00',
    ADD COLUMN gradient_angle integer DEFAULT 90;
  END IF;
END $$;