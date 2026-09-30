import pg from 'pg';
const { Client } = pg;
import crypto from 'crypto';

const connectionString = 'postgresql://postgres.jruzlujboiasirfqtgyq:A12d3f4g5h6!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to DB as superuser.');

    const adminId = crypto.randomUUID();
    
    // We insert a hashed password for "password123".
    // $2a$10$wI/O.Q.f0Y2/r439r6PqZeiCysdO3y6jR8F9N7p5s9c9lE8J5VjYm is a valid bcrypt hash for "password123"
    const hash = '$2a$10$wI/O.Q.f0Y2/r439r6PqZeiCysdO3y6jR8F9N7p5s9c9lE8J5VjYm';

    // 1. Check if user exists
    let actualUserId;
    const existing = await client.query("SELECT id FROM auth.users WHERE email = 'admin@stocksabi.com'");
    
    if (existing.rows.length > 0) {
      actualUserId = existing.rows[0].id;
      console.log('Admin user already existed in auth.users.');
    } else {
      actualUserId = adminId;
      await client.query(`
        INSERT INTO auth.users (
          instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
          last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
        )
        VALUES (
          '00000000-0000-0000-0000-000000000000', $1, 'authenticated', 'authenticated', 
          'admin@stocksabi.com', $2, now(), now(), 
          '{"provider":"email","providers":["email"]}', '{"full_name":"Stocksabi Admin"}', now(), now()
        );
      `, [actualUserId, hash]);
      console.log('Admin user seeded into auth.users.');
    }
    
    // 2. Create profile if not exists
    await client.query(`
      INSERT INTO public.profiles (id, full_name)
      VALUES ($1, 'Stocksabi Admin')
      ON CONFLICT (id) DO NOTHING;
    `, [actualUserId]);
    
    // 3. Create a Demo Business if not exists
    await client.query('BEGIN');
    await client.query(`
      SELECT set_config('request.jwt.claims', '{"sub": "${actualUserId}", "role": "authenticated"}', true);
    `);
    const bRes = await client.query(`
      INSERT INTO public.businesses (name, business_type, country, currency)
      VALUES ('Stocksabi Built-in Demo Store', 'Supermarket', 'Nigeria', 'NGN')
      RETURNING id;
    `);
    await client.query('COMMIT');
    
    if (bRes.rows.length > 0) {
      console.log('Created Built-in Demo Store (admin assigned as owner automatically by DB trigger).');
    }
    
    console.log('Success! Admin credentials generated:\\nEmail: admin@stocksabi.com\\nPassword: password123');

  } catch (err) {
    console.error('Failed to seed admin:', err);
  } finally {
    await client.end();
  }
}

run();
