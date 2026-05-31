/* 
# Add Trigger Frequency Column

1. New Column for `notification_bars_1716585600007`:
  - `show_frequency` (text, default 'multiple') - options: 'once', 'multiple'

2. Purpose:
  - Allows businesses to control if a bar should only be shown once per user session/lifetime or repeatedly.
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notification_bars_1716585600007' AND column_name = 'show_frequency') THEN
    ALTER TABLE notification_bars_1716585600007 
    ADD COLUMN show_frequency text DEFAULT 'multiple';
  END IF;
END $$;