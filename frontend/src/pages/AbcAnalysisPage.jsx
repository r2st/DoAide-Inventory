import { useState } from "react";
import ShareButtons from "../components/ShareButtons";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";

function parseItems(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/[,\t]+/);
      if (parts.length < 3) return null;
      const name = parts[0].trim();
      const qty = parseFloat(parts[1]);
      const cost = parseFloat(parts[2]);
      if (!name || !Number.isFinite(qty) || !Number.isFinite(cost) || qty < 0 || cost < 0) return null;
      return { name, qty, cost, value: qty * cost };
    })
    .filter(Boolean);
}

function classify(items, aThreshold, bThreshold) {
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const totalValue = sorted.reduce((s, i) => s + i.value, 0);
  let cumulative = 0;
  return sorted.map((item) => {
    cumulative += item.value;
    const pct = totalValue > 0 ? (cumulative / totalValue) * 100 : 0;
    const category = pct <= aThreshold ? "A" : pct <= aThreshold + bThreshold ? "B" : "C";
    return { ...item, cumulativePct: pct, category };
  });
}

const SAMPLE_DATA = `Widget Alpha,500,12.50
Widget Beta,200,45.00
Widget Gamma,1500,2.00
Widget Delta,50,150.00
Widget Epsilon,3000,0.75
Widget Zeta,100,30.00
Widget Eta,800,5.00
Widget Theta,25,200.00
Widget Iota,2000,1.50
Widget Kappa,150,20.00`;

export default function AbcAnalysisPage() {
  usePageTitle("ABC Analysis Tool — Inventory Classification");
  const [input, setInput] = useState(SAMPLE_DATA);
  const [aThreshold, setAThreshold] = useState(80);
  const [bThreshold, setBThreshold] = useState(15);

  const items = parseItems(input);
  const results = classify(items, aThreshold, bThreshold);

  const summary = { A: { count: 0, value: 0 }, B: { count: 0, value: 0 }, C: { count: 0, value: 0 } };
  const totalValue = results.reduce((s, r) => s + r.value, 0);
  results.forEach((r) => { summary[r.category].count++; summary[r.category].value += r.value; });

  const categoryColor = { A: "#dc2626", B: "#f59e0b", C: "#10b981" };

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">ABC Analysis Tool</h1>
          <p className="tool-subtitle">
            Classify inventory items by value using Pareto analysis. Paste your data below — no sign-up required.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              Items (Name, Quantity, Unit Cost — one per line)
              <textarea
                className="calc-input"
                rows={8}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Widget Alpha,500,12.50"
                style={{ fontFamily: "monospace", fontSize: "0.85rem", resize: "vertical" }}
              />
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label className="calc-label" style={{ flex: 1 }}>
                A Threshold (%)
                <input className="calc-input" type="number" min="0" max="100" value={aThreshold} onChange={(e) => setAThreshold(Number(e.target.value))} />
              </label>
              <label className="calc-label" style={{ flex: 1 }}>
                B Threshold (%)
                <input className="calc-input" type="number" min="0" max="100" value={bThreshold} onChange={(e) => setBThreshold(Number(e.target.value))} />
              </label>
            </div>
          </div>

          {results.length > 0 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                {["A", "B", "C"].map((cat) => (
                  <div key={cat} className="calc-card" style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: categoryColor[cat] }}>Class {cat}</div>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                      {summary[cat].count} items ({totalValue > 0 ? ((summary[cat].value / totalValue) * 100).toFixed(1) : 0}%)
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      ${summary[cat].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="calc-card" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                      <th style={{ textAlign: "left", padding: "0.5rem", color: "var(--text-muted)" }}>Item</th>
                      <th style={{ textAlign: "right", padding: "0.5rem", color: "var(--text-muted)" }}>Qty</th>
                      <th style={{ textAlign: "right", padding: "0.5rem", color: "var(--text-muted)" }}>Unit Cost</th>
                      <th style={{ textAlign: "right", padding: "0.5rem", color: "var(--text-muted)" }}>Total Value</th>
                      <th style={{ textAlign: "right", padding: "0.5rem", color: "var(--text-muted)" }}>Cum %</th>
                      <th style={{ textAlign: "center", padding: "0.5rem", color: "var(--text-muted)" }}>Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "0.5rem", color: "var(--text-primary)" }}>{r.name}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", color: "var(--text-secondary)" }}>{r.qty.toLocaleString()}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", color: "var(--text-secondary)" }}>${r.cost.toFixed(2)}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", color: "var(--text-primary)", fontWeight: 600 }}>${r.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", color: "var(--text-secondary)" }}>{r.cumulativePct.toFixed(1)}%</td>
                        <td style={{ textAlign: "center", padding: "0.5rem", fontWeight: 700, color: categoryColor[r.category] }}>{r.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <ShareButtons path="/tools/abc-analysis" text="ABC Analysis Tool — Free inventory classification by DoAide Inventory" />

          <div className="calc-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>Want automatic ABC classification for your entire product catalog?</p>
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
            name: "ABC Analysis Tool",
            description: "Classify inventory items into A, B, C categories by value using Pareto analysis.",
            url: "https://inventory.doaide.com/tools/abc-analysis",
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
