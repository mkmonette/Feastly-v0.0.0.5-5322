/* 
# Notification Bar Advanced Styling & Content

1. Changes to `notification_bars_1716585600007`
  - Add `background_type` (solid, gradient, image)
  - Add `background_image` (text)
  - Add `background_gradient` (text)
  - Add `overlay_color` (text)
  - Add `overlay_opacity` (numeric)
  - Add `text_align` (text)
  - Add `height` (numeric)
  - Add `padding` (numeric)
  - Add `border_radius` (numeric)
  - Add `shadow` (text)
  - Add `animation` (text)
  - Add `position` (text)
  - Add `is_sticky` (boolean)
  - Add `has_countdown` (boolean)
  - Add `countdown_end` (timestamptz)
  - Add `btn_bg_color` (text)
  - Add `btn_text_color` (text)

2. Purpose
  - Allows full visual customization of the announcement bar
  - Supports dynamic content like countdown timers
*/

DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notification_bars_1716585600007' AND column_name = 'background_type') THEN
    ALTER TABLE notification_bars_1716585600007 
    ADD COLUMN background_type text DEFAULT 'solid',
    ADD COLUMN background_image text DEFAULT '',
    ADD COLUMN background_gradient text DEFAULT 'linear-gradient(90deg, #FF4F01 0%, #FF8A00 100%)',
    ADD COLUMN overlay_color text DEFAULT '#000000',
    ADD COLUMN overlay_opacity numeric DEFAULT 0.2,
    ADD COLUMN text_align text DEFAULT 'center',
    ADD COLUMN height numeric DEFAULT 50,
    ADD COLUMN padding numeric DEFAULT 12,
    ADD COLUMN border_radius numeric DEFAULT 0,
    ADD COLUMN shadow text DEFAULT 'none',
    ADD COLUMN animation text DEFAULT 'slide-down',
    ADD COLUMN position text DEFAULT 'top',
    ADD COLUMN is_sticky boolean DEFAULT true,
    ADD COLUMN has_countdown boolean DEFAULT false,
    ADD COLUMN countdown_end timestamptz,
    ADD COLUMN btn_bg_color text DEFAULT '#FFFFFF',
    ADD COLUMN btn_text_color text DEFAULT '#FF4F01';
  END IF;
END $$;