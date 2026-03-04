/* 
# Update Order and Payment Lifecycle Statuses

1. Changes
  - Updates `order_status` check constraint to: 'Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'
  - Updates `payment_status` check constraint to: 'Pending Payment', 'Proof Uploaded', 'Under Review', 'Paid', 'Rejected', 'Refunded'

2. Notes
  - This ensures a clean separation between fulfillment and financial verification.
*/

-- First, drop existing constraints if they exist (using a DO block for safety)
DO $$ 
BEGIN 
    ALTER TABLE orders_1716585600002 DROP CONSTRAINT IF EXISTS orders_1716585600002_order_status_check;
    ALTER TABLE orders_1716585600002 DROP CONSTRAINT IF EXISTS orders_1716585600002_payment_status_check;
END $$;

-- Add updated check constraints
ALTER TABLE orders_1716585600002 
ADD CONSTRAINT orders_1716585600002_order_status_check 
CHECK (order_status IN ('Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'));

ALTER TABLE orders_1716585600002 
ADD CONSTRAINT orders_1716585600002_payment_status_check 
CHECK (payment_status IN ('Pending Payment', 'Proof Uploaded', 'Under Review', 'Paid', 'Rejected', 'Refunded'));