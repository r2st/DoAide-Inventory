import { useEffect, useState } from "react";
import { api } from "../lib/api";

const STATUS_COLORS = {
  draft: "bg-gray-500",
  ordered: "bg-blue-500",
  partial: "bg-yellow-500",
  received: "bg-green-500",
  cancelled: "bg-red-500",
};

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => { api.get("/purchase-orders").then(({ data }) => data && setOrders(data)); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Purchase Orders</h1>
      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--card-border)" }}>
        <table className="w-full text-sm">
          <thead><tr style={{ background: "var(--bg-tertiary)" }}>
            {["Order #", "Supplier", "Status", "Total", "Items"].map((h) => (
              <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td className="px-4 py-3 font-mono" style={{ color: "var(--text-primary)" }}>{o.order_number}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>{o.supplier_id}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs text-white ${STATUS_COLORS[o.status] || "bg-gray-500"}`}>{o.status}</span>
                </td>
                <td className="px-4 py-3 font-mono" style={{ color: "var(--text-primary)" }}>{o.total_amount?.toFixed(2)}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{o.items?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
