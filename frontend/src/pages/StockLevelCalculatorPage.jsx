import { useState } from "react";
import ShareButtons from "../components/ShareButtons";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";

export default function StockLevelCalculatorPage() {
  usePageTitle("Stock Level Calculator — Optimal Inventory Levels");
  const [currentStock, setCurrentStock] = useState(500);
  const [dailySales, setDailySales] = useState(25);
  const [leadTime, setLeadTime] = useState(7);
  const [safetyDays, setSafetyDays] = useState(3);
  const [orderQty, setOrderQty] = useState(200);

  const safetyStock = dailySales * safetyDays;
  const reorderPoint = dailySales * leadTime + safetyStock;
  const maxStock = reorderPoint + orderQty;
  const avgStock = (reorderPoint + maxStock) / 2;
  const daysOfSupply = dailySales > 0 ? Math.floor(currentStock / dailySales) : 0;
  const stockStatus = currentStock <= safetyStock ? "critical" : currentStock <= reorderPoint ? "reorder" : "healthy";
  const statusLabel = stockStatus === "critical" ? "Critical — Below Safety Stock" : stockStatus === "reorder" ? "Reorder Now" : "Healthy";
  const statusColor = stockStatus === "critical" ? "#dc2626" : stockStatus === "reorder" ? "#f59e0b" : "#10b981";

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Stock Level Calculator</h1>
          <p className="tool-subtitle">
            Analyze your current stock position and determine optimal min/max levels — no sign-up required.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              Current Stock on Hand (units)
              <input className="calc-input" type="number" min="0" value={currentStock} onChange={(e) => setCurrentStock(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Average Daily Sales (units)
              <input className="calc-input" type="number" min="0" value={dailySales} onChange={(e) => setDailySales(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Supplier Lead Time (days)
              <input className="calc-input" type="number" min="0" value={leadTime} onChange={(e) => setLeadTime(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Safety Stock Days
              <input className="calc-input" type="number" min="0" value={safetyDays} onChange={(e) => setSafetyDays(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Order Quantity (units)
              <input className="calc-input" type="number" min="0" value={orderQty} onChange={(e) => setOrderQty(Number(e.target.value))} />
            </label>
          </div>

          <div className="calc-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Stock Status</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: statusColor }}>{statusLabel}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{daysOfSupply} days of supply remaining</div>
          </div>

          <div className="calc-card">
            <div className="calc-result">
              <div className="calc-row">
                <span>Safety Stock (Min)</span>
                <span>{safetyStock.toLocaleString()} units</span>
              </div>
              <div className="calc-row calc-highlight">
                <span>Reorder Point</span>
                <span>{reorderPoint.toLocaleString()} units</span>
              </div>
              <div className="calc-row">
                <span>Maximum Stock Level</span>
                <span>{maxStock.toLocaleString()} units</span>
              </div>
              <div className="calc-row">
                <span>Average Stock Level</span>
                <span>{avgStock.toLocaleString()} units</span>
              </div>
              <div className="calc-row">
                <span>Days of Supply</span>
                <span>{daysOfSupply} days</span>
              </div>
            </div>
          </div>

          <ShareButtons path="/tools/stock-level" text="Stock Level Calculator — Free tool by DoAide Inventory" />

          <div className="calc-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>Want automatic stock level monitoring across all warehouses?</p>
            <a href="/auth" className="btn btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>Sign up free</a>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Stock Level Calculator",
            description: "Analyze current stock position and determine optimal min/max inventory levels.",
            url: "https://inventory.doaide.com/tools/stock-level",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Organization", name: "Apprend Technologies", url: "https://doaide.com" },
          }),
        }}
      />
    </div>
  );
}
