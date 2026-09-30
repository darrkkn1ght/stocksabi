import pg from 'pg';
const { Client } = pg;
const connectionString = 'postgresql://postgres.jruzlujboiasirfqtgyq:A12d3f4g5h6!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  const res = await client.query("SELECT polname, polcmd, polqual, polwithcheck FROM pg_policy WHERE polrelid = 'public.businesses'::regclass");
  console.log('Businesses Policies:', res.rows);
  const res2 = await client.query("SELECT polname, polcmd, polqual, polwithcheck FROM pg_policy WHERE polrelid = 'public.business_members'::regclass");
  console.log('Business Members Policies:', res2.rows);
  await client.end();
}
run();
