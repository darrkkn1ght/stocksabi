import pg from 'pg';
const { Client } = pg;
import crypto from 'crypto';

const connectionString = 'postgresql://postgres.jruzlujboiasirfqtgyq:A12d3f4g5h6!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to DB.');
    
    // Ensure pgcrypto is available
    await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');

    const adminId = crypto.randomUUID();
    let actualUserId;
    
    // Check if user exists
    const existing = await client.query("SELECT id FROM auth.users WHERE email = 'admin@stocksabi.com'");
    
    if (existing.rows.length > 0) {
      actualUserId = existing.rows[0].id;
      
      // Update password just to be sure it's correct
      await client.query(`
        UPDATE auth.users 
        SET 
          encrypted_password = crypt('password123', gen_salt('bf')),
          confirmation_token = '',
          recovery_token = '',
          email_change_token_new = '',
          email_change = ''
        WHERE id = $1
      `, [actualUserId]);
      
      console.log('Admin user existed. Updated password and fixed tokens.');
    } else {
      actualUserId = adminId;
      
      await client.query(`
        INSERT INTO auth.users (
          instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
          last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
          confirmation_token, recovery_token, email_change_token_new, email_change
        )
        VALUES (
          '00000000-0000-0000-0000-000000000000', $1, 'authenticated', 'authenticated', 
          'admin@stocksabi.com', crypt('password123', gen_salt('bf')), now(), now(), 
          '{"provider":"email","providers":["email"]}', '{"full_name":"Stocksabi Admin"}', now(), now(),
          '', '', '', ''
        );
      `, [actualUserId]);
      console.log('Admin user seeded securely using pgcrypto.');
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
    
    console.log('Success! Account is fully active.');

  } catch (err) {
    console.error('Failed to seed admin:', err);
  } finally {
    await client.end();
  }
}

run();
