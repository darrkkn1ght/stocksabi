import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jruzlujboiasirfqtgyq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpydXpsdWpib2lhc2lyZnF0Z3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2OTM2MjEsImV4cCI6MjEwNjI2OTYyMX0.cRKGBlhyu2DxbmvfLYzrG6FD3VY42Ef6BisSNJwmqv4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAuth() {
  console.log('--- Testing Authentication & Business RLS ---')

  const user1Email = `test.user.stocksabi1+${Date.now()}@gmail.com`
  const user2Email = `test.user.stocksabi2+${Date.now()}@gmail.com`
  const password = 'securepassword123'

  // 1. Sign up User 1
  console.log('\\n1. Signing up User 1')
  const { data: user1Data, error: user1Error } = await supabase.auth.signUp({
    email: user1Email,
    password,
  })
  if (user1Error) console.error('User 1 Signup Error:', user1Error.message)
  else console.log('User 1 Signed up:', user1Data.user?.email)

  // Wait a bit to ensure trigger creates profile
  await new Promise(r => setTimeout(r, 1000))

  // 2. Create Business for User 1
  console.log('\\n2. User 1 creates a business')
  const { data: business1, error: b1Error } = await supabase
    .from('businesses')
    .insert([{ name: 'User 1 Store', business_type: 'Other', country: 'Nigeria', currency: 'NGN' }])
    .select('*')
    .single()
  
  if (b1Error) console.error('Business 1 Create Error:', b1Error.message)
  else console.log('Business 1 created.')

  // Fetch memberships for User 1
  const { data: members1, error: m1Error } = await supabase.from('business_members').select('*')
  console.log('User 1 Business Memberships:', members1?.length)

  // 3. Sign out User 1
  await supabase.auth.signOut()

  // 4. Sign up User 2
  console.log('\\n4. Signing up User 2')
  const { data: user2Data, error: user2Error } = await supabase.auth.signUp({
    email: user2Email,
    password,
  })
  if (user2Error) console.error('User 2 Signup Error:', user2Error.message)
  else console.log('User 2 Signed up:', user2Data.user?.email)

  await new Promise(r => setTimeout(r, 1000))

  // 5. User 2 tries to read User 1's business
  console.log('\\n5. User 2 reading businesses (RLS Isolation Test)')
  const { data: businesses, error: bListError } = await supabase.from('businesses').select('*')
  console.log('User 2 Businesses visible (Should be 0):', businesses?.length)

  // 6. User 2 creates a business
  console.log('\\n6. User 2 creates a business')
  const { data: business2, error: b2Error } = await supabase
    .from('businesses')
    .insert([{ name: 'User 2 Store', business_type: 'Other', country: 'Nigeria', currency: 'NGN' }])
    .select('*')
    .single()
  
  if (b2Error) console.error('Business 2 Create Error:', b2Error.message)
  else console.log('Business 2 created.')

  // 7. Verify User 2 only sees their own business
  const { data: businessesAfter } = await supabase.from('businesses').select('*')
  console.log('User 2 Businesses visible after creation (Should be 1):', businessesAfter?.length, businessesAfter?.[0]?.name)

  // 8. Test Invalid Login
  console.log('\\n8. Testing Invalid Login')
  await supabase.auth.signOut()
  const { error: invalidLogin } = await supabase.auth.signInWithPassword({
    email: user1Email,
    password: 'wrongpassword',
  })
  console.log('Invalid login error:', invalidLogin?.message)

  // 9. Test Valid Login
  console.log('\\n9. Testing Valid Login')
  const { error: validLogin } = await supabase.auth.signInWithPassword({
    email: user1Email,
    password: password,
  })
  console.log('Valid login error:', validLogin ? validLogin.message : 'None')
  
  console.log('\\n--- Tests Completed ---')
}

testAuth()
