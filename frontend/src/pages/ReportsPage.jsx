import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function ReportsPage() {
  const [report, setReport] = useState(null);
  const [tab, setTab] = useState("value");

  useEffect(() => {
    api.get(tab === "value" ? "/reports/stock-value" : "/reports/stock-movement").then(({ data }) => setReport(data));
  }, [tab]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Reports</h1>

      <div className="flex gap-2 mb-6">
        {[["value", "Stock Value"], ["movement", "Stock Movement"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === key ? "bg-accent-600 text-white" : ""}`}
            style={tab === key ? {} : { background: "var(--bg-tertiary)", color: "var(--text-secondary)" }}>
            {label}
          </button>
        ))}
      </div>

      {!report ? <div style={{ color: "var(--text-muted)" }}>Loading...</div> : tab === "value" ? (
        <div>
          <div className="flex gap-4 mb-4">
            <div className="p-4 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Total Cost Value</div>
              <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{report.total_cost_value?.toFixed(2)}</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Total Retail Value</div>
              <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{report.total_retail_value?.toFixed(2)}</div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--card-border)" }}>
            <table className="w-full text-sm">
              <thead><tr style={{ background: "var(--bg-tertiary)" }}>
                {["SKU", "Name", "Qty", "Cost Value", "Retail Value"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {report.items?.map((i) => (
                  <tr key={i.product_id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-4 py-3 font-mono" style={{ color: "var(--text-primary)" }}>{i.sku}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>{i.name}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>{i.quantity}</td>
                    <td className="px-4 py-3 font-mono" style={{ color: "var(--text-secondary)" }}>{i.cost_value?.toFixed(2)}</td>
                    <td className="px-4 py-3 font-mono" style={{ color: "var(--text-secondary)" }}>{i.retail_value?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--card-border)" }}>
          <table className="w-full text-sm">
            <thead><tr style={{ background: "var(--bg-tertiary)" }}>
              {["Product ID", "Movements"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {report.items?.map((i) => (
                <tr key={i.product_id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>{i.product_id}</td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{JSON.stringify(i.movements)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
