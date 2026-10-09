import { useState } from "react";
import { Link } from "react-router-dom";
import { copyToClipboard, fullUrl } from "../lib/share";

const DOAIDE_PRODUCTS = [
  { name: "Proposals", url: "https://proposals.doaide.com" },
  { name: "Scheduler", url: "https://scheduler.doaide.com" },
  { name: "Payroll", url: "https://payroll.doaide.com" },
  { name: "Inventory", url: "https://inventory.doaide.com" },
  { name: "Support", url: "https://support.doaide.com" },
  { name: "Analytics", url: "https://analytics-app.doaide.com" },
  { name: "GST", url: "https://gst.doaide.com" },
  { name: "Desk", url: "https://desk.doaide.com" },
  { name: "Jobs", url: "https://job.doaide.com" },
  { name: "409A", url: "https://409a.doaide.com" },
  { name: "Pulse", url: "https://pulse.doaide.com" },
  { name: "Med", url: "https://med.doaide.com" },
  { name: "Realty", url: "https://realty.doaide.com" },
  { name: "Reach", url: "https://reach.doaide.com" },
  { name: "Trade", url: "https://trade.doaide.com" },
];

function RobotFace({ size = 32, color = "#F0B429" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <line x1="16" y1="6" x2="16" y2="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="1.5" r="1.5" fill={color} />
      <rect x="5" y="6" width="22" height="17" rx="5" fill={color} />
      <ellipse cx="11" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <ellipse cx="21" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <circle cx="11.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <circle cx="21.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <path d="M12 19Q16 22 20 19" stroke="#0A0A0B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <rect x="1" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
      <rect x="27" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
    </svg>
  );
}

const FEATURES = [
  {
    title: "Product Catalog",
    desc: "SKU management, HSN codes, categories, images, and barcode generation for every product in your inventory.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
    ),
  },
  {
    title: "Real-Time Stock Tracking",
    desc: "Live stock levels across multiple warehouses with configurable min/max thresholds and auto-updates.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
    ),
  },
  {
    title: "Purchase Orders",
    desc: "Create POs, track supplier deliveries, and auto-update stock on receipt. Full supplier management built in.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
    ),
  },
  {
    title: "Sales Orders",
    desc: "Process customer orders, auto-deduct stock, and track fulfillment status from quote to delivery.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
    ),
  },
  {
    title: "Barcode & QR Codes",
    desc: "Generate and print barcodes for products. Scan to look up or update stock levels instantly.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><line x1="14" y1="14" x2="14" y2="14.01" /><line x1="21" y1="14" x2="21" y2="14.01" /><line x1="14" y1="21" x2="14" y2="21.01" /><line x1="21" y1="21" x2="21" y2="21.01" /><line x1="17.5" y1="14" x2="17.5" y2="14.01" /><line x1="14" y1="17.5" x2="14" y2="17.51" /><line x1="21" y1="17.5" x2="21" y2="17.51" /><line x1="17.5" y1="21" x2="17.5" y2="21.01" /><line x1="17.5" y1="17.5" x2="17.5" y2="17.51" /></svg>
    ),
  },
  {
    title: "Smart Alerts",
    desc: "Automatic low-stock alerts, reorder point reminders, and expiry date notifications. Never miss a stockout.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
    ),
  },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Add your products", desc: "Enter product details with SKUs, categories, and pricing. Import from Excel or add manually. Set up warehouses." },
  { step: "2", title: "Track stock in real-time", desc: "Monitor stock levels as orders come and go. Purchase orders increase stock, sales orders decrease it — all automatic." },
  { step: "3", title: "Get alerts & reorder", desc: "Receive low-stock alerts before you run out. Create purchase orders with one click to restock from suppliers." },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    desc: "For small businesses getting started",
    features: ["50 products", "1 warehouse", "Basic reports", "Email support"],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month",
    desc: "For growing operations",
    features: ["500 products", "Multi-warehouse", "Barcode printing", "Purchase orders", "Sales orders", "Priority support"],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$39",
    period: "/month",
    desc: "For large-scale inventory",
    features: ["Unlimited products", "Everything in Pro", "API access", "Custom reports", "Integrations", "Dedicated support"],
    cta: "Contact Sales",
  },
];

const TESTIMONIALS = [
  { name: "Vikram S.", role: "Retail Owner", quote: "We went from Excel spreadsheets to real-time inventory tracking overnight. Never running out of stock again." },
  { name: "Lisa C.", role: "Operations Manager", quote: "The purchase order system and auto-stock updates saved us 10 hours a week in manual data entry." },
  { name: "Deepak R.", role: "Wholesaler", quote: "Low-stock alerts prevented us from losing ₹5 lakhs in missed sales last quarter. Worth every rupee." },
];

const FAQ_ITEMS = [
  { q: "Can I track inventory across multiple warehouses?", a: "Yes. Pro and Enterprise plans support multiple warehouses with real-time stock sync across all locations." },
  { q: "Does it support HSN codes?", a: "Yes. Indian businesses can add HSN codes to products for GST compliance and reporting. Useful for tax filing and audits." },
  { q: "Can I generate barcodes?", a: "Yes. Generate and print barcode labels for your products. Scan them to look up product details or update stock levels instantly." },
  { q: "Is there a free plan?", a: "Yes. The Free plan supports up to 50 products in 1 warehouse with basic reports. No credit card required to get started." },
  { q: "Can I create purchase and sales orders?", a: "Yes. Pro plans include full purchase order management with supplier tracking and sales order processing with fulfillment tracking." },
  { q: "Does it integrate with accounting software?", a: "Enterprise plans include API access for integration with accounting tools, e-commerce platforms, and other business software." },
];

const FREE_TOOLS = [
  { path: "/calculator", title: "Reorder Point Calculator", desc: "Calculate when to reorder stock based on usage, lead time, and safety stock." },
  { path: "/tools/abc-analysis", title: "ABC Analysis Tool", desc: "Classify inventory by value using Pareto analysis. Prioritize high-value items." },
  { path: "/tools/inventory-turnover", title: "Inventory Turnover Calculator", desc: "Measure stock efficiency with turnover ratio, DSI, and GMROI." },
  { path: "/scanner", title: "Barcode & QR Generator", desc: "Generate barcodes and QR codes for your products. Download as SVG." },
  { path: "/tools/stock-level", title: "Stock Level Calculator", desc: "Analyze current stock and find optimal min/max inventory levels." },
  { path: "/templates", title: "Inventory Templates", desc: "Free spreadsheet templates for warehouse, retail, restaurant, and more." },
];

function ReferralBanner() {
  const [copied, setCopied] = useState(false);
  return (
    <section className="landing-referral">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Share & Help Others</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Know someone who manages inventory? Share DoAide Inventory with them.</p>
        <button
          onClick={async () => {
            const ok = await copyToClipboard(fullUrl("/"));
            if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
          }}
          className="px-6 py-2.5 bg-[#F0B429] text-[#0A0A0B] font-semibold rounded-lg hover:bg-[#D4A017] transition-colors"
        >
          {copied ? "Link Copied!" : "Copy Share Link"}
        </button>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="py-20 px-4 sm:px-6" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <dt>
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  aria-expanded={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  {item.q}
                  <span className="ml-4 text-[#F0B429] text-xl flex-shrink-0">{openIndex === i ? "−" : "+"}</span>
                </button>
              </dt>
              {openIndex === i && (
                <dd className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">{item.a}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0B]">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <a href="https://doaide.com" className="flex items-center gap-2.5 no-underline">
          <RobotFace size={28} color="#F0B429" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            DoAide <span className="text-[#F0B429]">Inventory</span>
          </span>
        </a>
        <nav className="flex items-center gap-4">
          <Link to="/pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors no-underline">
            Pricing
          </Link>
          <Link to="/auth" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors no-underline">
            Login
          </Link>
          <Link to="/auth" className="px-4 py-2 bg-[#F0B429] text-[#0A0A0B] text-sm font-semibold rounded-lg hover:bg-[#D4A017] transition-colors no-underline">
            Get Started
          </Link>
        </nav>
      </header>

      <main>
        <section className="py-20 sm:py-28 px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Inventory Management,{" "}
            <span className="text-[#F0B429]">Made Simple</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Track products, manage stock across warehouses, handle purchase and
            sales orders, and get real-time alerts. Built for growing businesses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth" className="px-8 py-3.5 bg-[#F0B429] text-[#0A0A0B] text-lg font-semibold rounded-lg hover:bg-[#D4A017] transition-colors no-underline">
              Start Free
            </Link>
            <Link to="/pricing" className="px-8 py-3.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors no-underline">
              View Pricing
            </Link>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-[#111113]" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto">
            <h2 id="features-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
              Everything You Need to Manage Inventory
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-14 max-w-xl mx-auto">
              From product catalog to smart alerts, DoAide Inventory keeps your stock organized and your business running.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((f) => (
                <div key={f.title} className="p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0A0A0B] hover:border-[#F0B429]/30 transition-colors">
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6" aria-labelledby="how-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="how-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-14">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F0B429] text-[#0A0A0B] text-xl font-bold flex items-center justify-center mx-auto mb-4">{s.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-[#111113]" aria-labelledby="pricing-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="pricing-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-14">Start free with up to 50 products. Scale as you grow.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {PLANS.map((plan) => (
                <div key={plan.name} className={`p-8 rounded-xl border ${plan.featured ? "border-[#F0B429] ring-2 ring-[#F0B429]/20" : "border-gray-200 dark:border-gray-700"} bg-white dark:bg-[#0A0A0B]`}>
                  {plan.featured && <span className="text-xs font-semibold text-[#F0B429] uppercase tracking-wide">Most Popular</span>}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">{plan.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{plan.desc}</p>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4 text-[#F0B429] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth" className={`block w-full text-center py-3 rounded-lg font-semibold text-sm transition-colors no-underline ${plan.featured ? "bg-[#F0B429] text-[#0A0A0B] hover:bg-[#D4A017]" : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6" aria-labelledby="testimonials-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="testimonials-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-14">Trusted by Businesses Worldwide</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.name} className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111113]">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <footer>
                    <strong className="text-gray-900 dark:text-white">{t.name}</strong>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">{t.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-[#111113]" aria-labelledby="tools-heading">
          <div className="max-w-5xl mx-auto">
            <h2 id="tools-heading" className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Free Inventory Tools</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-14">No sign-up required. Use these tools right now, completely free.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {FREE_TOOLS.map((t) => (
                <Link key={t.path} to={t.path} className="landing-tool-card">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.desc}</p>
                  <span className="text-[#F0B429] text-sm font-medium mt-3 inline-block">Try it free &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FaqSection />

        <ReferralBanner />

        <section className="py-20 px-4 sm:px-6 text-center bg-gray-50 dark:bg-[#111113]">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Take Control of Your Inventory?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">Start tracking inventory today. Free forever for up to 50 products. No credit card required.</p>
          <Link to="/auth" className="inline-block px-8 py-3.5 bg-[#F0B429] text-[#0A0A0B] text-lg font-semibold rounded-lg hover:bg-[#D4A017] transition-colors no-underline">
            Get Started Free
          </Link>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Free Tools</h4>
              <div className="space-y-2 text-sm">
                <Link to="/calculator" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">Reorder Calculator</Link>
                <Link to="/tools/abc-analysis" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">ABC Analysis</Link>
                <Link to="/tools/inventory-turnover" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">Turnover Calculator</Link>
                <Link to="/scanner" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">Barcode Generator</Link>
                <Link to="/tools" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">All Free Tools</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Product</h4>
              <div className="space-y-2 text-sm">
                <Link to="/pricing" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">Pricing</Link>
                <a href="#features-heading" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline" onClick={(e) => { e.preventDefault(); document.getElementById("features-heading")?.scrollIntoView({ behavior: "smooth" }); }}>Features</a>
                <a href="#faq-heading" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline" onClick={(e) => { e.preventDefault(); document.getElementById("faq-heading")?.scrollIntoView({ behavior: "smooth" }); }}>FAQ</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Resources</h4>
              <div className="space-y-2 text-sm">
                <Link to="/blog" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">Blog</Link>
                <Link to="/blog/reorder-point-formula-explained" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">Reorder Point Guide</Link>
                <Link to="/blog/abc-analysis-inventory-management" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">ABC Analysis Guide</Link>
                <Link to="/blog/inventory-turnover-ratio-guide" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">Turnover Ratio Guide</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="https://doaide.com" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">About DoAide</a>
                <a href="mailto:support@doaide.com" className="block text-gray-500 dark:text-gray-400 hover:text-[#F0B429] no-underline">Contact</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
            <a href="https://doaide.com" className="flex items-center gap-2 no-underline">
              <RobotFace size={16} color="#F0B429" />
              <span className="text-sm text-gray-500 dark:text-gray-400">doaide.com</span>
            </a>
            <span className="text-sm text-gray-400 dark:text-gray-500">&copy; {new Date().getFullYear()} DoAide. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
