import { useState } from "react";
import ShareButtons from "../components/ShareButtons";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";

export default function EoqCalculatorPage() {
  usePageTitle("EOQ Calculator — Economic Order Quantity");
  const [annualDemand, setAnnualDemand] = useState(12000);
  const [orderCost, setOrderCost] = useState(50);
  const [holdingCost, setHoldingCost] = useState(2);
  const [unitPrice, setUnitPrice] = useState(10);

  const D = Math.max(annualDemand, 0);
  const S = Math.max(orderCost, 0);
  const H = Math.max(holdingCost, 0.01);

  const eoq = Math.ceil(Math.sqrt((2 * D * S) / H));
  const ordersPerYear = D > 0 ? Math.ceil(D / eoq) : 0;
  const totalOrderCost = ordersPerYear * S;
  const avgInventory = eoq / 2;
  const totalHoldingCost = avgInventory * H;
  const totalCost = totalOrderCost + totalHoldingCost;
  const inventoryValue = avgInventory * unitPrice;

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">EOQ Calculator</h1>
          <p className="tool-subtitle">
            Find the economic order quantity that minimizes total ordering and holding costs — no sign-up required.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              Annual Demand (units)
              <input className="calc-input" type="number" min="0" value={annualDemand} onChange={(e) => setAnnualDemand(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Cost per Order ($)
              <input className="calc-input" type="number" min="0" value={orderCost} onChange={(e) => setOrderCost(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Holding Cost per Unit/Year ($)
              <input className="calc-input" type="number" min="0" step="0.01" value={holdingCost} onChange={(e) => setHoldingCost(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Unit Price ($)
              <input className="calc-input" type="number" min="0" step="0.01" value={unitPrice} onChange={(e) => setUnitPrice(Number(e.target.value))} />
            </label>
          </div>

          <div className="calc-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Economic Order Quantity</div>
            <div style={{ fontSize: "3rem", fontWeight: 800, color: "#F0B429" }}>{eoq.toLocaleString()}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>units per order</div>
          </div>

          <div className="calc-card">
            <div className="calc-result">
              <div className="calc-row">
                <span>Orders per Year</span>
                <span>{ordersPerYear}</span>
              </div>
              <div className="calc-row">
                <span>Total Ordering Cost</span>
                <span>${totalOrderCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="calc-row">
                <span>Average Inventory</span>
                <span>{avgInventory.toLocaleString()} units</span>
              </div>
              <div className="calc-row">
                <span>Total Holding Cost</span>
                <span>${totalHoldingCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="calc-row">
                <span>Average Inventory Value</span>
                <span>${inventoryValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="calc-row calc-highlight">
                <span>Total Annual Cost</span>
                <span>${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <ShareButtons path="/tools/eoq" text="EOQ Calculator — Free tool by DoAide Inventory" />

          <div className="calc-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>Want automated EOQ suggestions for all your products?</p>
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
            name: "EOQ Calculator",
            description: "Calculate economic order quantity to minimize total inventory ordering and holding costs.",
            url: "https://inventory.doaide.com/tools/eoq",
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
