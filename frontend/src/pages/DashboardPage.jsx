import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/reports/dashboard").then(({ data }) => setStats(data));
  }, []);

  if (!stats) return <div style={{ color: "var(--text-muted)" }}>Loading...</div>;

  const cards = [
    { label: "Total Products", value: stats.total_products, color: "bg-accent-600" },
    { label: "Low Stock Items", value: stats.low_stock_count, color: "bg-yellow-500" },
    { label: "Purchase Orders", value: stats.total_purchase_orders, color: "bg-blue-500" },
    { label: "Sales Orders", value: stats.total_sales_orders, color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="p-6 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <div className={`w-10 h-10 rounded-lg ${c.color} flex items-center justify-center text-white font-bold mb-3`}>{c.value}</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{c.label}</div>
            <div className="text-2xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
