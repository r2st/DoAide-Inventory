import { useState } from "react";
import ShareButtons from "../components/ShareButtons";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";

export default function InventoryTurnoverPage() {
  usePageTitle("Inventory Turnover Calculator — Measure Stock Efficiency");
  const [cogs, setCogs] = useState(500000);
  const [beginningInventory, setBeginningInventory] = useState(80000);
  const [endingInventory, setEndingInventory] = useState(60000);
  const [revenue, setRevenue] = useState(750000);

  const avgInventory = (beginningInventory + endingInventory) / 2;
  const turnoverRatio = avgInventory > 0 ? cogs / avgInventory : 0;
  const daysOnHand = turnoverRatio > 0 ? Math.round(365 / turnoverRatio) : 0;
  const grossMargin = revenue > 0 ? ((revenue - cogs) / revenue * 100) : 0;
  const gmroi = avgInventory > 0 ? ((revenue - cogs) / avgInventory) : 0;

  let rating, ratingColor;
  if (turnoverRatio >= 8) { rating = "Excellent"; ratingColor = "#10b981"; }
  else if (turnoverRatio >= 5) { rating = "Good"; ratingColor = "#F0B429"; }
  else if (turnoverRatio >= 2) { rating = "Average"; ratingColor = "#f59e0b"; }
  else { rating = "Low — Review needed"; ratingColor = "#dc2626"; }

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Inventory Turnover Calculator</h1>
          <p className="tool-subtitle">
            Measure how efficiently you sell through inventory. Calculate turnover ratio, days on hand, and GMROI — no sign-up required.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              Cost of Goods Sold ($)
              <input className="calc-input" type="number" min="0" value={cogs} onChange={(e) => setCogs(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Beginning Inventory Value ($)
              <input className="calc-input" type="number" min="0" value={beginningInventory} onChange={(e) => setBeginningInventory(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Ending Inventory Value ($)
              <input className="calc-input" type="number" min="0" value={endingInventory} onChange={(e) => setEndingInventory(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Total Revenue ($)
              <input className="calc-input" type="number" min="0" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} />
            </label>
          </div>

          <div className="calc-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Inventory Turnover Ratio</div>
            <div style={{ fontSize: "3rem", fontWeight: 800, color: "#F0B429" }}>{turnoverRatio.toFixed(1)}x</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: ratingColor }}>{rating}</div>
          </div>

          <div className="calc-card">
            <div className="calc-result">
              <div className="calc-row">
                <span>Average Inventory</span>
                <span>${avgInventory.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="calc-row calc-highlight">
                <span>Days Sales of Inventory</span>
                <span>{daysOnHand} days</span>
              </div>
              <div className="calc-row">
                <span>Gross Margin</span>
                <span>{grossMargin.toFixed(1)}%</span>
              </div>
              <div className="calc-row">
                <span>GMROI</span>
                <span>{gmroi.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <section className="tool-info">
            <h2>Understanding the Results</h2>
            <ul>
              <li><strong>Turnover Ratio</strong> — How many times you sell through your average inventory per year. Higher is generally better.</li>
              <li><strong>Days Sales of Inventory</strong> — How many days it takes to sell through average inventory. Lower means faster selling.</li>
              <li><strong>GMROI</strong> — Gross Margin Return on Investment. Shows how much gross profit you earn per dollar of inventory. Above 1.0 means profit.</li>
            </ul>
          </section>

          <ShareButtons path="/tools/inventory-turnover" text="Inventory Turnover Calculator — Free tool by DoAide Inventory" />

          <div className="calc-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>Want turnover reports for every product and category?</p>
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
            name: "Inventory Turnover Calculator",
            description: "Calculate inventory turnover ratio, days on hand, and GMROI to measure stock efficiency.",
            url: "https://inventory.doaide.com/tools/inventory-turnover",
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
