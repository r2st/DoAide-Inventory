import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function StockPage() {
  const [stock, setStock] = useState([]);

  useEffect(() => { api.get("/stock").then(({ data }) => data && setStock(data)); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Stock Levels</h1>
      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--card-border)" }}>
        <table className="w-full text-sm">
          <thead><tr style={{ background: "var(--bg-tertiary)" }}>
            {["Product ID", "Warehouse ID", "Quantity", "Min", "Max", "Reorder Point"].map((h) => (
              <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {stock.map((s) => (
              <tr key={s.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>{s.product_id}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>{s.warehouse_id}</td>
                <td className="px-4 py-3 font-mono" style={{ color: s.quantity <= s.reorder_point ? "var(--danger)" : "var(--text-primary)" }}>{s.quantity}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{s.min_level}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{s.max_level}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{s.reorder_point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
