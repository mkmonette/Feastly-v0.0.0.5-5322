/* 
# Orders and Payment Snapshots Implementation

1. New Tables
  - `orders_1716585600002`
    - `id` (uuid, primary key)
    - `business_id` (uuid, references auth.users)
    - `customer_id` (uuid, references auth.users)
    - `total_amount` (numeric)
    - `currency` (text, default 'PHP')
    - `order_status` (text, default 'pending')
    - `payment_status` (text, default 'unpaid')
    - `payment_method` (text) - 'manual', 'stripe', etc.
    
    -- Manual Payment Snapshot Fields
    - `manual_payment_name` (text) - snapshot of selectedMethodName
    - `manual_payment_account_name` (text) - snapshot of accountName
    - `manual_payment_account_number` (text) - snapshot of accountNumber
    - `manual_payment_details` (text) - snapshot of additionalDetails
    - `payment_proof_url` (text) - URL for the proof image uploaded by customer
    
    - `items` (jsonb) - snapshot of products ordered
    - `created_at` (timestamptz)

2. Security
  - Enable RLS on `orders_1716585600002`
  - Add policy for businesses to view/manage their orders
  - Add policy for customers to view their own orders
*/

CREATE TABLE IF NOT EXISTS orders_1716585600002 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL DEFAULT auth.uid(),
  customer_id uuid NOT NULL DEFAULT auth.uid(),
  total_amount numeric NOT NULL,
  currency text DEFAULT 'PHP',
  order_status text DEFAULT 'pending' CHECK (order_status IN ('pending', 'preparing', 'completed', 'cancelled')),
  payment_status text DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'Pending Verification', 'Rejected')),
  payment_method text,
  
  -- Manual Payment Snapshot
  manual_payment_name text,
  manual_payment_account_name text,
  manual_payment_account_number text,
  manual_payment_details text,
  payment_proof_url text,
  
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders_1716585600002 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can manage their own orders"
  ON orders_1716585600002
  FOR ALL
  TO authenticated
  USING (auth.uid() = business_id)
  WITH CHECK (auth.uid() = business_id);

CREATE POLICY "Customers can view their own orders"
  ON orders_1716585600002
  FOR SELECT
  TO authenticated
  USING (auth.uid() = customer_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_orders_business_id ON orders_1716585600002(business_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders_1716585600002(customer_id);