import { useState } from "react";
import ShareButtons from "../components/ShareButtons";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";

const Z_SCORES = [
  { label: "90%", z: 1.28 },
  { label: "95%", z: 1.65 },
  { label: "97.5%", z: 1.96 },
  { label: "99%", z: 2.33 },
  { label: "99.9%", z: 3.09 },
];

export default function SafetyStockPage() {
  usePageTitle("Safety Stock Calculator");
  const [avgDemand, setAvgDemand] = useState(100);
  const [demandStdDev, setDemandStdDev] = useState(20);
  const [avgLeadTime, setAvgLeadTime] = useState(5);
  const [leadTimeStdDev, setLeadTimeStdDev] = useState(1);
  const [serviceIdx, setServiceIdx] = useState(1);

  const z = Z_SCORES[serviceIdx].z;
  const safetyStock = Math.ceil(z * Math.sqrt(avgLeadTime * demandStdDev ** 2 + avgDemand ** 2 * leadTimeStdDev ** 2));
  const reorderPoint = Math.ceil(avgDemand * avgLeadTime + safetyStock);

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Safety Stock Calculator</h1>
          <p className="tool-subtitle">
            Calculate optimal safety stock levels using demand and lead time variability — no sign-up required.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              Average Daily Demand (units)
              <input className="calc-input" type="number" min="0" value={avgDemand} onChange={(e) => setAvgDemand(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Demand Std. Deviation (units/day)
              <input className="calc-input" type="number" min="0" value={demandStdDev} onChange={(e) => setDemandStdDev(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Average Lead Time (days)
              <input className="calc-input" type="number" min="0" value={avgLeadTime} onChange={(e) => setAvgLeadTime(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Lead Time Std. Deviation (days)
              <input className="calc-input" type="number" min="0" value={leadTimeStdDev} onChange={(e) => setLeadTimeStdDev(Number(e.target.value))} />
            </label>
            <label className="calc-label">
              Service Level
              <select className="calc-input" value={serviceIdx} onChange={(e) => setServiceIdx(Number(e.target.value))}>
                {Z_SCORES.map((s, i) => (
                  <option key={s.label} value={i}>{s.label} (Z = {s.z})</option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="calc-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Safety Stock</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#F0B429" }}>{safetyStock.toLocaleString()}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>units</div>
            </div>
            <div className="calc-card" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Reorder Point</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{reorderPoint.toLocaleString()}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>units</div>
            </div>
          </div>

          <ShareButtons path="/tools/safety-stock" text="Safety Stock Calculator — Free tool by DoAide Inventory" />

          <div className="calc-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>Want automatic safety stock alerts for your products?</p>
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
            name: "Safety Stock Calculator",
            description: "Calculate optimal safety stock levels using demand and lead time variability.",
            url: "https://inventory.doaide.com/tools/safety-stock",
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
