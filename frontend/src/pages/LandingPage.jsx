import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center text-white font-bold">I</div>
          <span className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>DoAide Inventory</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/pricing" className="text-sm" style={{ color: "var(--text-secondary)" }}>Pricing</Link>
          <Link to="/auth" className="px-4 py-2 rounded-lg bg-accent-600 text-white text-sm font-medium">Sign in</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          Inventory Management <br />
          <span className="text-accent-600">Made Simple for Indian SMBs</span>
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
          Track products, manage stock levels across warehouses, handle purchase and sales orders, generate barcodes, and get real-time low stock alerts.
        </p>
        <Link to="/auth" className="inline-block px-8 py-3 rounded-lg bg-accent-600 text-white font-medium text-lg hover:bg-accent-700 transition-colors">
          Get Started Free
        </Link>

        <div className="grid md:grid-cols-3 gap-6 mt-20 text-left">
          {[
            { title: "Product Catalog", desc: "SKU management, HSN codes, categories, barcode generation" },
            { title: "Stock Tracking", desc: "Real-time stock levels, multi-warehouse, min/max alerts" },
            { title: "Orders", desc: "Purchase orders from suppliers, sales orders to customers" },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
