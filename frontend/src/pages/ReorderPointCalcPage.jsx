import { useState } from "react";
import ShareButtons from "../components/ShareButtons";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";

const FREQUENCY_OPTIONS = [
  { label: "Daily", multiplier: 365 },
  { label: "Weekly", multiplier: 52 },
  { label: "Monthly", multiplier: 12 },
];

export default function ReorderPointCalcPage() {
  usePageTitle("Reorder Point Calculator (Advanced) — Demand & Lead Time Analysis");
  const [demand, setDemand] = useState(100);
  const [freqIdx, setFreqIdx] = useState(0);
  const [avgLeadTime, setAvgLeadTime] = useState(7);
  const [maxLeadTime, setMaxLeadTime] = useState(10);
  const [avgDailyDemand, setAvgDailyDemand] = useState(15);
  const [maxDailyDemand, setMaxDailyDemand] = useState(22);

  const freq = FREQUENCY_OPTIONS[freqIdx];
  const annualDemand = demand * freq.multiplier;
  const dailyDemand = annualDemand / 365;

  const safetyStock = Math.ceil((maxDailyDemand * maxLeadTime) - (avgDailyDemand * avgLeadTime));
  const reorderPoint = Math.ceil(avgDailyDemand * avgLeadTime + safetyStock);
  const daysOfCoverage = avgDailyDemand > 0 ? Math.round(reorderPoint / avgDailyDemand) : 0;
  const annualSafetyHolding = safetyStock * 0.25 * (annualDemand > 0 ? 1 : 0);

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Reorder Point Calculator</h1>
          <p className="tool-subtitle">
            Calculate precise reorder points using demand variability and lead time analysis — no sign-up required.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              Demand
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input className="calc-input" type="number" min="0" value={demand} onChange={(e) => setDemand(Number(e.target.value))} style={{ flex: 1 }} />
                <select className="calc-input" value={freqIdx} onChange={(e) => setFreqIdx(Number(e.target.value))} style={{ width: "auto" }}>
                  {FREQUENCY_OPTIONS.map((f, i) => (
                    <option key={f.label} value={i}>{f.label}</option>
                  ))}
                </select>
              </div>
            </label>
            <label className="calc-label">
              Average Lead Time (days)
              <input className="calc-input" type="number" min="0" value={avgLeadTime} onChange={(e) => setAvgLeadTime(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Maximum Lead Time (days)
              <input className="calc-input" type="number" min="0" value={maxLeadTime} onChange={(e) => setMaxLeadTime(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Average Daily Demand (units)
              <input className="calc-input" type="number" min="0" value={avgDailyDemand} onChange={(e) => setAvgDailyDemand(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Maximum Daily Demand (units)
              <input className="calc-input" type="number" min="0" value={maxDailyDemand} onChange={(e) => setMaxDailyDemand(Number(e.target.value))} />
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="calc-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Reorder Point</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#F0B429" }}>{reorderPoint.toLocaleString()}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>units</div>
            </div>
            <div className="calc-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Safety Stock</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{safetyStock.toLocaleString()}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>units</div>
            </div>
          </div>

          <div className="calc-card">
            <div className="calc-result">
              <div className="calc-row">
                <span>Annual Demand (est.)</span>
                <span>{Math.round(annualDemand).toLocaleString()} units</span>
              </div>
              <div className="calc-row">
                <span>Daily Demand (est.)</span>
                <span>{dailyDemand.toFixed(1)} units</span>
              </div>
              <div className="calc-row">
                <span>Days of Coverage at ROP</span>
                <span>{daysOfCoverage} days</span>
              </div>
            </div>
          </div>

          <ShareButtons path="/tools/reorder-point" text="Reorder Point Calculator — Free tool by DoAide Inventory" />

          <div className="calc-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>Want automatic reorder alerts for all your products?</p>
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
            name: "Reorder Point Calculator",
            description: "Calculate precise reorder points using demand variability and lead time analysis.",
            url: "https://inventory.doaide.com/tools/reorder-point",
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
