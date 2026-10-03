import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ sku: "", name: "", unit: "PCS", selling_price: "", purchase_price: "", hsn_code: "" });

  const load = () => api.get(`/products?search=${search}`).then(({ data }) => data && setProducts(data));

  useEffect(() => { load(); }, [search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = { ...form, selling_price: form.selling_price ? Number(form.selling_price) : null, purchase_price: form.purchase_price ? Number(form.purchase_price) : null };
    const { error } = await api.post("/products", payload);
    if (!error) { setShowForm(false); setForm({ sku: "", name: "", unit: "PCS", selling_price: "", purchase_price: "", hsn_code: "" }); load(); }
  };

  const handleDelete = async (id) => { await api.delete(`/products/${id}`); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Products</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-lg bg-accent-600 text-white text-sm font-medium">
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="p-4 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-3 gap-3" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          {[["sku", "SKU *"], ["name", "Name *"], ["unit", "Unit"], ["selling_price", "Selling Price"], ["purchase_price", "Purchase Price"], ["hsn_code", "HSN Code"]].map(([k, label]) => (
            <input key={k} placeholder={label} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required={k === "sku" || k === "name"}
              className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
          ))}
          <button type="submit" className="px-4 py-2 rounded-lg bg-accent-600 text-white text-sm">Save</button>
        </form>
      )}

      <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 px-4 py-2 rounded-lg text-sm mb-4 outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />

      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--card-border)" }}>
        <table className="w-full text-sm">
          <thead><tr style={{ background: "var(--bg-tertiary)" }}>
            {["SKU", "Name", "Unit", "Purchase", "Selling", "HSN", "Actions"].map((h) => (
              <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td className="px-4 py-3 font-mono" style={{ color: "var(--text-primary)" }}>{p.sku}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>{p.name}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{p.unit}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{p.purchase_price ?? "-"}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{p.selling_price ?? "-"}</td>
                <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{p.hsn_code || "-"}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(p.id)} className="text-xs" style={{ color: "var(--danger)" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
