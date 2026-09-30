import pg from 'pg';
const { Client } = pg;
const connectionString = 'postgresql://postgres.jruzlujboiasirfqtgyq:A12d3f4g5h6!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected to db');

    const sql = `
      -- 1. PRODUCTS
      CREATE TABLE IF NOT EXISTS public.products (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
        name text NOT NULL,
        category text,
        selling_price numeric NOT NULL DEFAULT 0,
        cost_price numeric NOT NULL DEFAULT 0,
        stock_quantity integer NOT NULL DEFAULT 0,
        low_stock_threshold integer NOT NULL DEFAULT 0,
        image_url text,
        is_archived boolean NOT NULL DEFAULT false,
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL
      );

      ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Users can view products for their businesses" ON public.products;
      CREATE POLICY "Users can view products for their businesses" ON public.products
        FOR SELECT USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = products.business_id AND user_id = auth.uid())
        );
      
      DROP POLICY IF EXISTS "Users can insert products for their businesses" ON public.products;
      CREATE POLICY "Users can insert products for their businesses" ON public.products
        FOR INSERT WITH CHECK (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = products.business_id AND user_id = auth.uid())
        );

      DROP POLICY IF EXISTS "Users can update products for their businesses" ON public.products;
      CREATE POLICY "Users can update products for their businesses" ON public.products
        FOR UPDATE USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = products.business_id AND user_id = auth.uid())
        );

      DROP POLICY IF EXISTS "Users can delete products for their businesses" ON public.products;
      CREATE POLICY "Users can delete products for their businesses" ON public.products
        FOR DELETE USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = products.business_id AND user_id = auth.uid())
        );

      -- 2. SALES
      CREATE TABLE IF NOT EXISTS public.sales (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
        subtotal numeric NOT NULL DEFAULT 0,
        total numeric NOT NULL DEFAULT 0,
        payment_method text,
        status text NOT NULL DEFAULT 'completed',
        created_at timestamp with time zone DEFAULT now() NOT NULL
      );

      ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Users can view sales for their businesses" ON public.sales;
      CREATE POLICY "Users can view sales for their businesses" ON public.sales
        FOR SELECT USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = sales.business_id AND user_id = auth.uid())
        );
      
      DROP POLICY IF EXISTS "Users can insert sales for their businesses" ON public.sales;
      CREATE POLICY "Users can insert sales for their businesses" ON public.sales
        FOR INSERT WITH CHECK (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = sales.business_id AND user_id = auth.uid())
        );

      DROP POLICY IF EXISTS "Users can update sales for their businesses" ON public.sales;
      CREATE POLICY "Users can update sales for their businesses" ON public.sales
        FOR UPDATE USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = sales.business_id AND user_id = auth.uid())
        );

      DROP POLICY IF EXISTS "Users can delete sales for their businesses" ON public.sales;
      CREATE POLICY "Users can delete sales for their businesses" ON public.sales
        FOR DELETE USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = sales.business_id AND user_id = auth.uid())
        );

      -- 3. SALE ITEMS
      CREATE TABLE IF NOT EXISTS public.sale_items (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
        sale_id uuid REFERENCES public.sales(id) ON DELETE CASCADE NOT NULL,
        product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
        product_name text NOT NULL,
        quantity integer NOT NULL DEFAULT 1,
        selling_price numeric NOT NULL DEFAULT 0,
        cost_price numeric NOT NULL DEFAULT 0,
        line_total numeric NOT NULL DEFAULT 0
      );

      ALTER TABLE public.sale_items ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Users can view sale items for their businesses" ON public.sale_items;
      CREATE POLICY "Users can view sale items for their businesses" ON public.sale_items
        FOR SELECT USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = sale_items.business_id AND user_id = auth.uid())
        );
      
      DROP POLICY IF EXISTS "Users can insert sale items for their businesses" ON public.sale_items;
      CREATE POLICY "Users can insert sale items for their businesses" ON public.sale_items
        FOR INSERT WITH CHECK (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = sale_items.business_id AND user_id = auth.uid())
        );

      DROP POLICY IF EXISTS "Users can update sale items for their businesses" ON public.sale_items;
      CREATE POLICY "Users can update sale items for their businesses" ON public.sale_items
        FOR UPDATE USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = sale_items.business_id AND user_id = auth.uid())
        );

      DROP POLICY IF EXISTS "Users can delete sale items for their businesses" ON public.sale_items;
      CREATE POLICY "Users can delete sale items for their businesses" ON public.sale_items
        FOR DELETE USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = sale_items.business_id AND user_id = auth.uid())
        );

      -- 4. EXPENSES
      CREATE TABLE IF NOT EXISTS public.expenses (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
        description text NOT NULL,
        category text NOT NULL,
        amount numeric NOT NULL DEFAULT 0,
        date timestamp with time zone NOT NULL,
        created_at timestamp with time zone DEFAULT now() NOT NULL
      );

      ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Users can view expenses for their businesses" ON public.expenses;
      CREATE POLICY "Users can view expenses for their businesses" ON public.expenses
        FOR SELECT USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = expenses.business_id AND user_id = auth.uid())
        );
      
      DROP POLICY IF EXISTS "Users can insert expenses for their businesses" ON public.expenses;
      CREATE POLICY "Users can insert expenses for their businesses" ON public.expenses
        FOR INSERT WITH CHECK (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = expenses.business_id AND user_id = auth.uid())
        );

      DROP POLICY IF EXISTS "Users can update expenses for their businesses" ON public.expenses;
      CREATE POLICY "Users can update expenses for their businesses" ON public.expenses
        FOR UPDATE USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = expenses.business_id AND user_id = auth.uid())
        );

      DROP POLICY IF EXISTS "Users can delete expenses for their businesses" ON public.expenses;
      CREATE POLICY "Users can delete expenses for their businesses" ON public.expenses
        FOR DELETE USING (
          EXISTS (SELECT 1 FROM public.business_members WHERE business_id = expenses.business_id AND user_id = auth.uid())
        );
    `;

    await client.query(sql);
    console.log('Business data tables and policies created successfully.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}
run();
