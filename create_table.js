import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://postgres.jruzlujboiasirfqtgyq:A12d3f4g5h6!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

const client = new Client({
  connectionString,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to db');
    await client.query(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        email text UNIQUE NOT NULL,
        business_type text,
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
      );

      ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;

      CREATE POLICY "Allow public inserts" ON waitlist
        FOR INSERT
        TO public
        WITH CHECK (true);
    `);
    console.log('Table and policies created successfully.');
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

run();
