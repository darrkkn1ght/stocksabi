CREATE TABLE IF NOT EXISTS waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  business_type text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists to make this script idempotent
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;

CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- No read/update/delete policies means they are denied by default under RLS.
