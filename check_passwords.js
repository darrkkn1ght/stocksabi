import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://postgres.jruzlujboiasirfqtgyq:A12d3f4g5h6!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    const res = await client.query("SELECT email, encrypted_password FROM auth.users LIMIT 5");
    console.log(res.rows);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
