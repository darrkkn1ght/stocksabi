# STOCKSABI — COMPREHENSIVE PRODUCT AUDIT & INVESTOR PITCH BRIEFING

**Document Type:** Technical Product Audit, Live UX Verification & Investor Presentation Briefing  
**Product:** STOCKSABI (*"Know your stock. Understand your money."*)  
**Target Market:** Independent retailers and small-to-medium retail businesses (provision stores, cosmetics shops, household goods sellers, electronics/accessories retailers) in Nigeria  
**Audit Date:** November 7, 2026  

---

## 1. EXECUTIVE SUMMARY

**STOCKSABI** is a responsive web-based business management and financial intelligence application built specifically for Nigerian independent retailers. Unlike complex accounting software designed for accountants or basic point-of-sale (POS) calculators that only record revenue, STOCKSABI connects **inventory catalog management**, **transaction recording**, and **operating expense tracking** into a single unified workflow—automatically computing **real-time gross margins**, **net operating profit**, **capital tied up in inventory**, and **rule-based business observations**.

### Current Engineering & Product State
- **Stage:** Functional, interactive MVP with a distinctive editorial financial design system (warm ivory `#F7F5EF`, deep navy `#17243A`, royal blue `#356AE6`, forest green `#367A53`, Manrope + DM Serif Display + monospace tabular numerals, and native Nigerian Naira `₦` formatting).
- **Architecture:** React 19 + TypeScript 6 + Vite 8 Single-Page Application (SPA) with dual-mode data persistence:
  1. **Cloud Multi-Tenant Backend (Supabase / PostgreSQL):** Complete database schema (`profiles`, `businesses`, `business_members`, `products`, `sales`, `sale_items`, `expenses`, `waitlist`) with Row-Level Security (RLS) policies and database triggers.
  2. **Local Browser Resilience & Demo Mode (`localStorage`):** Full offline/local fallback (`stocksabi_inventory`, `stocksabi_sales`, `stocksabi_expenses`, `stocksabi_business`, `stocksabi_session`) with one-click sample retail store seeding (**Tunde Provisions**) and JSON backup/cloud migration utilities.
- **Critical Infrastructure Finding:** During this live audit, the configured remote Supabase instance is unreachable (`fetch failed`). Because of the application's built-in local mode and demo store seeding, the entire application works seamlessly offline in the browser, but live cloud synchronization is currently inactive until the Supabase project is restored or re-pointed.

---

## 2. PRODUCT DESCRIPTION

- **Brand Name:** STOCKSABI (combining *"stock"* management with the Nigerian Pidgin/colloquial expression *"sabi"*, meaning *to know or understand*).
- **Tagline:** *"Know your stock. Understand your money."*
- **Category:** Small business management, retail operations, and financial intelligence.
- **Primary Platform:** Responsive web application supporting both desktop (fixed 232px left navigation rail) and mobile viewports (sticky top header and 6-tab fixed bottom navigation bar).
- **Core Workflow Loop:**
  $$\text{Add Products (Cost \& Selling Price)} \longrightarrow \text{Record Sales (POS / Cash / Transfer)} \longrightarrow \text{Track Operating Expenses} \longrightarrow \text{Monitor Real-Time Profit \& Stock Alerts}$$

---

## 3. PROBLEM STATEMENT

Independent retail shop owners in Nigeria commonly manage daily operations using a fragmented combination of paper notebooks, handheld calculators, WhatsApp messages, and loose supplier receipts. This creates four core operational blind spots:

1. **Revenue vs. Profit Confusion:** Merchants can see how much cash came in today, but because purchase cost per unit (COGS) and daily operating expenses (generator fuel, PHCN electricity, transport, rent, staff allowances) are recorded separately—or not at all—they do not know their true net profit.
2. **Reactive Restocking ("Mystery Inventory"):** Shop owners frequently discover a fast-moving product is out of stock only when a customer asks for it at the counter, resulting in lost sales.
3. **Invisible Capital Lock-Up:** Retailers struggle to quantify how much working capital is currently sitting on their shelves at cost versus its potential retail sales value.
4. **Software Complexity Barrier:** Traditional accounting suites (e.g., QuickBooks, Sage, ERP systems) require formal bookkeeping knowledge, while simple digital ledger apps do not link item-level unit economics with inventory depletion.

---

## 4. TARGET CUSTOMERS

### Primary Customer Segment: Independent Retail Shop Owners (Nigeria)
- **Store Types:**
  - Neighborhood provision and grocery stores
  - Cosmetics, health, and beauty retailers
  - Household goods and supplies merchants
  - Fashion, clothing, and boutique shops
  - Small electronics and accessories retailers
- **Representative User Persona (Built into Product Demo):**
  - **Name:** Tunde (`Tunde Provisions`, Ibadan, Oyo State, Nigeria)
  - **Scale:** Single-location independent retail store carrying everyday consumer packaged goods (Peak Milk, Indomie cartons, Golden Penny Spaghetti, Milo, Dettol, Nivea, Power Oil, Coca-Cola).
  - **Payment Reality:** Customers pay via a mix of **POS terminals**, **Bank Transfers**, and **Cash** in Nigerian Naira (`₦`).
  - **Core Need:** Wants to open the app, record a sale in seconds, and immediately answer three questions without accounting jargon:
    1. *How much money did I make today?*
    2. *What products do I need to restock before I run out?*
    3. *How much profit am I actually keeping after product costs and shop expenses?*

---

## 5. SOLUTION

STOCKSABI provides a distraction-free workspace with five integrated modules:

1. **Morning Executive Dashboard (`/`)**: Greets the merchant by name and displays Today's Sales Revenue, Gross Profit (Revenue minus COGS), Operating Expenses, and Net Operating Profit/Loss—alongside a 7-day sales revenue chart, an editorial callout for the best-selling product, low-stock/out-of-stock alerts, recent transactions, and a store snapshot.
2. **Catalog & Inventory Management (`/inventory`)**: Tracks every active product's selling price, supplier cost price, unit gross margin, available stock quantity, and custom low-stock alert threshold, automatically classifying items as **In stock**, **Low stock**, or **Out of stock**.
3. **Fast Point-of-Sale Recording (`/sales/new`)**: Enables multi-item cart assembly with real-time stock ceiling validation, payment method tagging (`Cash`, `Transfer`, `POS`), instant gross profit calculation, and automatic stock deduction upon sale completion.
4. **Operating Expense Tracker (`/expenses`)**: Logs shop overhead across 9 retail-relevant categories (`Rent`, `Transport`, `Electricity`, `Internet`, `Staff`, `Supplies`, `Marketing`, `Maintenance`, `Other`) and deducts today's operating costs directly from gross profit.
5. **Automated Business Intelligence (`/insights`)**: Synthesizes all recorded activity into all-time profitability metrics, revenue trend charts, top-performing products by revenue and margin, highest/lowest margin watch cards, stock-at-risk valuation, expense concentration bars, customer payment mix, working capital in stock, and plain-English business observations (*"What Stands Out"*).

---

## 6. ACTUAL IMPLEMENTED FEATURES

Every capability listed below was verified directly in the source code (`src/`) and confirmed in the live running application (`http://localhost:5173`):

### A. Public Marketing & Lead Capture (`/landing`)
- Responsive landing page with brand narrative, problem/solution breakdown, interactive UI preview cards, "How It Works" 3-step guide, **"Launch Live Demo"** instant access button, and a **Waitlist signup form** (capturing email and optional business type, with duplicate-email detection).

### B. Authentication & Store Onboarding (`/login`, `/signup`, `/forgot-password`, `/reset-password`, `/onboarding`)
- Email/password login and registration forms integrated with Supabase Auth and automatic local fallback when offline.
- **"Use Built-in Admin (Demo Store)"** button on `/login` for instant demo access.
- Store onboarding wizard (`/onboarding`) capturing Business Name, Business Type (6 retail categories), Store Location, Country, Currency (`NGN`), and a checkbox to pre-populate the workspace with sample retail products and transactions.

### C. Overview Dashboard (`/`)
- Time-of-day dynamic greeting (*"Good morning / afternoon / evening, Tunde."*).
- Hero metric strip: **Today's Sales**, **Gross Profit**, **Expenses**, and **Net Profit / Operating Loss**.
- **Sales Activity AreaChart** (Recharts) plotting daily revenue across the **Last 7 Days**.
- **Editorial Insight Banner** highlighting the top-selling product by revenue and units sold.
- **Needs Attention** panel listing up to 5 out-of-stock or low-stock products sorted by urgency (out-of-stock first, then lowest stock-to-threshold ratio).
- **Business Snapshot** card displaying Active Products count, total Units in Stock, total Inventory Value at cost (`₦`), and Transactions Today.
- **Recent Transactions** feed showing the 5 latest sales with payment method badge, item count, total Naira value, and timestamp.

### D. Inventory Management (`/inventory`, `/inventory/new`, `/inventory/:id`, `/inventory/:id/edit`)
- Top summary bar: Catalog count, Units in Stock, Inventory Value (at cost), and Needs Attention count.
- Instant client-side search (by product name or category) and status filter pills (`All`, `In stock`, `Low stock`, `Out of stock`).
- **Add / Edit Product Form** built with `react-hook-form` and `zod` schema validation, including a live **margin warning** (`⚠️ Warning: Selling price is not greater than cost price`) if a merchant enters a selling price $\le$ cost price.
- **Product Details Page** showing Selling Price, Cost Price, Gross Margin per unit (`₦`), Current Quantity, Low-Stock Alert threshold, Total Inventory Value for that SKU, Edit button, and **Archive** action.

### E. Sales Recording & History (`/sales`, `/sales/new`, `/sales/:id`)
- **Record Sale Interface (`/sales/new`)**:
  - Searchable active product list showing unit price and remaining stock.
  - Prevents selecting out-of-stock items or adding more units to the cart than available in stock (*"Only X units available"* warning).
  - Interactive cart with `+` / `-` quantity steppers, item removal, and live subtotal/total calculation.
  - Payment method selector (`Cash`, `Transfer`, `POS`).
  - Automatic stock quantity deduction upon clicking **Complete Sale**.
  - Sale confirmation screen displaying total received, payment method, and **Estimated Gross Profit** badge.
- **Sales History (`/sales`)**: Summary metrics (Today's Sales, Total Transactions, Average Transaction Value) and a full table/mobile list of completed sales.
- **Sale Receipt Details (`/sales/:id`)**: Itemized table (Product, Qty, Unit Price, Line Total), Transaction Details (Status, Payment Method, Total Units Sold), and a dedicated **Profit Analysis** card showing the exact Gross Profit earned on that transaction.

### F. Expense Management (`/expenses`, `/expenses/new`, `/expenses/:id`, `/expenses/:id/edit`)
- Summary bar: This Month's Expenses (`₦`), Number of Expenses, and Largest Expense (`₦`).
- **Category Breakdown** sidebar card with proportional progress bars and Naira totals per category.
- Full CRUD workflow: Add Expense (`/expenses/new`), View Expense Details (`/expenses/:id`), Edit Expense (`/expenses/:id/edit`), and Delete Expense with a custom confirmation modal overlay.

### G. Business Insights (`/insights`)
- **All Recorded Activity** 4-card banner: All-time Revenue, Gross Profit, Operating Expenses, and Net Operating Profit (automatically flagging `OPERATING LOSS` in red when expenses exceed gross profit).
- **Sales Performance** chronological revenue trend chart (`AreaChart`).
- **Products Driving Sales** table ranking top 5 products by revenue, units sold, and gross margin percentage (`%`).
- **Margin Watch** comparison cards highlighting the **Highest Margin** and **Lowest Margin** products sold.
- **Stock to Watch** risk cards showing current stock and estimated cost value at risk.
- **Where Your Money Goes** expense concentration breakdown with percentage shares.
- **How Customers Pay** payment mix breakdown (`Transfer`, `POS`, `Cash`) by percentage and Naira volume.
- **Money in Stock** valuation card comparing **Inventory Cost Value**, **Potential Sales Value**, and **Potential Gross Profit**.
- **What Stands Out** automated observation cards generated from live business rules (out-of-stock count, low-stock count, $\ge 25\%$ revenue concentration, $\ge 30\%$ expense concentration, highest gross margin SKU, capital tied up in stock, and net operating profitability).

### H. Settings, Backup & Cloud Migration (`/settings`)
- **Business Details Form**: Edit and save Business Name and Store Location (persists to `localStorage` and syncs to Supabase when online), plus read-only Operating Currency (`Nigerian Naira (NGN, ₦)`).
- **Data Backup & Cloud Sync**:
  - **Backup Local Data**: Exports all local inventory, sales, and expenses to a timestamped `.json` file (`stocksabi_backup_<timestamp>.json`).
  - **Migrate to Cloud**: Preview and batch-migrate local browser records into the authenticated Supabase business account with deduplication checks.
- **Demo Mode**: One-click **Load Demo Business** (seeds 12 Nigerian retail products, 21 sales across 20 days, and 11 operating expenses) and **Reset Demo Data** (clears workspace to empty state).

---

## 7. FEATURE COMPLETION AUDIT

| Module / Feature | Status | Evidence & Implementation Notes |
| :--- | :--- | :--- |
| **1. DASHBOARD** | | |
| Sales overview (Today's Sales) | **COMPLETE** | [`DashboardPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/dashboard/DashboardPage.tsx), [`useDashboardMetrics.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useDashboardMetrics.ts) |
| Gross profit (Today) | **COMPLETE** | Computed as $\sum (\text{sale.total} - \sum \text{qty} \times \text{costPrice})$ in [`useDashboardMetrics.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useDashboardMetrics.ts#L48-L55) |
| Expenses (Today) | **COMPLETE** | Sums expenses recorded today in [`useDashboardMetrics.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useDashboardMetrics.ts#L57-L59) |
| Net operating profit (Today) | **COMPLETE** | Computed as $\text{Today Gross Profit} - \text{Today Expenses}$; switches label to *Operating Loss* when negative |
| Stock alerts (*Needs attention*) | **COMPLETE** | Filters active products where `stockQuantity <= lowStockThreshold`, sorted by urgency |
| Charts & analytics (7-day sales) | **COMPLETE** | Recharts `AreaChart` displaying rolling Last 7 Days revenue (`Mon`–`Today`) |
| Date filtering on Dashboard | **NOT IMPLEMENTED** | Dashboard is fixed to *Today* (hero metrics) and *Last 7 Days* (chart); custom date range pickers are not implemented |
| Best-selling product insight & Snapshot | **COMPLETE** | Editorial callout card + Active Products, Units in Stock, Inventory Value, Transactions Today |
| **2. INVENTORY MANAGEMENT** | | |
| Add products | **COMPLETE** | [`NewProductPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/inventory/NewProductPage.tsx), [`ProductForm.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/inventory/components/ProductForm.tsx) with Zod validation |
| Edit products | **COMPLETE** | [`EditProductPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/inventory/EditProductPage.tsx) |
| Delete or archive products | **COMPLETE** | Soft-delete via Archive button in [`ProductDetailsPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/inventory/ProductDetailsPage.tsx#L30-L37) (`isArchived: true`). UI for viewing/restoring archived items is not exposed, though `archivedProducts` is computed in [`useInventory.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useInventory.ts#L17) |
| Search and filtering | **COMPLETE** | Real-time search by name/category + status filter pills (`All`, `In stock`, `Low stock`, `Out of stock`) |
| Product categories | **COMPLETE** | Free-text category input on product form; displayed across tables and details |
| Purchase cost (`costPrice`) | **COMPLETE** | Stored per product and snapshotted on every `SaleItem` at the moment of sale |
| Selling price (`sellingPrice`) | **COMPLETE** | Stored per product with live margin warning if `sellingPrice <= costPrice` |
| Stock quantities | **COMPLETE** | Tracked per product (`stockQuantity`) and updated on sale or product edit |
| Low-stock alerts | **COMPLETE** | Configurable `lowStockThreshold` per product (default `5`) driving badges and alert panels |
| Product image upload | **PARTIALLY IMPLEMENTED** | `imageUrl` exists in TypeScript types and DB schema (`image_url`), but no file upload input is rendered in `ProductForm.tsx` |
| **3. SALES MANAGEMENT** | | |
| Recording sales | **COMPLETE** | [`NewSalePage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/sales/NewSalePage.tsx), [`useSales.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useSales.ts) |
| Shopping cart functionality | **COMPLETE** | Search-and-select product list, quantity `+`/`-` controls, item removal, stock ceiling enforcement |
| Multiple products per transaction | **COMPLETE** | Supports arbitrary line items per sale (`SaleItem[]`) |
| Payment methods | **COMPLETE** | `Cash`, `Transfer`, and `POS` selectable per transaction |
| Automatic stock deduction | **COMPLETE** | Verified in [`DataContext.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/lib/DataContext.tsx#L254-L329) and live browser test (stock decreased `45` $\rightarrow$ `44` on sale completion) |
| Sales history | **COMPLETE** | [`SalesPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/sales/SalesPage.tsx) with summary metrics and transaction table |
| Transaction details & profit analysis | **COMPLETE** | [`SaleDetailsPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/sales/SaleDetailsPage.tsx) showing line items and transaction-level Gross Profit |
| Sale cancellation / refund UI | **PARTIALLY IMPLEMENTED** | `updateSaleStatus(id, 'cancelled')` exists in [`DataContext.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/lib/DataContext.tsx#L331-L344), but no Cancel button is exposed in `SaleDetailsPage.tsx` |
| **4. EXPENSE MANAGEMENT** | | |
| Recording expenses | **COMPLETE** | [`NewExpensePage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/expenses/NewExpensePage.tsx), [`ExpenseForm.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/expenses/components/ExpenseForm.tsx) |
| Expense categories | **COMPLETE** | 9 predefined categories (`Rent`, `Transport`, `Electricity`, `Internet`, `Staff`, `Supplies`, `Marketing`, `Maintenance`, `Other`) |
| Expense history, edit & delete | **COMPLETE** | [`ExpensesPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/expenses/ExpensesPage.tsx), [`ExpenseDetailsPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/expenses/ExpenseDetailsPage.tsx), [`EditExpensePage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/expenses/EditExpensePage.tsx) |
| Expense summaries | **COMPLETE** | This Month's Expenses, Number of Expenses, Largest Expense, and Category Breakdown progress bars |
| Integration with profit calculations | **COMPLETE** | Directly deducted in Dashboard (`todayNetProfit`) and Insights (`totalNetOperatingProfit`) |
| **5. BUSINESS INSIGHTS** | | |
| Best-selling products | **COMPLETE** | Top 5 products table ranked by revenue with units sold and gross margin `%` |
| Product profitability & profit margins | **COMPLETE** | Per-product gross profit and margin `%` in table + *Margin Watch* (Highest vs. Lowest Margin cards) |
| Stock risks (*Stock to Watch*) | **COMPLETE** | Displays low/out-of-stock items with estimated cost value (`₦`) |
| Expense breakdown (*Where Your Money Goes*) | **COMPLETE** | Category-level Naira totals and percentage share bars |
| Payment Mix & Money in Stock | **COMPLETE** | Customer payment method share + Inventory Cost Value vs. Potential Sales Value vs. Potential Gross Profit |
| Automated Business Observations | **COMPLETE** | Rule-based insights engine in [`useInsights.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useInsights.ts#L153-L240) (*What Stands Out*) |
| **6. SETTINGS & PLATFORM** | | |
| Business information | **COMPLETE** | Editable Business Name and Store Location in [`SettingsPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/settings/SettingsPage.tsx) |
| Account settings (Password reset) | **PARTIALLY IMPLEMENTED** | [`ForgotPasswordPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/auth/ForgotPasswordPage.tsx) and [`ResetPasswordPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/auth/ResetPasswordPage.tsx) exist, but require live Supabase Auth email delivery |
| Currency preferences | **PARTIALLY IMPLEMENTED** | Set during `/onboarding` (defaults to `NGN`), displayed as read-only in `/settings`; currency formatter is hardcoded to `en-NG` / `NGN` (`₦`) |
| Data management (Backup & Migration) | **COMPLETE** | JSON file export (`backupLocalStorage`) and Supabase batch migration (`migrateDataToSupabase`) |
| Demo-data functionality | **COMPLETE** | One-click *Load Demo Business* and *Reset Demo Data* in `/settings`, plus *Launch Live Demo* on `/landing` and *Use Built-in Admin* on `/login` |

---

## 8. TECHNICAL ARCHITECTURE

### Frontend Stack
- **Core Framework:** React `^19.2.8` with TypeScript `~6.0.2` and Vite `^8.3.0`.
- **Styling & Design Tokens:** Tailwind CSS v4 (`@tailwindcss/vite` `^4.3.3`) configured in [`src/styles/globals.css`](file:///c:/Users/HomePC/Documents/stocksabi/src/styles/globals.css) and [`src/styles/tokens.css`](file:///c:/Users/HomePC/Documents/stocksabi/src/styles/tokens.css).
- **Routing:** `react-router-dom` `^7.18.4` (`createBrowserRouter` in [`src/app/router.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/app/router.tsx)) with route guards ([`ProtectedRoute.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/components/layout/ProtectedRoute.tsx) and [`PublicRoute.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/components/layout/PublicRoute.tsx)).
- **Forms & Validation:** `react-hook-form` `^7.89.0`, `zod` `^4.6.5`, and `@hookform/resolvers` `^5.9.1`.
- **Data Visualization & Icons:** `recharts` `^3.10.1` (`AreaChart`, `ResponsiveContainer`, `Tooltip`, `XAxis`) and `lucide-react` `^1.48.0`.
- **Linting:** `oxlint` `^1.81.0` (passes with 0 errors).

### State Management & Data Flow
- **Context Providers:**
  - [`AuthContext.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/lib/AuthContext.tsx): Manages user session, active business profile, Supabase Auth state listeners, and local/offline session fallback (`stocksabi_session`, `stocksabi_business`).
  - [`DataContext.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/lib/DataContext.tsx): Central data store holding `products`, `sales`, and `expenses`, exposing async CRUD methods (`addProduct`, `updateProduct`, `addSale`, `updateSaleStatus`, `addExpense`, `updateExpense`, `deleteExpense`) that sync with Supabase when online and persist to `localStorage` (`stocksabi_inventory`, `stocksabi_sales`, `stocksabi_expenses`).
- **Domain Hooks:**
  - [`useInventory.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useInventory.ts): Filters active vs. archived products, computes total inventory cost value, and classifies stock status (`in_stock`, `low_stock`, `out_of_stock`).
  - [`useSales.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useSales.ts): Performs fail-fast stock availability checks before recording a sale and computes today's sales total, transaction count, and average transaction value.
  - [`useExpenses.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useExpenses.ts): Provides expense lookup and CRUD wrappers.
  - [`useDashboardMetrics.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useDashboardMetrics.ts): Computes daily revenue, COGS, gross profit, operating expenses, net profit, rolling 7-day chart series, top-selling product callout, and urgent stock alerts.
  - [`useInsights.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/hooks/useInsights.ts): Computes all-time financial KPIs, product margin rankings, stock-at-risk values, category expense shares, payment method mix, working capital in stock, and rule-based text observations.

### Backend & Database Architecture (Supabase / PostgreSQL)
- **Client SDK:** `@supabase/supabase-js` `^2.117.2` initialized in [`src/lib/supabase.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/lib/supabase.ts).
- **Database Schema (provisioned via `setup_auth_db.js`, `setup_business_db.js`, `setup_db.sql`):**
  - `public.profiles`: Linked `1:1` to `auth.users` via trigger `on_auth_user_created`.
  - `public.businesses`: Multi-tenant store entity (`id`, `name`, `business_type`, `country`, `currency`).
  - `public.business_members`: Join table (`business_id`, `user_id`, `role` $\in \{\text{'owner'}, \text{'admin'}, \text{'staff'}\}$) populated automatically on business creation via `SECURITY DEFINER` trigger `on_business_created`.
  - `public.products`, `public.sales`, `public.sale_items`, `public.expenses`: Core operational tables scoped by `business_id` with Row-Level Security (RLS) policies enforcing `EXISTS (SELECT 1 FROM public.business_members WHERE business_id = ... AND user_id = auth.uid())`.
  - `public.waitlist`: Public lead-capture table with RLS policy allowing anonymous `INSERT` only (`SELECT`/`UPDATE`/`DELETE` denied to public).

### Environment Variables & Deployment Configuration
- **Required Environment Variables (`.env`):**
  - `VITE_SUPABASE_URL` (Supabase project endpoint)
  - `VITE_SUPABASE_ANON_KEY` (Supabase public anonymous JWT key)
- **Deployment Configuration:** Standard Vite production bundle (`npm run build` outputs static assets to `dist/`). No `vercel.json`, `netlify.toml`, Dockerfile, or CI/CD pipeline configuration files are currently committed to the repository.

---

## 9. BROWSER INSPECTION FINDINGS

The live application was started via `npm run dev` (`http://localhost:5173`) and inspected end-to-end using automated headless Chrome (1440px desktop viewport, $2\times$ device scale factor).

1. **Landing Page (`/landing`)**: Rendered cleanly with the editorial serif headline *"Know your stock. Understand your money."*, interactive dashboard preview mockup, problem/solution cards, and waitlist form.
2. **One-Click Demo Launch**: Clicking **"Launch Live Demo"** immediately authenticated into the **Tunde Provisions** workspace (`Nigeria (NGN)`) and redirected to the populated Overview Dashboard (`/`).
3. **Dashboard Verification (`/`)**:
   - Greeting: *"Good morning, Tunde."*
   - Today's Sales: `₦21,000` (across 2 transactions today: `SL-8492` for `₦13,000` via POS and `SL-8491` for `₦8,000` via Cash).
   - Today's Gross Profit: `₦4,900`.
   - Today's Operating Expenses: `₦3,500` (*Generator fuel (10L)*).
   - Today's Net Profit: `₦1,400`.
   - Best-Selling Product Callout: *"Peak Milk 400g generated ₦7,000 across 2 units sold."*
   - Needs Attention Alerts: *Milo 500g* (`0` stock / `5` threshold), *Closeup Toothpaste 140g* (`4` stock / `10` threshold), *Peak Milk Sachet Pack (Roll)* (`5` stock / `10` threshold), and *Indomie Instant Noodles (Carton)* (`8` stock / `10` threshold).
   - Business Snapshot: `12` Active Products, `244` Units in Stock, `₦604,200` Inventory Value, `2` Transactions Today.
4. **Inventory & Automatic Stock Deduction Test (`/inventory` $\rightarrow$ `/sales/new`)**:
   - Inspected **Peak Milk 400g** (`PRD-001`) before sale: `45` units in stock (`₦3,500` selling price, `₦2,800` cost price).
   - Navigated to **Record Sale (`/sales/new`)**, added 1 unit of *Peak Milk 400g* (`₦3,500`) and 1 unit of *Golden Penny Spaghetti* (`₦1,200`) for a cart total of `₦4,700`, selected **POS** payment, and clicked **Complete Sale**.
   - **Verified Result:** The confirmation screen rendered (*"Sale recorded successfully"*), and `PRD-001` stock quantity automatically decremented from `45` to `44` units.
5. **UX Observation on Record Sale Page (`/sales/new`)**:
   - In [`NewSalePage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/sales/NewSalePage.tsx#L186), when a product is already in the cart (`inCart`), the button applies `className="bg-[#202820] text-white hover:bg-black"` on top of `variant="secondary"`. Because `Button`'s `secondary` variant in [`Button.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/components/ui/Button.tsx) also applies `bg-white text-[#202820]`, Tailwind CSS class order causes `bg-white` and `text-white` to conflict—making the *"Add more"* button text appear white-on-white after an item is selected (though users can still adjust quantities using the `+` / `-` buttons in the right-hand cart panel).

---

## 10. SCREENSHOT INVENTORY AND EXACT FILE PATHS

All screenshots were captured directly from the live running application at `2880x1920+` Retina resolution (`1440px` CSS width at `2x` DPR) with no sensitive data or developer overlays, and saved in:

`c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets`

| # | Screenshot Description | Exact File Path |
| :--- | :--- | :--- |
| 1 | **Main Dashboard** (Hero metrics, 7-day chart, best-seller banner, stock alerts, business snapshot) | `c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets\01-main-dashboard.png` |
| 2 | **Inventory Overview** (12 retail SKUs, `₦604,200` stock value, status dots, filters & search) | `c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets\02-inventory-overview.png` |
| 3 | **Add / Edit Product Interface** (Product info, supplier cost vs. selling price, stock thresholds) | `c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets\03-add-product-interface.png` |
| 4 | **Sales POS Interface** (Product selector, multi-item cart, `₦4,700` total, POS payment method) | `c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets\04-sales-interface.png` |
| 5 | **Sales History** (`₦21,000` today's sales, 21 transactions, `₦18,376` avg value, transaction log) | `c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets\05-sales-history.png` |
| 6 | **Expense Management** (`₦64,000` monthly expenses, category breakdown bars, itemized expense log) | `c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets\06-expense-management.png` |
| 7 | **Business Insights** (All-time KPIs, revenue trend, top products & margins, Margin Watch, Stock to Watch, Expense & Payment mix) | `c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets\07-business-insights.png` |
| 8 | **Landing Page & Brand Showcase** (Editorial hero, value proposition, dashboard preview mockup) | `c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets\08-landing-page-overview.png` |
| 9 | **Settings, Cloud Sync & Demo Mode** (Store profile, JSON backup/cloud migration, Demo Mode controls) | `c:\Users\HomePC\Documents\stocksabi\stocksabi-pitch-assets\09-settings-and-demo-mode.png` |

---

## 11. PRODUCT DIFFERENTIATION

Based strictly on the implemented product, STOCKSABI differentiates itself from generic spreadsheets, paper notebooks, and basic POS terminals in four concrete ways:

1. **True Unit-Economics & Net Profit Visibility (Not Just Top-Line Sales):**
   - Basic POS terminals and payment apps only tell a shopkeeper how much revenue was collected. STOCKSABI captures each item's `costPrice` alongside `sellingPrice` and snapshots that cost at the moment of sale, enabling instant calculation of **Gross Profit** (`Revenue - COGS`) and **Net Operating Profit** (`Gross Profit - Operating Expenses`).
2. **Closed-Loop Inventory Depletion & Proactive Stock Risk Valuation:**
   - Every completed sale automatically deducts units from inventory and evaluates stock levels against custom per-product thresholds—quantifying not just *which* items are low, but the exact Naira working capital tied up in stock (`Inventory Cost Value` vs. `Potential Sales Value` vs. `Potential Gross Profit`).
3. **Plain-English Financial Intelligence for Non-Accountants:**
   - Instead of balance sheets and journal entries, the `/insights` engine translates raw transactions into plain-English observations (e.g., *"Indomie Instant Noodles (Carton) generated 35% of recorded sales revenue"*, *"Golden Penny Spaghetti currently has the highest recorded gross margin at 25%"*, *"Rent accounts for 36% of recorded expenses"*).
4. **Purpose-Built for Nigerian Independent Retail Realities:**
   - Native Nigerian Naira (`₦`) formatting, local payment method tracking (`POS`, `Bank Transfer`, `Cash`), Nigerian retail expense categories (`Generator fuel / Electricity`, `Transport for market run`, `Shop rent`, `Staff allowance`), and offline-resilient browser storage.

---

## 12. BUSINESS MODEL POSSIBILITIES

> **Note:** No billing, subscription paywall, or payment processing is currently implemented in the codebase. All models below are **PROPOSED** for investor discussion.

1. **Tiered SaaS Subscription (Freemium $\rightarrow$ Pro Store):**
   - **Free / Starter Tier:** Single-device local mode, up to a fixed number of products/monthly transactions, basic daily dashboard.
   - **Pro Merchant Tier (Monthly/Annual Naira Subscription):** Cloud backup & multi-device sync, unlimited transaction history, full Business Insights & Margin Watch analytics, staff sub-accounts (`owner` / `admin` / `staff` roles already exist in the `business_members` database schema), and automated WhatsApp/SMS daily summary reports.
2. **Multi-Branch / SME Retail Tier:**
   - Centralized owner dashboard across 2–10 shop locations (leveraging the existing multi-business relational schema).
3. **Embedded Financial & Supply-Chain Services (Future Expansion):**
   - **Inventory Restock Financing / Working Capital Credit:** Using verified historical sales velocity, gross margins, and inventory turnover recorded in STOCKSABI to underwrite short-term restock loans in partnership with microfinance banks or fintech lenders.
   - **B2B Supplier Restock Marketplace:** Direct restock ordering from FMCG distributors when high-velocity SKUs trigger low-stock alerts.

---

## 13. MARKET OPPORTUNITY RESEARCH REQUIREMENTS

Because this audit does not invent external statistics, the founder or presentation writer should source and cite verified third-party figures for the following data points on the Market Opportunity slide:

- **TAM (Total Addressable Market):** Total number of MSMEs and retail/wholesale trade businesses in Nigeria (e.g., SMEDAN / NBS MSME Survey figures, where retail/wholesale trade historically represents the largest share of Nigerian MSMEs).
- **SAM (Serviceable Available Market):** Number of urban and peri-urban independent retail shops (provision stores, pharmacies/cosmetics, supermarkets, electronics, fashion) in major commercial states (Lagos, Oyo/Ibadan, Kano, Rivers, Abuja, Anambra) using smartphones or PCs.
- **SOM (Serviceable Obtainable Market):** Target number of paying retail stores achievable in Months 1–18 via direct field sales, trade association partnerships, and digital acquisition.

---

## 14. CURRENT LIMITATIONS & TECHNICAL RISKS

To ensure complete transparency during investor Q&A and technical due diligence, the following limitations were identified in the codebase:

1. **Remote Supabase Instance Currently Unreachable:**
   - The configured Supabase project (`jruzlujboiasirfqtgyq.supabase.co`) fails with `fetch failed` on network requests. While the app works seamlessly in local browser mode, cloud persistence, cross-device login, and email password resets will not function until the Supabase project is unpaused or pointed to an active instance.
2. **Hardcoded Database Credentials in Root Setup Scripts (Security Hygiene):**
   - Several root-level Node.js helper scripts (`setup_auth_db.js`, `setup_business_db.js`, `check_auth.js`, `fix_auth.js`, `seed_admin.js`, etc.) contain hardcoded database connection strings and service keys used during initial setup. **Action Required:** These scripts are not bundled into the frontend Vite build, but they must be removed or moved to environment variables before making the Git repository public or sharing repo access with investors.
3. **Non-Atomic Cloud Sale Recording:**
   - As noted in a developer comment in [`DataContext.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/lib/DataContext.tsx#L169-L173), when connected to Supabase, recording a sale performs sequential client-side inserts (`sales` $\rightarrow$ `sale_items` $\rightarrow$ `products` stock updates) rather than a single atomic PostgreSQL RPC transaction.
4. **No Automated Offline-to-Cloud Background Sync Queue:**
   - While [`migration.ts`](file:///c:/Users/HomePC/Documents/stocksabi/src/lib/migration.ts) provides a manual *"Migrate to Cloud"* button in Settings, there is no automatic background sync queue (e.g., IndexedDB + Service Worker / PWA sync) when connectivity drops and returns mid-day.
5. **Single-User UI Only (Despite Multi-Role DB Schema):**
   - Although `public.business_members` supports `owner`, `admin`, and `staff` roles in PostgreSQL, there is no UI in `/settings` to invite cashiers or restrict staff from viewing profit margins or editing stock quantities.
6. **No Barcode Scanning, Receipt Printing, or Date-Range Filtering:**
   - Sales entry relies on search-and-click; thermal/Bluetooth receipt printing, WhatsApp receipt sharing, and custom date-range filters on Dashboard/Sales/Insights are not yet implemented.

---

## 15. REALISTIC 12-MONTH PRODUCT ROADMAP

### Q1 (Months 1–3): Production Hardening & Pilot Retailer Rollout
- Restore dedicated production Supabase instance and move all database setup scripts to secure CI/CD migrations.
- Implement atomic PostgreSQL RPC functions (`complete_sale_transaction`) for cloud sales and inventory updates.
- Add Progressive Web App (PWA) installability and automatic background offline-to-cloud sync for intermittent Nigerian mobile networks.
- Add WhatsApp / SMS digital receipt sharing and thermal printer formatting on [`SaleDetailsPage.tsx`](file:///c:/Users/HomePC/Documents/stocksabi/src/features/sales/SaleDetailsPage.tsx).
- Add custom date-range filtering (Today, This Week, This Month, Custom Range) across Dashboard, Sales, Expenses, and Insights.

### Q2 (Months 4–6): Staff Controls, Supplier Tracking & Barcode Speed
- Build the **Staff & Cashier Mode** UI on top of the existing `business_members` table (`owner`, `admin`, `staff`), allowing shop owners to let cashiers record sales without exposing store-wide profit margins or allowing unlogged stock edits.
- Add stock-movement audit logs (restock history, manual adjustments, damaged goods write-offs) and an "Archived Products" restore view.
- Add smartphone camera barcode scanning for faster checkout and inventory lookup.

### Q3 (Months 7–9): Customer Credit Book ("Debtors") & Automated Alerts
- Introduce **Customer Credit / Partial Payment tracking** (a critical workflow for neighborhood Nigerian provision stores selling on partial credit).
- Integrate automated daily closing summaries and low-stock restock alerts via WhatsApp Business API / SMS.
- Launch tiered SaaS subscription billing (Paystack / Flutterwave integration).

### Q4 (Months 10–12): Multi-Branch Management & Working Capital Intelligence
- Enable multi-store switcher for merchants operating 2+ locations.
- Introduce exportable financial statements (PDF/CSV Profit & Loss and Inventory Valuation reports) for bank/microfinance loan applications.

---

## 16. INVESTOR PITCH RECOMMENDATIONS

1. **Lead with the "Revenue vs. True Profit" Hook:**
   - Every investor in African retail/fintech knows that small merchants have transaction volume but poor visibility into margins and shrinkage. Frame STOCKSABI around its core promise: *"Most tools tell Tunde he sold ₦21,000 today. STOCKSABI tells him he made ₦4,900 in gross margin, spent ₦3,500 on generator fuel, kept ₦1,400 in net profit, and needs to restock Milo 500g before tomorrow morning."*
2. **Use the Real Product Screenshots (Especially Dashboard & Insights):**
   - The editorial design system (`01-main-dashboard.png` and `07-business-insights.png`) looks noticeably more mature and cohesive than typical hackathon dashboards. Feature these screenshots prominently rather than generic stock photos.
3. **Demonstrate the 15-Second "Sale $\rightarrow$ Stock $\rightarrow$ Profit" Loop Live:**
   - If doing a live demo, start directly on the populated **Overview Dashboard** (`Tunde Provisions`), point out *Today's Sales (`₦21,000`)* and *Peak Milk 400g (`45` units)*, record a 10-second POS sale, and return to the Dashboard to show the instant revenue, profit, and stock update.

---

## 17. IMPORTANT QUESTIONS THE FOUNDER MUST ANSWER BEFORE PRESENTING

Before finalizing the slide deck, the founder must provide factual answers to the following questions:

1. **Customer Discovery & Pilot Validation:** How many retail shop owners have you interviewed or tested this prototype with? Do you have direct quotes or waitlist signups?
2. **Current Traction:** Is the product pre-launch / MVP stage, or are any pilot stores actively using it today?
3. **Pricing Strategy:** What monthly/annual Naira price point do you intend to charge Nigerian retailers (e.g., `₦3,000`–`₦10,000`/month), and how does that compare to their daily profit?
4. **Go-To-Market (GTM) Distribution:** How will you acquire your first 500 shops cost-effectively (e.g., market associations in Ibadan/Lagos, POS agent networks, wholesale market activations, social media)?
5. **Team Background:** What is the founding team's relevant experience in retail, software engineering, or Nigerian SME operations?
6. **The Ask:** How much capital are you raising (or competing for at the demo event), and how will the funds be allocated across engineering, field onboarding, and growth?

---

## FACTS WE CAN CONFIDENTLY PUT ON THE PITCH DECK

Every statement below is 100% verified by the codebase and live browser audit:

- **Functional End-to-End Web Application:** STOCKSABI is a working, responsive web application built with React 19, TypeScript, and Tailwind CSS, featuring a complete multi-tenant PostgreSQL database schema and Row-Level Security (RLS) architecture.
- **Four Connected Operational Pillars:** The platform unifies **Inventory Catalog Management**, **Point-of-Sale Transaction Recording**, **Operating Expense Tracking**, and **Automated Business Intelligence** in a single workspace.
- **Real-Time Unit Economics & Profit Calculation:** Every sale snapshots item-level purchase costs (`costPrice`) and selling prices (`sellingPrice`), automatically calculating **Daily Gross Profit**, **Daily Operating Expenses**, and **Net Operating Profit/Loss** in Nigerian Naira (`₦`).
- **Automated Stock Depletion & Risk Valuation:** Recording a sale automatically deducts sold units from inventory, flags low-stock and out-of-stock items against custom per-SKU thresholds, and calculates total capital tied up in stock (`Inventory Cost Value` vs. `Potential Sales Value` vs. `Potential Gross Profit`).
- **Rule-Based Business Intelligence Engine:** The **Business Insights** module automatically identifies top revenue-driving products, compares highest vs. lowest gross margin SKUs (*Margin Watch*), breaks down operating expense concentration (*Where Your Money Goes*), tracks customer payment preferences (`Cash`, `Transfer`, `POS`), and generates plain-English business observations (*What Stands Out*).
- **Built-In Offline Resilience & Data Portability:** The application supports full local browser operation (`localStorage`), one-click JSON data backup export, and a batch cloud migration tool.

---

## CLAIMS THAT REQUIRE FOUNDER CONFIRMATION

Do **NOT** include the following claims on the pitch deck unless the founder supplies verified evidence:

- Number of active retail merchants, pilot users, or waitlist signups.
- Monthly Recurring Revenue (MRR), Gross Merchandise Value (GMV), or transaction volume processed for real businesses.
- Partnerships with POS providers, microfinance banks, FMCG suppliers, or market associations.
- External market size statistics (TAM / SAM / SOM in Naira or USD) without citing a verified source (e.g., NBS / SMEDAN).
- Subscription pricing tiers, customer acquisition cost (CAC), or lifetime value (LTV) projections.
- Fundraising target, valuation, and use-of-proceeds breakdown.

