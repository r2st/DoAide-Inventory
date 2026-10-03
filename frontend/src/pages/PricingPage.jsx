import { Link } from "react-router-dom";

const PLANS = [
  { name: "Free", price: "0", features: ["Up to 50 products", "1 warehouse", "Basic reports", "Email support"] },
  { name: "Starter", price: "999", features: ["Up to 500 products", "3 warehouses", "Purchase & Sales orders", "Stock alerts", "Barcode generation"] },
  { name: "Pro", price: "2,499", features: ["Unlimited products", "Unlimited warehouses", "Advanced reports", "Priority support", "API access", "Multi-user"] },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center text-white font-bold">I</div>
          <span className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>DoAide Inventory</span>
        </Link>
        <Link to="/auth" className="px-4 py-2 rounded-lg bg-accent-600 text-white text-sm font-medium">Sign in</Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-center mb-2" style={{ color: "var(--text-primary)" }}>Simple, Transparent Pricing</h1>
        <p className="text-center mb-12" style={{ color: "var(--text-secondary)" }}>Start free, upgrade when you need more</p>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div key={plan.name} className={`p-6 rounded-xl ${i === 2 ? "ring-2 ring-accent-600" : ""}`}
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>{plan.price}</span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="text-accent-600">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth" className={`block text-center py-2 rounded-lg text-sm font-medium ${i === 2 ? "bg-accent-600 text-white" : ""}`}
                style={i === 2 ? {} : { border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
