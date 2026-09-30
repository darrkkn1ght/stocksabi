import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Menu, X, ArrowRight, BarChart3, Package, CreditCard, PieChart, ShieldCheck, Zap, LineChart, BookOpen, Receipt } from 'lucide-react'
import { Logo } from '../../components/ui/Logo'

// Colors are directly embedded into Tailwind arbitrary values.

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#17243A] font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <PreviewSection />
      <HowItWorksSection />
      <WaitlistSection />
      <Footer />
    </div>
  )
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#F7F5EF]/90 backdrop-blur-md border-b border-[#17243A]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo className="scale-90 origin-left" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-[#17243A]/70 hover:text-[#356AE6] transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-[#17243A]/70 hover:text-[#356AE6] transition-colors">How It Works</a>
            <a href="#about" className="text-sm font-medium text-[#17243A]/70 hover:text-[#356AE6] transition-colors">About</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-sm font-bold text-[#17243A] hover:text-[#356AE6] transition-colors">
              Log In
            </Link>
            <a 
              href="#waitlist" 
              className="bg-[#17243A] text-white px-5 py-2.5 rounded-[8px] text-sm font-bold hover:bg-[#356AE6] transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Join the Waitlist
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#17243A]">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#17243A]/10 px-4 pt-2 pb-6 space-y-4 shadow-lg">
          <a href="#features" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-[#17243A]">Features</a>
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-[#17243A]">How It Works</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-[#17243A]">About</a>
          <div className="pt-4 flex flex-col gap-3 border-t border-[#17243A]/10">
            <Link to="/" className="w-full text-center px-4 py-3 border border-[#17243A]/20 rounded-[8px] font-bold text-[#17243A]">Log In</Link>
            <a href="#waitlist" onClick={() => setIsOpen(false)} className="w-full text-center px-4 py-3 bg-[#17243A] text-white rounded-[8px] font-bold">Join the Waitlist</a>
          </div>
        </div>
      )}
    </nav>
  )
}

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] text-[#17243A] mb-6">
            Know your stock. Understand your money.
          </h1>
          <p className="text-lg sm:text-xl text-[#17243A]/70 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Understand your stock, sales, and expenses in one place. STOCKSABI helps independent retailers see what is selling, what is running low, and how their business is performing.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a href="#waitlist" className="w-full sm:w-auto bg-[#356AE6] text-white px-8 py-4 rounded-[10px] text-base font-bold hover:bg-[#2851B5] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#356AE6]/30 flex items-center justify-center gap-2">
              Join the Waitlist <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#features" className="w-full sm:w-auto bg-white text-[#17243A] border border-[#17243A]/20 px-8 py-4 rounded-[10px] text-base font-bold hover:bg-[#F7F5EF] transition-all flex items-center justify-center">
              Explore the Product
            </a>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#356AE6]/20 to-[#F16D5B]/20 rounded-[32px] blur-2xl opacity-70"></div>
          <div className="relative bg-white rounded-[24px] border border-[#17243A]/10 shadow-2xl overflow-hidden flex flex-col">
            {/* Window header */}
            <div className="h-12 border-b border-[#17243A]/5 bg-[#F7F5EF]/50 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F16D5B]"></div>
              <div className="w-3 h-3 rounded-full bg-[#E5E4DA]"></div>
              <div className="w-3 h-3 rounded-full bg-[#367A53]"></div>
            </div>
            {/* Dashboard Mockup */}
            <div className="p-6 bg-[#F7F5EF] h-[400px]">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#17243A]">Good morning, Tunde.</h3>
                  <p className="text-xs text-[#17243A]/60">Here's what is happening today.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-[12px] shadow-sm border border-[#17243A]/5">
                  <p className="text-[10px] uppercase font-bold text-[#17243A]/50 mb-1">Today's Sales</p>
                  <p className="text-2xl font-mono font-bold text-[#17243A]">₦45,500</p>
                </div>
                <div className="bg-[#17243A] p-4 rounded-[12px] shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-white/50 mb-1">Net Profit</p>
                  <p className="text-2xl font-mono font-bold text-[#DDE8FF]">₦12,200</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-[12px] shadow-sm border border-[#17243A]/5 flex flex-col h-32 justify-center items-center">
                 <div className="w-full flex items-end gap-2 h-16 justify-between px-2">
                   {[40, 70, 45, 90, 65, 85, 110].map((h, i) => (
                     <div key={i} className="w-6 bg-[#356AE6]/20 rounded-t-sm" style={{ height: `${h}%` }}>
                       <div className="w-full bg-[#356AE6] rounded-t-sm" style={{ height: `${h * 0.7}%` }}></div>
                     </div>
                   ))}
                 </div>
                 <p className="text-[10px] text-center text-[#17243A]/50 mt-4 uppercase font-bold">Illustrative Data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-[#17243A]/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#17243A] mb-8 max-w-3xl mx-auto leading-tight">
          Running a shop shouldn't mean guessing how your business is doing.
        </h2>
        <p className="text-lg text-[#17243A]/70 max-w-2xl mx-auto mb-16 leading-relaxed">
          Stock records, sales, and expenses are often scattered across notebooks, receipts, and separate systems. The result? You never truly know your profit margins or exactly what needs restocking.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#F7F5EF] p-8 rounded-[24px] border border-[#17243A]/10 text-left relative overflow-hidden group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#17243A]/10 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-[#17243A]/70" />
            </div>
            <h3 className="text-lg font-bold text-[#17243A] mb-3">Scattered Notebooks</h3>
            <p className="text-[#17243A]/70 text-sm leading-relaxed">Sales recorded in one book, debts in another. It's impossible to get a clear picture without spending hours calculating.</p>
          </div>
          
          <div className="bg-[#F7F5EF] p-8 rounded-[24px] border border-[#17243A]/10 text-left relative overflow-hidden group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#17243A]/10 group-hover:scale-110 transition-transform">
              <Receipt className="w-5 h-5 text-[#17243A]/70" />
            </div>
            <h3 className="text-lg font-bold text-[#17243A] mb-3">Lost Receipts</h3>
            <p className="text-[#17243A]/70 text-sm leading-relaxed">Expenses eat into your profit, but without tracking every supplier payment and shop expense, your money vanishes.</p>
          </div>

          <div className="bg-[#F7F5EF] p-8 rounded-[24px] border border-[#17243A]/10 text-left relative overflow-hidden group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#17243A]/10 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5 text-[#17243A]/70" />
            </div>
            <h3 className="text-lg font-bold text-[#17243A] mb-3">Mystery Inventory</h3>
            <p className="text-[#17243A]/70 text-sm leading-relaxed">Finding out a popular product is out of stock only when a customer asks for it means lost revenue.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const SolutionSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#17243A] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            One connected view of your business.
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            STOCKSABI replaces the chaos with a streamlined system. When everything is connected, you finally get absolute visibility into your business health.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#356AE6] to-transparent opacity-50 -translate-y-1/2"></div>
          
          {/* Feature 1 */}
          <div className="bg-[#1f2f4c] border border-white/10 p-8 rounded-[24px] relative z-10 hover:border-[#356AE6]/50 transition-colors">
            <div className="w-14 h-14 bg-[#356AE6] rounded-[12px] flex items-center justify-center mb-6 shadow-lg shadow-[#356AE6]/20">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. INVENTORY</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Know what you have, what is selling, and what is running low. Get alerted before you run out of your best-sellers.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#1f2f4c] border border-white/10 p-8 rounded-[24px] relative z-10 hover:border-[#F16D5B]/50 transition-colors">
            <div className="w-14 h-14 bg-[#F16D5B] rounded-[12px] flex items-center justify-center mb-6 shadow-lg shadow-[#F16D5B]/20">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. SALES</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Record transactions instantly. Every sale automatically updates your inventory and recalculates your daily revenue.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#1f2f4c] border border-white/10 p-8 rounded-[24px] relative z-10 hover:border-[#367A53]/50 transition-colors">
            <div className="w-14 h-14 bg-[#367A53] rounded-[12px] flex items-center justify-center mb-6 shadow-lg shadow-[#367A53]/20">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">3. EXPENSES</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Track operating costs and see exactly how they affect your bottom line. Stop wondering where the money went.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const PreviewSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-[#17243A]/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#17243A] mb-6">
            Meet the tools that make your business clearer.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <div className="flex gap-4 items-start group cursor-default">
              <div className="w-10 h-10 rounded-full bg-[#F7F5EF] flex items-center justify-center shrink-0 group-hover:bg-[#DDE8FF] transition-colors">
                <BarChart3 className="w-5 h-5 text-[#356AE6]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#17243A] mb-2">Smart Dashboard</h4>
                <p className="text-[#17243A]/70 text-sm leading-relaxed">Get a morning snapshot of your business. View today's sales, gross margins, and net profit instantly.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start group cursor-default">
              <div className="w-10 h-10 rounded-full bg-[#F7F5EF] flex items-center justify-center shrink-0 group-hover:bg-[#F16D5B]/20 transition-colors">
                <LineChart className="w-5 h-5 text-[#F16D5B]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#17243A] mb-2">Deep Insights</h4>
                <p className="text-[#17243A]/70 text-sm leading-relaxed">Understand which products are driving your profit and visualize your revenue trends over time.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start group cursor-default">
              <div className="w-10 h-10 rounded-full bg-[#F7F5EF] flex items-center justify-center shrink-0 group-hover:bg-[#367A53]/20 transition-colors">
                <Zap className="w-5 h-5 text-[#367A53]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#17243A] mb-2">Fast Transaction Entry</h4>
                <p className="text-[#17243A]/70 text-sm leading-relaxed">Record sales and expenses in seconds with a clean, distraction-free interface built for speed.</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 bg-[#F7F5EF] p-6 sm:p-8 rounded-[32px] border border-[#17243A]/10 shadow-inner">
            <div className="bg-white rounded-[16px] shadow-xl border border-[#17243A]/10 overflow-hidden relative">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#356AE6] to-[#F16D5B]"></div>
              <div className="p-6 pt-8">
                <div className="flex justify-between items-center mb-6 border-b border-[#17243A]/10 pb-4">
                  <h3 className="font-bold text-[#17243A]">Business Snapshot</h3>
                  <span className="text-xs font-bold text-[#17243A]/40 uppercase">Preview</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-[8px] hover:bg-[#F7F5EF] transition-colors">
                    <span className="text-sm font-medium text-[#17243A]/70">Active Products</span>
                    <span className="font-mono font-bold text-[#17243A]">124</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-[8px] hover:bg-[#F7F5EF] transition-colors">
                    <span className="text-sm font-medium text-[#17243A]/70">Units in Stock</span>
                    <span className="font-mono font-bold text-[#17243A]">1,450</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-[8px] bg-[#DDE8FF]/50 border border-[#356AE6]/20">
                    <span className="text-sm font-bold text-[#356AE6]">Inventory Value</span>
                    <span className="font-mono font-bold text-[#356AE6]">₦845,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-[#F7F5EF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#17243A] mb-16">
          Simple to use. Powerful results.
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="text-[120px] font-serif font-bold text-[#17243A]/5 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none">1</div>
            <div className="bg-white p-8 rounded-[24px] border border-[#17243A]/10 shadow-sm relative z-10 h-full">
              <h3 className="text-xl font-bold text-[#17243A] mb-4">Add your products.</h3>
              <p className="text-[#17243A]/70 text-sm leading-relaxed">Enter your inventory, cost prices, and selling prices. Set low-stock alerts so you never run out unexpectedly.</p>
            </div>
          </div>

          <div className="relative">
            <div className="text-[120px] font-serif font-bold text-[#17243A]/5 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none">2</div>
            <div className="bg-white p-8 rounded-[24px] border border-[#17243A]/10 shadow-sm relative z-10 h-full">
              <h3 className="text-xl font-bold text-[#17243A] mb-4">Record sales & expenses.</h3>
              <p className="text-[#17243A]/70 text-sm leading-relaxed">Log transactions as they happen. It takes seconds, and your stock levels update automatically.</p>
            </div>
          </div>

          <div className="relative">
            <div className="text-[120px] font-serif font-bold text-[#17243A]/5 absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none">3</div>
            <div className="bg-white p-8 rounded-[24px] border border-[#17243A]/10 shadow-sm relative z-10 h-full border-t-4 border-t-[#356AE6]">
              <h3 className="text-xl font-bold text-[#17243A] mb-4">Understand performance.</h3>
              <p className="text-[#17243A]/70 text-sm leading-relaxed">Watch your dashboard calculate revenue, profit margins, and top-selling items instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('submitting')
    setErrorMessage('')
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, business_type: businessType }])

      if (error) {
        if (error.code === '23505') { // Postgres unique violation error code
          setErrorMessage('You are already on the waitlist! We will be in touch soon.')
        } else {
          setErrorMessage(error.message || 'An error occurred while joining the waitlist.')
        }
        setStatus('error')
        return
      }

      setStatus('success')
      setEmail('')
      setBusinessType('')
    } catch (err: any) {
      setErrorMessage('A network error occurred. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="py-24 bg-white border-t border-[#17243A]/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#356AE6]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#F16D5B]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#17243A] mb-6">
          Be among the first to experience STOCKSABI.
        </h2>
        <p className="text-lg text-[#17243A]/70 mb-10 leading-relaxed">
          We're preparing STOCKSABI for independent retailers. Join the waitlist to receive product updates and information about early access.
        </p>

        {status === 'success' ? (
          <div className="bg-[#DDE8FF] border border-[#356AE6]/30 p-8 rounded-[16px] animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 bg-[#356AE6] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#17243A] mb-2">You're on the list!</h3>
            <p className="text-[#17243A]/70 text-sm">
              Thank you for joining the STOCKSABI waitlist. We will notify you when early access becomes available.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[24px] border border-[#17243A]/10 shadow-xl shadow-[#17243A]/5 text-left">
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#17243A] mb-2">Email Address *</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-[10px] border border-[#17243A]/20 focus:outline-none focus:ring-2 focus:ring-[#356AE6] focus:border-transparent transition-all"
                  disabled={status === 'submitting'}
                />
              </div>
              <div>
                <label htmlFor="business" className="block text-sm font-bold text-[#17243A] mb-2">Business Type (Optional)</label>
                <input 
                  type="text" 
                  id="business"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g. Provision Store, Cosmetics"
                  className="w-full px-4 py-3 rounded-[10px] border border-[#17243A]/20 focus:outline-none focus:ring-2 focus:ring-[#356AE6] focus:border-transparent transition-all"
                  disabled={status === 'submitting'}
                />
              </div>
            </div>
            
            {status === 'error' && (
              <div className="mb-6 p-4 bg-[#F16D5B]/10 border border-[#F16D5B]/20 rounded-[8px] text-[#B74C43] text-sm">
                {errorMessage}
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-[#17243A] text-white py-4 rounded-[10px] font-bold hover:bg-[#356AE6] transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {status === 'submitting' ? (
                <span className="animate-pulse">Joining Waitlist...</span>
              ) : (
                'Join the Waitlist'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17243A] text-white py-16 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12 border-b border-white/10 pb-12">
          <div className="md:col-span-2">
            <Logo light className="scale-90 origin-left mb-4" />
            <p className="text-white/60 text-sm max-w-xs mb-6">
              Know your stock. Understand your money.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-white/60 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-white/60 hover:text-white text-sm transition-colors">How it Works</a></li>
              <li><Link to="/" className="text-white/60 hover:text-white text-sm transition-colors">Log In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-white/60 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>&copy; {new Date().getFullYear()} STOCKSABI. All rights reserved.</p>
          <p>Designed for independent retailers.</p>
        </div>
      </div>
    </footer>
  )
}
