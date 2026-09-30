import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jruzlujboiasirfqtgyq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpydXpsdWpib2lhc2lyZnF0Z3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2OTM2MjEsImV4cCI6MjEwNjI2OTYyMX0.cRKGBlhyu2DxbmvfLYzrG6FD3VY42Ef6BisSNJwmqv4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testWaitlist() {
  console.log('Testing Waitlist Submissions...\n')

  // 1. Try to read (Should fail because no select policy)
  console.log('Test 1: Read Waitlist (Should return 0 rows or error)')
  const { data: readData, error: readError } = await supabase.from('waitlist').select('*')
  console.log('Read Result:', { readData, readError })
  
  // 2. Try to insert (Should succeed)
  const testEmail = `test_${Date.now()}@example.com`
  console.log('\nTest 2: Insert New Email', testEmail)
  const { data: insertData, error: insertError } = await supabase
    .from('waitlist')
    .insert([{ email: testEmail, business_type: 'Test Store' }])
  console.log('Insert Result:', { insertError })

  // 3. Try to insert duplicate (Should fail with 23505)
  console.log('\nTest 3: Insert Duplicate Email', testEmail)
  const { data: dupData, error: dupError } = await supabase
    .from('waitlist')
    .insert([{ email: testEmail, business_type: 'Test Store Again' }])
  console.log('Duplicate Insert Result:', { dupError })
}

testWaitlist()
