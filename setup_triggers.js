import pg from 'pg';
const { Client } = pg;
const connectionString = 'postgresql://postgres.jruzlujboiasirfqtgyq:A12d3f4g5h6!@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    
    const sql = `
      -- Function to update inventory on sale item insert
      CREATE OR REPLACE FUNCTION public.handle_sale_item_insert()
      RETURNS TRIGGER AS $$
      BEGIN
        UPDATE public.products
        SET stock_quantity = stock_quantity - NEW.quantity,
            updated_at = now()
        WHERE id = NEW.product_id;
        
        -- We can allow negative stock if the UI allows it, but the user said "Prevent negative inventory where the existing business rules prohibit it".
        -- Since the UI currently just goes negative or shows out of stock, we let it go negative or check. Let's enforce >= 0 if required.
        -- Actually, the user says "where the existing business rules prohibit it". Existing localStorage doesn't throw an error for negative, but maybe it should be guarded.
        -- We won't block it here to maintain exact compatibility with the UI which might allow overselling, but we ensure the calculation is atomic.
        
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      DROP TRIGGER IF EXISTS on_sale_item_insert ON public.sale_items;
      CREATE TRIGGER on_sale_item_insert
        AFTER INSERT ON public.sale_items
        FOR EACH ROW
        EXECUTE FUNCTION public.handle_sale_item_insert();
    `;

    await client.query(sql);
    console.log('Atomic sale trigger created successfully.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}
run();
