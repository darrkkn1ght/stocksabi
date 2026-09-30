import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://postgres.jruzlujboiasirfqtgyq:A12d3f4g5h6!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to DB.');
    
    // Fix NULL values that crash GoTrue
    await client.query(`
      UPDATE auth.users
      SET 
        confirmation_token = COALESCE(confirmation_token, ''),
        recovery_token = COALESCE(recovery_token, ''),
        email_change_token_new = COALESCE(email_change_token_new, ''),
        email_change = COALESCE(email_change, '')
      WHERE email = 'admin@stocksabi.com';
    `);
    
    console.log('Fixed auth.users null fields for admin@stocksabi.com');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
