import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", gstin: "", city: "" });

  const load = () => api.get("/customers").then(({ data }) => data && setCustomers(data));
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await api.post("/customers", form);
    if (!error) { setShowForm(false); setForm({ name: "", email: "", phone: "", gstin: "", city: "" }); load(); }
  };

  const handleDelete = async (id) => { await api.delete(`/customers/${id}`); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Customers</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-lg bg-accent-600 text-white text-sm font-medium">
          {showForm ? "Cancel" : "Add Customer"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="p-4 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-3 gap-3" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          {[["name", "Name *"], ["email", "Email"], ["phone", "Phone"], ["gstin", "GSTIN"], ["city", "City"]].map(([k, label]) => (
            <input key={k} placeholder={label} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required={k === "name"}
              className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
          ))}
          <button type="submit" className="px-4 py-2 rounded-lg bg-accent-600 text-white text-sm">Save</button>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--card-border)" }}>
        <table className="w-full text-sm">
          <thead><tr style={{ background: "var(--bg-tertiary)" }}>
            {["Name", "Email", "Phone", "GSTIN", "City", "Actions"].map((h) => (
              <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>{c.name}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{c.email || "-"}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{c.phone || "-"}</td>
                <td className="px-4 py-3 font-mono" style={{ color: "var(--text-secondary)" }}>{c.gstin || "-"}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{c.city || "-"}</td>
                <td className="px-4 py-3"><button onClick={() => handleDelete(c.id)} className="text-xs" style={{ color: "var(--danger)" }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
