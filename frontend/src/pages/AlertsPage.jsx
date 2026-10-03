import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => { api.get("/stock/alerts").then(({ data }) => data && setAlerts(data)); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Stock Alerts</h1>
      {alerts.length === 0 ? (
        <div className="p-8 text-center rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <div className="text-4xl mb-3">&#10003;</div>
          <div className="font-medium" style={{ color: "var(--text-primary)" }}>All stock levels healthy</div>
          <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>No products are below their reorder point</div>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="p-4 rounded-xl flex items-center justify-between" style={{ background: "var(--card-bg)", border: "1px solid var(--danger)" }}>
              <div>
                <div className="font-medium" style={{ color: "var(--text-primary)" }}>{a.product_name} <span className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>({a.sku})</span></div>
                <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Warehouse: {a.warehouse_name}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold" style={{ color: "var(--danger)" }}>{a.current_quantity}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>Reorder at {a.reorder_point}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
