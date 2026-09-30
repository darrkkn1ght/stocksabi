import pg from 'pg';
const { Client } = pg;
import crypto from 'crypto';

const connectionString = 'postgresql://postgres.jruzlujboiasirfqtgyq:A12d3f4g5h6!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to DB as superuser.');

    const user1Id = crypto.randomUUID();
    const user2Id = crypto.randomUUID();

    await client.query(`
      INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
      VALUES 
      ('00000000-0000-0000-0000-000000000000', $1, 'authenticated', 'authenticated', 'rls1_' || extract(epoch from now()) || '@example.com', 'dummy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"RLS User 1"}', now(), now(), '', '', '', ''),
      ('00000000-0000-0000-0000-000000000000', $2, 'authenticated', 'authenticated', 'rls2_' || extract(epoch from now()) || '@example.com', 'dummy', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"RLS User 2"}', now(), now(), '', '', '', '')
    `, [user1Id, user2Id]);

    console.log('Inserted fake users into auth.users.');

    const runAsUser = async (userId, query, params = []) => {
      await client.query('BEGIN');
      await client.query(`
        SET LOCAL ROLE authenticated;
        SELECT set_config('request.jwt.claims', '{"sub": "${userId}", "role": "authenticated"}', true);
      `);
      const result = await client.query(query, params);
      await client.query('ROLLBACK');
      return result;
    };

    const runAsUserPersist = async (userId, query, params = []) => {
      await client.query('BEGIN');
      await client.query(`
        SET LOCAL ROLE authenticated;
        SELECT set_config('request.jwt.claims', '{"sub": "${userId}", "role": "authenticated"}', true);
      `);
      const result = await client.query(query, params);
      await client.query('COMMIT'); 
      return result;
    };

    console.log('\\nUser 1 is creating a business...');
    await runAsUserPersist(user1Id, `
      INSERT INTO public.businesses (name, business_type, country, currency)
      VALUES ('User 1 Store', 'Other', 'Nigeria', 'NGN');
    `);
    
    // Now fetch it to get the ID
    const b1Fetch = await runAsUser(user1Id, 'SELECT * FROM public.businesses');
    console.log('User 1 sees businesses:', b1Fetch.rows.map(r => r.name));
    const business1Id = b1Fetch.rows[0].id;
    console.log('Business 1 created by User 1:', business1Id);

    const b2FetchEmpty = await runAsUser(user2Id, 'SELECT * FROM public.businesses');
    console.log('User 2 sees businesses (expected 0):', b2FetchEmpty.rows.length);

    console.log('\\nUser 2 attempting to update User 1 store...');
    const b2Update = await runAsUserPersist(user2Id, `
      UPDATE public.businesses SET name = 'Hacked Store' WHERE id = $1 RETURNING id;
    `, [business1Id]);
    console.log('Rows updated by User 2 (expected 0):', b2Update.rowCount);

    const superuserFetch = await client.query('SELECT name FROM public.businesses WHERE id = $1', [business1Id]);
    console.log('Actual name of Business 1:', superuserFetch.rows[0].name);

    console.log('\\nUser 2 attempting to add themselves to Business 1...');
    let memberInsertError = null;
    try {
      await runAsUserPersist(user2Id, `
        INSERT INTO public.business_members (business_id, user_id, role)
        VALUES ($1, $2, 'owner');
      `, [business1Id, user2Id]);
    } catch (err) {
      memberInsertError = err.message;
    }
    console.log('User 2 Insert member error:', memberInsertError);

    await client.query('DELETE FROM auth.users WHERE id IN ($1, $2)', [user1Id, user2Id]);
    console.log('\\nCleaned up fake users.');

  } catch (err) {
    console.error('Test Failed:', err);
  } finally {
    await client.end();
  }
}

run();
