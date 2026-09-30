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
      -- Profiles
      CREATE TABLE IF NOT EXISTS public.profiles (
        id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
        full_name text,
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
      );

      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
      CREATE POLICY "Users can view own profile" ON public.profiles
        FOR SELECT USING (auth.uid() = id);

      DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
      CREATE POLICY "Users can update own profile" ON public.profiles
        FOR UPDATE USING (auth.uid() = id);

      -- Businesses
      CREATE TABLE IF NOT EXISTS public.businesses (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name text NOT NULL,
        business_type text NOT NULL,
        country text NOT NULL,
        currency text NOT NULL,
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
        updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
      );

      ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

      -- Business Members
      CREATE TABLE IF NOT EXISTS public.business_members (
        business_id uuid REFERENCES public.businesses ON DELETE CASCADE,
        user_id uuid REFERENCES auth.users ON DELETE CASCADE,
        role text NOT NULL CHECK (role IN ('owner', 'admin', 'staff')),
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
        PRIMARY KEY (business_id, user_id)
      );

      ALTER TABLE public.business_members ENABLE ROW LEVEL SECURITY;

      -- Trigger to create business member on business creation
      CREATE OR REPLACE FUNCTION public.create_business_owner()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.business_members (business_id, user_id, role)
        VALUES (NEW.id, auth.uid(), 'owner');
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      DROP TRIGGER IF EXISTS on_business_created ON public.businesses;
      CREATE TRIGGER on_business_created
        AFTER INSERT ON public.businesses
        FOR EACH ROW EXECUTE FUNCTION public.create_business_owner();

      -- Trigger to create profile on user signup
      CREATE OR REPLACE FUNCTION public.handle_new_user() 
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.profiles (id, full_name)
        VALUES (new.id, new.raw_user_meta_data->>'full_name');
        RETURN new;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

      -- Business Policies
      DROP POLICY IF EXISTS "Users can create businesses" ON public.businesses;
      CREATE POLICY "Users can create businesses" ON public.businesses
        FOR INSERT WITH CHECK (auth.role() = 'authenticated');

      DROP POLICY IF EXISTS "Users can view businesses they belong to" ON public.businesses;
      CREATE POLICY "Users can view businesses they belong to" ON public.businesses
        FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM public.business_members
            WHERE business_id = businesses.id AND user_id = auth.uid()
          )
        );

      DROP POLICY IF EXISTS "Users can update businesses they belong to" ON public.businesses;
      CREATE POLICY "Users can update businesses they belong to" ON public.businesses
        FOR UPDATE USING (
          EXISTS (
            SELECT 1 FROM public.business_members
            WHERE business_id = businesses.id AND user_id = auth.uid()
          )
        );

      -- Business Members Policies
      DROP POLICY IF EXISTS "Users can view their own memberships" ON public.business_members;
      CREATE POLICY "Users can view their own memberships" ON public.business_members
        FOR SELECT USING (user_id = auth.uid());

      -- For now, disable manual inserts to business_members by normal users (only the trigger creates them securely)
      -- Future expansions can add an invitation system by owners.
      
    `);
    console.log('Tables, policies, and triggers created successfully.');
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await client.end();
  }
}

run();
