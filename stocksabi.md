Absolutely. I understand the kind of product you're trying to create.

We're not building a generic dashboard with a sidebar, a few cards, purple gradients, and an AI chatbot slapped onto it.

**We're building STOCKSABI as a serious Nigerian business software product.** It needs a distinctive visual identity, a coherent user experience, real functionality, and a technical foundation that allows us to continue developing it after the competition.

I want us to approach this as if we're a small product team preparing to launch a real startup.

That means establishing the product requirements, user journeys, application architecture, design system, database structure, and implementation plan *before we start coding.*

I've put together the foundational product specification below.

---

# STOCKSABI

### Product Requirements, Design System & MVP Engineering Blueprint

**Product:** StockSabi
**Category:** Small business management and financial intelligence
**Initial market:** Nigerian small businesses and independent retailers
**Primary platform:** Responsive web application
**MVP objective:** Deliver a functional business management application that helps merchants record sales, manage inventory, track expenses, and understand their business performance.

---

# DOCUMENT 1 — PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1.1. Product overview

### Product name

**STOCKSABI**

The name combines the concept of stock management with the Nigerian expression "sabi," meaning to know or understand.

It communicates the product's central promise: helping business owners understand their stock and their money.

### Brand tagline

**Know your stock. Understand your money.**

Alternative supporting line:

*Your business, made clear.*

### Product vision

To make business management accessible to small business owners by transforming everyday transactions into clear, actionable business information.

### The problem

Many independent retailers manage their businesses using a combination of notebooks, calculators, WhatsApp messages, and informal records.

This can make it difficult to:

* Know how much profit the business actually makes.
* Track products coming in and going out.
* Identify products that are running low.
* Monitor expenses.
* Understand which products contribute most to profits.
* Keep accurate records of sales and customer payments.

The result is limited visibility into business performance.

### The solution

StockSabi provides a simple, centralized business management application with four core capabilities:

1. Sales recording.
2. Inventory management.
3. Expense tracking.
4. Business performance reporting.

The application converts everyday business activities into a clear picture of revenue, costs, stock levels, and estimated profit.

---

## 1.2. Target users

We should begin with one specific customer segment rather than attempting to serve every kind of business.

### Primary user: Independent retail shop owner

Examples:

* Provision store owners.
* Cosmetics retailers.
* Small fashion retailers.
* Household goods sellers.
* Small electronics and accessories shops.

### User profile

| Attribute            | Description                                       |
| -------------------- | ------------------------------------------------- |
| Business size        | One shop or a small retail operation              |
| Technical experience | Basic smartphone and web application familiarity  |
| Business management  | Often managed directly by the owner               |
| Main device          | Smartphone, with desktop support                  |
| Primary need         | Understand sales, expenses, inventory, and profit |
| Financial context    | Transactions commonly recorded in Nigerian naira  |

### Core user persona

**Name:** Tunde
**Business:** Neighborhood provisions store
**Location:** Ibadan, Nigeria

Tunde sells packaged food, beverages, household essentials, and other everyday products.

He wants to know how much he earns each day, which products are selling quickly, and what stock he needs to replenish.

He does not want to spend time learning complicated accounting software.

He wants to open an application, record a sale, and immediately understand what is happening in his business.

---

## 1.3. Core value proposition

> StockSabi helps small business owners understand their business performance without needing accounting expertise.

The application should make three questions easy to answer:

1. **How much money did I make today?**
2. **What products do I need to restock?**
3. **How much profit am I actually making?**

Every major feature in the MVP should support at least one of these questions.

---

# DOCUMENT 2 — MVP FEATURE SPECIFICATION

The biggest mistake we could make is trying to build too many features.

For the competition, I recommend a narrow but genuinely functional MVP.

## 2.1. Must-have features

These are the features that define the initial product.

| Feature              | Description                                                   | Priority |
| -------------------- | ------------------------------------------------------------- | -------- |
| Business dashboard   | Shows sales, estimated profit, expenses, and inventory alerts | P0       |
| Product management   | Create, edit, and archive products                            | P0       |
| Sales recording      | Record sales and update inventory automatically               | P0       |
| Expense tracking     | Record business expenses and categorize them                  | P0       |
| Inventory tracking   | Maintain stock quantities and stock movement records          | P0       |
| Business insights    | Display useful observations based on recorded data            | P0       |
| Transaction history  | View and inspect previous sales and expenses                  | P0       |
| Responsive interface | Support mobile and desktop screens                            | P0       |

**P0 means essential for the MVP.**

## 2.2. Features to postpone

These features could be valuable later, but they should not be part of the initial 30-minute build.

* Multi-user accounts and staff permissions.
* Cloud synchronization.
* WhatsApp integration.
* Automated supplier ordering.
* Bank account integration.
* Real payment processing.
* Tax reporting.
* AI-powered forecasting.
* Multi-branch management.
* Offline synchronization across devices.
* Automated customer debt collection.

We should not pretend these features exist in the MVP.

---

# DOCUMENT 3 — USER EXPERIENCE AND APPLICATION FLOW

This is one of the most important parts of the product.

A good application should not make the user think about where to go next.

**The main workflow should revolve around a simple cycle:**

Add products → Record sales → Track expenses → Understand performance → Restock.

Let's design the application around that cycle.

## 3.1. Application route map

```text
STOCKSABI
│
├── /welcome
│   └── Product introduction
│
├── /setup
│   ├── Business name
│   ├── Business category
│   └── Initial business preferences
│
└── /app
    │
    ├── /app/dashboard
    │   ├── Business overview
    │   ├── Sales summary
    │   ├── Profit summary
    │   ├── Low-stock alerts
    │   └── Business insights
    │
    ├── /app/sales
    │   ├── Sales history
    │   ├── /app/sales/new
    │   └── /app/sales/:id
    │
    ├── /app/inventory
    │   ├── Product list
    │   ├── /app/inventory/new
    │   ├── /app/inventory/:id
    │   └── /app/inventory/:id/edit
    │
    ├── /app/expenses
    │   ├── Expense history
    │   └── /app/expenses/new
    │
    ├── /app/insights
    │   ├── Business performance
    │   ├── Product profitability
    │   └── Stock alerts
    │
    └── /app/settings
        ├── Business profile
        └── Preferences
```

This is the logical route structure.

For the actual MVP, we can simplify the route implementation and use modal dialogs for some actions.

That will reduce development time without compromising the user experience.

---

# DOCUMENT 4 — DETAILED USER JOURNEYS

## 4.1. First-time user experience

The first interaction should feel welcoming and purposeful.

### Screen 1: Welcome

The user sees:

**STOCKSABI**

*Your business, made clear.*

A short introduction explains that the application helps them track sales, inventory, expenses, and profit.

Primary button:

**Set up my business**

Secondary option:

**Explore demo business**

The demo option is particularly useful for the competition because judges can experience the application without having to enter all their business information.

### Screen 2: Business setup

The user enters:

* Business name.
* Business category.
* Currency: NGN.
* Low-stock alert threshold.

Primary button:

**Create my workspace**

### Screen 3: Initial inventory

The application offers two choices:

**Add my first product**

or

**Start with sample products**

For the competition, sample products allow the user to reach a populated dashboard quickly.

### Screen 4: Dashboard

The application opens the business overview.

The user immediately sees their sales, estimated profit, inventory status, and recent activity.

---

## 4.2. Recording a sale

This should be the most polished and reliable workflow in the application.

### Step 1: Open sales

The user selects **Record sale** from the dashboard or sales page.

### Step 2: Select products

A product selection interface appears.

Each product displays:

* Product name.
* Selling price.
* Available quantity.
* Product image or category illustration.

The user can search for a product and add it to the sale.

### Step 3: Adjust quantities

The user selects the quantity of each item.

The application calculates the subtotal automatically.

### Step 4: Confirm payment details

The user selects a payment method:

* Cash.
* Bank transfer.
* POS.
* Other.

The payment method is recorded for reporting purposes. The application does not process the payment itself.

### Step 5: Complete sale

The user presses:

**Complete sale**

The application must then:

1. Validate stock availability.
2. Save the transaction.
3. Reduce inventory quantities.
4. Record the stock movement.
5. Update the dashboard.
6. Display a sale confirmation.

These operations should succeed or fail together.

### Step 6: Confirmation

The user sees:

**Sale recorded successfully.**

The interface displays:

* Total sale amount.
* Products sold.
* Payment method.
* Estimated gross profit.

The user can return to the dashboard or record another sale.

---

## 4.3. Adding a product

The inventory workflow should be simple.

```text
Inventory
   ↓
Add product
   ↓
Enter product information
   ↓
Save product
   ↓
Product appears in inventory
```

### Product fields

| Field                  | Required |
| ---------------------- | -------- |
| Product name           | Yes      |
| Selling price          | Yes      |
| Purchase cost per unit | Yes      |
| Initial stock quantity | Yes      |
| Category               | Yes      |
| Low-stock threshold    | Optional |
| Product image          | Optional |

The purchase cost is particularly important because the application needs it to calculate estimated gross profit.

---

## 4.4. Recording an expense

```text
Expenses
   ↓
Add expense
   ↓
Enter amount and category
   ↓
Add optional description
   ↓
Save expense
   ↓
Dashboard updates
```

Example expense categories:

* Transportation.
* Rent.
* Utilities.
* Packaging.
* Other operating expenses.

The application should distinguish between gross profit and net operating profit.

For the MVP:

**Gross profit = Sales revenue − Cost of goods sold**

**Net operating profit = Gross profit − Recorded operating expenses**

These are simplified management figures, not a substitute for formal accounting statements.

---

# DOCUMENT 5 — VISUAL IDENTITY AND DESIGN SYSTEM

Now let's get to the part I know matters a lot to you.

**I do not want StockSabi to look like a generic AI-generated dashboard.**

The design needs a deliberate visual identity that feels like a real business product.

My recommendation is to give StockSabi a warm, editorial, contemporary identity inspired by modern financial publications and well-designed business software.

Not a futuristic AI interface.

Not a generic purple dashboard.

Not a wall of white cards.

Instead, we should use a restrained palette, expressive typography, strong spacing, and a few distinctive visual elements.

---

## 5.1. Brand personality

StockSabi should feel:

* Intelligent.
* Trustworthy.
* Approachable.
* Modern.
* Practical.
* Confident.

The interface should communicate financial clarity without feeling overly corporate.

### Visual direction

**"Modern Nigerian commerce meets editorial financial design."**

Think of a business journal translated into a polished digital application.

We can combine:

* Warm off-white backgrounds.
* Deep forest green.
* Muted citrus accents.
* Ink-black typography.
* Subtle paper-like textures.
* Editorial typography.
* Custom charts and product illustrations.

The goal is to create a product that feels designed rather than assembled from a generic component library.

---

## 5.2. Color palette

I recommend a palette built around forest green and warm ivory.

| Token          | Color     | Usage                                           |
| -------------- | --------- | ----------------------------------------------- |
| Primary        | `#174B3A` | Main buttons, active navigation, brand identity |
| Primary dark   | `#10372B` | Hover states, dark sections                     |
| Accent         | `#D7F36B` | Highlights, key metrics, interactive accents    |
| Background     | `#F7F5EF` | Main application background                     |
| Surface        | `#FFFFFF` | Cards and dialogs                               |
| Text primary   | `#202820` | Main text                                       |
| Text secondary | `#73796F` | Supporting text                                 |
| Border         | `#E5E4DA` | Dividers and component outlines                 |
| Success        | `#367A53` | Positive financial indicators                   |
| Warning        | `#B77826` | Low-stock warnings                              |
| Danger         | `#B74C43` | Errors and critical inventory alerts            |

### Why this palette?

The forest green communicates stability and commerce.

The warm ivory background prevents the interface from looking sterile.

The citrus accent adds personality and creates visual contrast without relying on the overused purple-and-blue AI aesthetic.

**The lime accent should be used sparingly.** It is there to highlight important information, not to dominate every screen.

---

## 5.3. Typography

Typography is where we can make the application feel distinctive.

I recommend using two typefaces.

### Primary font: Manrope

Use Manrope for:

* Body text.
* Navigation.
* Buttons.
* Form labels.
* Table content.
* Most interface elements.

It has a contemporary geometric structure and remains readable at small sizes.

### Display font: DM Serif Display

Use DM Serif Display selectively for:

* The main dashboard greeting.
* Large editorial headings.
* Empty-state messaging.
* A few important brand moments.

This combination creates a contrast between a modern software interface and an editorial visual identity.

### Typography scale

| Element                | Size | Weight |
| ---------------------- | ---: | ------ |
| Main dashboard heading | 36px | 400    |
| Section heading        | 24px | 600    |
| Card heading           | 16px | 600    |
| Body text              | 14px | 400    |
| Supporting text        | 12px | 400    |
| Primary metric         | 32px | 700    |
| Button text            | 14px | 600    |
| Small labels           | 11px | 600    |

On mobile screens, the main dashboard heading should scale down to approximately 28px.

### Typography rules

1. Avoid using too many font sizes.
2. Use serif typography only where it creates meaningful contrast.
3. Use tabular numerals for financial metrics.
4. Keep body text comfortably readable.
5. Avoid excessive uppercase labels.
6. Use consistent line heights and spacing.

The goal is a recognizable typographic identity, not decorative typography everywhere.

---

# DOCUMENT 6 — APPLICATION LAYOUT

## 6.1. Desktop layout

For desktop screens, I recommend a fixed left navigation rail and a flexible content area.

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  STOCKSABI                                      Search      │
│                                                             │
├───────────────┬─────────────────────────────────────────────┤
│               │                                             │
│  Overview     │  Good morning, Tunde.                       │
│               │  Here's how your business is doing.         │
│  Sales        │                                             │
│               │  ┌────────────┐ ┌────────────┐              │
│  Inventory    │  │ Today's    │ │ Gross      │              │
│               │  │ Sales      │ │ Profit     │              │
│  Expenses     │  └────────────┘ └────────────┘              │
│               │                                             │
│  Insights     │  ┌───────────────────────────────┐          │
│               │  │                               │          │
│               │  │       Revenue Chart           │          │
│               │  │                               │          │
│               │  └───────────────────────────────┘          │
│               │                                             │
│               │  Recent Sales      Stock Alerts             │
│               │                                             │
│  Settings     │                                             │
│               │                                             │
└───────────────┴─────────────────────────────────────────────┘
```

### Layout specifications

* Sidebar width: 232px.
* Main content maximum width: 1440px.
* Main content padding: 32px.
* Card radius: 16px.
* Input radius: 10px.
* Button radius: 10px.
* Grid gap: 20px.

We should avoid making every component a floating card.

Some sections should sit directly on the background to create visual hierarchy.

---

## 6.2. Mobile layout

The mobile experience should be designed independently rather than simply shrinking the desktop layout.

The bottom navigation should contain:

1. Home.
2. Sales.
3. Stock.
4. Expenses.
5. More.

A prominent action button should allow the user to record a sale from the main screens.

The mobile dashboard should prioritize:

* Today's sales.
* Estimated profit.
* Low-stock alerts.
* Recent transactions.

Large charts and secondary information can be moved further down the page.

---

# DOCUMENT 7 — THE DASHBOARD DESIGN

This is the screen that should make the strongest first impression.

The dashboard needs to communicate the state of the business within seconds.

## 7.1. Dashboard hierarchy

The page should follow this order:

### Section 1: Greeting and business identity

A personalized greeting:

**Good morning, Tunde.**

Supporting text:

*Here's how your business is doing today.*

A small business selector can sit beside the greeting.

### Section 2: Primary action

A prominent button:

**+ Record sale**

Secondary action:

**Add product**

The sale button should be the most visually prominent action on the screen.

### Section 3: Financial overview

Four metrics:

| Metric            | Description                       |
| ----------------- | --------------------------------- |
| Today's sales     | Total completed sales today       |
| Gross profit      | Sales minus cost of goods sold    |
| Expenses          | Operating expenses recorded today |
| Products in stock | Number of active products         |

Each metric should have a clear label, a prominent value, and a small supporting indicator where appropriate.

### Section 4: Sales performance

A custom chart showing sales over the last seven days.

The chart should use a restrained green palette with a clear tooltip and readable axis labels.

We should avoid overly decorative chart animations.

### Section 5: Inventory alerts

A section titled:

**Needs your attention**

It should show products that have reached or fallen below their low-stock thresholds.

Each alert should display:

* Product name.
* Current quantity.
* Threshold.
* Action to update stock.

### Section 6: Recent transactions

A compact list of recent sales and expenses.

### Section 7: Business insight

A visually distinctive editorial panel.

For example:

**Your best-selling product**

"Peak Milk 400g generated the highest sales revenue today."

The content must be based on actual transaction data.

If there is insufficient data, the panel should say so instead of inventing an insight.

---

# DOCUMENT 8 — INVENTORY AND SALES INTERFACE

## 8.1. Inventory screen

The inventory page should feel like a practical product catalog.

### Top section

**Your inventory**

Supporting text:

*Keep track of what you have and what needs restocking.*

Primary button:

**+ Add product**

### Product list

On desktop, use a clean table.

On mobile, use compact product cards.

Each product should display:

* Product name.
* Category.
* Selling price.
* Purchase cost.
* Available stock.
* Stock status.

### Inventory status

We need three statuses:

**In stock:** Quantity is above the low-stock threshold.

**Low stock:** Quantity is at or below the threshold but above zero.

**Out of stock:** Quantity is zero.

These statuses should be determined automatically.

---

## 8.2. Sales screen

The sales screen should prioritize transaction entry.

### Main elements

* Searchable product selector.
* Product cards or list.
* Quantity controls.
* Cart summary.
* Payment method selector.
* Complete sale button.

### Important interaction

When a user adds a product to the cart, the available stock should be checked.

If the quantity exceeds available stock, the application must prevent the sale.

The cart should calculate:

* Subtotal.
* Total quantity.
* Estimated cost of goods sold.
* Estimated gross profit.

The sale should not be completed until the user confirms it.

---

# DOCUMENT 9 — TECHNICAL ARCHITECTURE

Now we need to decide how to build this in a way that is both fast and maintainable.

My recommendation is a lightweight React application.

## 9.1. Technology stack

| Layer         | Technology                 | Purpose                                 |
| ------------- | -------------------------- | --------------------------------------- |
| Frontend      | React                      | User interface                          |
| Build tool    | Vite                       | Development server and production build |
| Language      | TypeScript                 | Type safety                             |
| Styling       | Tailwind CSS               | Utility-based styling                   |
| Routing       | React Router               | Application navigation                  |
| Icons         | Lucide React               | Consistent interface icons              |
| Charts        | Recharts                   | Financial visualizations                |
| Forms         | React Hook Form            | Form management                         |
| Validation    | Zod                        | Input validation                        |
| Persistence   | IndexedDB or local storage | Local data persistence                  |
| Backend later | Supabase                   | Authentication and cloud database       |

### Why this stack?

It allows us to build quickly without introducing unnecessary infrastructure.

React and Vite provide a straightforward development environment.

TypeScript helps reduce errors in financial calculations and data structures.

Tailwind allows us to establish a consistent design system.

For the competition prototype, we can keep the application local and avoid configuring a backend.

However, **local persistence is not a substitute for a production database.** A production version will need authentication, server-side validation, secure data storage, backups, and transaction handling.

---

# DOCUMENT 10 — PROJECT FOLDER STRUCTURE

This is the structure I recommend for the actual codebase.

It is intentionally organized around product features rather than putting everything into one enormous component.

```text
stocksabi/
│
├── public/
│   ├── images/
│   │   ├── products/
│   │   ├── illustrations/
│   │   └── brand/
│   │
│   ├── fonts/
│   │
│   └── favicon.svg
│
├── docs/
│   ├── PRD.md
│   ├── USER_FLOWS.md
│   ├── DESIGN_SYSTEM.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── DATA_MODEL.md
│   ├── ROUTES.md
│   ├── MVP_SCOPE.md
│   └── TEST_PLAN.md
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── Toast.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Topbar.tsx
│   │   │   └── PageHeader.tsx
│   │   │
│   │   └── shared/
│   │       ├── MetricCard.tsx
│   │       ├── CurrencyDisplay.tsx
│   │       ├── ProductImage.tsx
│   │       └── StatusBadge.tsx
│   │
│   ├── features/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── components/
│   │   │   │   ├── SalesOverview.tsx
│   │   │   │   ├── RevenueChart.tsx
│   │   │   │   ├── StockAlerts.tsx
│   │   │   │   ├── RecentTransactions.tsx
│   │   │   │   └── BusinessInsight.tsx
│   │   │   └── dashboard.utils.ts
│   │   │
│   │   ├── inventory/
│   │   │   ├── InventoryPage.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── ProductDetailsPage.tsx
│   │   │   ├── ProductList.tsx
│   │   │   └── inventory.service.ts
│   │   │
│   │   ├── sales/
│   │   │   ├── SalesPage.tsx
│   │   │   ├── NewSalePage.tsx
│   │   │   ├── SaleDetailsPage.tsx
│   │   │   ├── Cart.tsx
│   │   │   └── sales.service.ts
│   │   │
│   │   ├── expenses/
│   │   │   ├── ExpensesPage.tsx
│   │   │   ├── ExpenseForm.tsx
│   │   │   └── expenses.service.ts
│   │   │
│   │   ├── insights/
│   │   │   ├── InsightsPage.tsx
│   │   │   └── insights.service.ts
│   │   │
│   │   └── settings/
│   │       └── SettingsPage.tsx
│   │
│   ├── hooks/
│   │   ├── useInventory.ts
│   │   ├── useSales.ts
│   │   └── useExpenses.ts
│   │
│   ├── lib/
│   │   ├── currency.ts
│   │   ├── date.ts
│   │   ├── calculations.ts
│   │   └── storage.ts
│   │
│   ├── data/
│   │   ├── demoProducts.ts
│   │   └── demoTransactions.ts
│   │
│   ├── types/
│   │   ├── product.ts
│   │   ├── sale.ts
│   │   ├── expense.ts
│   │   └── business.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   │
│   └── main.tsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── eslint.config.js
```

### One important implementation note

This is the maintainable project structure for the product.

For a strict 30-minute build, we should initially use fewer files and split them into these modules as the application grows.

We should not waste the first 10 minutes creating empty folders.

---

# DOCUMENT 11 — DATA MODEL

A functional MVP needs a coherent data model.

The application must distinguish between products, sales, expenses, and stock movements.

## 11.1. Product

```ts
type Product = {
  id: string;
  name: string;
  category: string;
  sellingPrice: number;
  costPrice: number;
  stockQuantity: number;
  lowStockThreshold: number;
  imageUrl?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};
```

### Important rule

Prices should be stored as integer amounts in the smallest currency unit or another precisely defined monetary representation.

For a Nigerian naira application, storing whole naira amounts as integers is sufficient if the product does not support fractional naira values.

---

## 11.2. Sale

```ts
type Sale = {
  id: string;
  items: SaleItem[];
  subtotal: number;
  total: number;
  costOfGoodsSold: number;
  grossProfit: number;
  paymentMethod: "cash" | "transfer" | "pos" | "other";
  createdAt: string;
};
```

## 11.3. Sale item

```ts
type SaleItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitSellingPrice: number;
  unitCostPrice: number;
  lineTotal: number;
};
```

### Why store the price at the time of sale?

Suppose a product's purchase cost changes next week.

The previous sale should still reflect the original cost used when that transaction was recorded.

This preserves historical transaction accuracy.

---

## 11.4. Expense

```ts
type Expense = {
  id: string;
  description: string;
  category: string;
  amount: number;
  createdAt: string;
};
```

## 11.5. Stock movement

```ts
type StockMovement = {
  id: string;
  productId: string;
  type: "stock_in" | "sale" | "adjustment";
  quantity: number;
  note?: string;
  createdAt: string;
};
```

Stock movements make it possible to understand why inventory quantities changed.

For example, a product's quantity might decrease because of a sale or increase because the business received new stock.

---

# DOCUMENT 12 — BUSINESS LOGIC AND CALCULATIONS

This section is critical.

The dashboard must never display financial figures that do not correspond to the underlying data.

## 12.1. Revenue

Revenue is the sum of completed sales during the selected period.

```text
Revenue = Sum of completed sale totals
```

## 12.2. Cost of goods sold

```text
COGS = Sum of quantity sold × recorded unit cost
```

The cost must be captured at the time of the sale.

## 12.3. Gross profit

```text
Gross Profit = Revenue − COGS
```

## 12.4. Net operating profit

```text
Net Operating Profit = Gross Profit − Operating Expenses
```

This is a simplified management calculation.

It does not automatically account for every accounting adjustment, tax liability, or inventory valuation method.

## 12.5. Inventory value

For the MVP:

```text
Inventory Value = Sum of current stock quantity × unit cost price
```

This is a simplified inventory valuation based on the current recorded unit cost.

## 12.6. Low-stock logic

```text
If stockQuantity === 0:
    status = "out_of_stock"

Else if stockQuantity <= lowStockThreshold:
    status = "low_stock"

Else:
    status = "in_stock"
```

## 12.7. Financial display

All currency values should be formatted consistently.

Example:

₦185,000

The application should use the Nigerian locale for date and currency formatting.

---

# DOCUMENT 13 — STATE MANAGEMENT AND DATA PERSISTENCE

For the prototype, we need the application to preserve data when the page is refreshed.

A good initial approach is:

**React state + a small persistence layer using IndexedDB.**

Why IndexedDB?

It is better suited than local storage for structured application data and can support more complex data operations.

For a very small prototype, local storage is also acceptable if we keep the data model simple.

### Required behavior

When the user:

* Adds a product, it should persist.
* Records a sale, it should persist.
* Records an expense, it should persist.
* Refreshes the page, the data should remain.
* Updates stock, the dashboard should reflect the change.

We should also include a **Reset demo data** action in the settings area.

This is useful during judging because it lets us return the application to a known state.

---

# DOCUMENT 14 — INTERACTION AND MOTION DESIGN

The application should feel responsive and intentional.

But we need to avoid unnecessary animations.

The goal is to make interactions feel polished rather than theatrical.

## 14.1. Page transitions

Use subtle transitions when navigating between major sections.

Recommended duration:

**150–220 milliseconds.**

A slight fade or short horizontal movement is enough.

## 14.2. Buttons

Buttons should have:

* A clear hover state.
* A visible focus state.
* A pressed state.
* A disabled state.
* A loading state where appropriate.

## 14.3. Dashboard metrics

When financial values update after a sale, the numbers can transition smoothly to their new values.

The animation should be subtle and should not delay the interaction.

## 14.4. Product cards

Product cards can use a slight elevation change on hover.

Avoid excessive scaling, glowing borders, and continuous floating animations.

## 14.5. Dialogs

Dialogs should appear with:

* A short fade.
* A slight upward movement.
* A clear backdrop.
* A visible close action.

On mobile, important forms should use full-screen or bottom-sheet layouts where appropriate.

## 14.6. Loading states

We should use skeletons only when data is genuinely loading.

A local application that loads instantly should not display artificial loading animations simply to appear sophisticated.

---

# DOCUMENT 15 — IMAGERY AND VISUAL ASSETS

This is another area where I want us to be deliberate.

**We should not fill the application with random stock photos just to make it look attractive.**

StockSabi is a business management tool. Images should serve a functional purpose.

## Recommended imagery

### Product imagery

Use small, consistent product thumbnails for inventory items.

For the demo, we can include a handful of familiar products:

* Packaged milk.
* Rice.
* Bottled water.
* Biscuits.
* Cooking oil.
* Detergent.

These products make the interface feel grounded in everyday retail.

### Brand illustration

We can create a small, custom brand illustration for the welcome screen.

For example, a stylized arrangement of product boxes, a receipt, and a small green sprout.

This should be a simple, coherent illustration rather than a generic AI-generated robot or glowing brain.

### Empty states

When there are no products or transactions, use simple illustrations and helpful instructions.

Example:

**Your inventory starts here.**

"Add your first product to begin tracking your stock."

Button:

**Add your first product**

### Image style

Use a consistent visual approach:

* Soft natural lighting for product photography.
* Neutral backgrounds.
* Consistent image proportions.
* Minimal decorative imagery.
* No unnecessary gradients.

For the MVP, a small set of locally stored product images is sufficient.

---

# DOCUMENT 16 — ERROR HANDLING AND VALIDATION

A functional business application needs to handle mistakes gracefully.

## Product validation

The application should reject:

* Empty product names.
* Negative selling prices.
* Negative purchase costs.
* Negative stock quantities.
* Invalid threshold values.

## Sales validation

The application should prevent:

* Selling more stock than is available.
* Completing an empty sale.
* Recording invalid quantities.
* Completing a sale with invalid product references.

## Expense validation

The application should reject:

* Missing expense descriptions.
* Invalid amounts.
* Negative amounts.
* Missing expense categories.

## User feedback

Errors should be specific.

Instead of:

"Something went wrong."

Display:

"Only 4 units of this product are available."

This makes the application easier to use and demonstrates that its business logic is working.

---

# DOCUMENT 17 — TEST PLAN

Before the competition, we need to verify that the core workflow works from beginning to end.

## Essential test cases

| Test                           | Expected result                      |
| ------------------------------ | ------------------------------------ |
| Add a product                  | Product appears in inventory         |
| Edit a product                 | Updated information is saved         |
| Record a sale                  | Transaction is saved                 |
| Complete a sale                | Stock quantity decreases             |
| Sell more than available stock | Sale is rejected                     |
| Record an expense              | Expense appears in history           |
| Refresh the page               | Saved data remains                   |
| Reach the stock threshold      | Low-stock alert appears              |
| Sell the last available unit   | Product becomes out of stock         |
| View dashboard                 | Figures match transaction records    |
| Reset demo data                | Application returns to initial state |

### Financial accuracy test

Suppose a product costs ₦500 and sells for ₦800.

If the user sells 10 units:

```text
Revenue: ₦8,000

Cost of goods sold: ₦5,000

Gross profit: ₦3,000
```

If the business also records ₦1,000 in operating expenses:

```text
Net operating profit: ₦2,000
```

The application should calculate these figures correctly.

---

# DOCUMENT 18 — 30-MINUTE BUILD WORKFLOW

Now let's translate everything into an actual implementation strategy.

**The goal is not to finish every feature in the full specification. The goal is to deliver the smallest genuinely functional product that demonstrates the central value proposition.**

## Phase 1 — Project setup: Minutes 0–4

Set up:

* React.
* Vite.
* TypeScript.
* Tailwind CSS.
* Required dependencies.

Create the application shell and global design tokens.

At the end of this phase, the development server should be running.

## Phase 2 — Design foundation: Minutes 4–8

Implement:

* Brand typography.
* Color palette.
* Sidebar.
* Main content layout.
* Responsive navigation.
* Buttons and input components.

At the end of this phase, the application should already look like StockSabi.

## Phase 3 — Inventory and demo data: Minutes 8–14

Implement:

* Product data structure.
* Sample products.
* Inventory list.
* Add-product form.
* Product persistence.

At the end of this phase, users should be able to add and view products.

## Phase 4 — Sales functionality: Minutes 14–21

Implement:

* Product selection.
* Quantity controls.
* Sale calculations.
* Payment method selection.
* Stock validation.
* Sale completion.
* Inventory updates.

This is the most important functional milestone.

## Phase 5 — Dashboard and expenses: Minutes 21–26

Implement:

* Revenue calculations.
* Gross profit calculations.
* Expense recording.
* Inventory alerts.
* Recent transactions.
* Basic sales visualization.

At the end of this phase, the main business workflow should be functional.

## Phase 6 — Polish and testing: Minutes 26–30

Focus on:

* Fixing errors.
* Testing the sale workflow.
* Checking mobile responsiveness.
* Refining typography and spacing.
* Ensuring data persists.
* Preparing the demonstration.

**If time runs short, we should preserve the sales and inventory workflow rather than sacrificing functionality for decorative elements.**

---

# DOCUMENT 19 — THE COMPETITION DEMONSTRATION

We should design the product around a short, coherent demonstration.

The judges should see a problem, experience the solution, and understand the business opportunity.

## Proposed demo sequence

### Scene 1: The problem

Open the dashboard.

Explain that small business owners often struggle to distinguish revenue from actual profit.

### Scene 2: The product

Show the StockSabi dashboard.

Point out the sales overview, inventory alerts, and business performance metrics.

### Scene 3: The interaction

Record a sale.

Select products, adjust quantities, and complete the transaction.

### Scene 4: The result

Return to the dashboard.

Show the updated revenue, gross profit, and inventory quantities.

### Scene 5: The business opportunity

Explain how StockSabi could help retailers maintain accurate records and make more informed decisions.

The demonstration should be based on the actual functionality of the prototype.

---

# DOCUMENT 20 — WHAT MAKES THIS A REAL MVP?

We need to distinguish between a convincing prototype and a usable product.

A convincing prototype might have attractive charts and sample data.

A functional MVP must have reliable interactions and accurate calculations.

For StockSabi, I would define the MVP as complete when:

* A user can create a product.
* A user can record a sale.
* The sale updates inventory.
* The transaction is saved.
* Expenses can be recorded.
* Financial metrics are calculated from actual records.
* The dashboard updates when data changes.
* Data persists after refreshing the page.
* The application handles invalid inputs correctly.
* The interface works on mobile and desktop.

That is the minimum product I would want us to demonstrate.

---

# DOCUMENT 21 — THE FIRST VERSION WE SHOULD ACTUALLY BUILD

After considering the entire specification, I recommend narrowing the first implementation to five screens.

| Screen      | Purpose                                         |
| ----------- | ----------------------------------------------- |
| Dashboard   | Business overview and financial metrics         |
| Inventory   | View and manage products                        |
| Record Sale | Complete a sale and update stock                |
| Expenses    | Record and review business expenses             |
| Insights    | Display basic business performance observations |

We can include a lightweight onboarding flow and settings page if time permits.

The dashboard should be the visual centerpiece.

The sales interface should be the functional centerpiece.

The inventory system should be the data foundation.

---

# FINAL PRODUCT DIRECTION

Here's the direction I recommend we commit to for the initial build.

**Product:** StockSabi

**Tagline:** Know your stock. Understand your money.

**Target customer:** Independent Nigerian retail businesses.

**Primary problem:** Limited visibility into sales, inventory, expenses, and profitability.

**Core functionality:** Product management, sales recording, inventory updates, expense tracking, and financial reporting.

**Visual identity:** Forest green, warm ivory, citrus accents, Manrope, and DM Serif Display.

**Architecture:** React, TypeScript, Vite, and Tailwind CSS, with local persistence for the prototype.

**Initial business model:** A subscription-based business management platform, with pricing to be validated through customer research.

**Long-term direction:** A business management platform that helps small retailers understand their operations and make informed decisions.

---

## My recommendation for our next step

We now have the product requirements, user journeys, route map, design system, data model, and implementation plan.

**The next thing we should create is the actual implementation prompt for your AI coding assistant.**

That prompt needs to tell the coding assistant exactly what to build, what not to build, which design decisions to follow, how the files should be organized, and how to verify that the application works.

And because you're working against a 30-minute deadline, I would make the prompt prioritize getting a functioning application running immediately, then refining the visual experience without breaking the core functionality.
