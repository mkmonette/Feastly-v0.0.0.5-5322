/* 
# Create Notifications Table
1. New Tables
  - `notifications_20240524`
    - `id` (uuid, primary key)
    - `business_id` (uuid, foreign key to business)
    - `type` (text: 'Order', 'Marketing', 'Loyalty', 'System')
    - `priority` (text: 'Info', 'Warning', 'Critical')
    - `title` (text)
    - `message` (text)
    - `related_id` (text, optional: order_id, coupon_id, etc.)
    - `is_read` (boolean, default false)
    - `created_at` (timestamp with time zone)
2. Security
  - Enable RLS on `notifications_20240524` table
  - Add policy for authenticated users to read notifications for their business
*/

CREATE TABLE IF NOT EXISTS notifications_20240524 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid DEFAULT auth.uid(), -- Assuming business_id maps to user for now
  type text NOT NULL CHECK (type IN ('Order', 'Marketing', 'Loyalty', 'System', 'Finance')),
  priority text DEFAULT 'Info' CHECK (priority IN ('Info', 'Warning', 'Critical')),
  title text NOT NULL,
  message text NOT NULL,
  related_id text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications_20240524 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own business notifications" 
  ON notifications_20240524 
  FOR ALL 
  TO authenticated 
  USING (auth.uid() = business_id);