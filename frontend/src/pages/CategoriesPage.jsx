import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  const load = () => api.get("/categories").then(({ data }) => data && setCategories(data));
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await api.post("/categories", form);
    if (!error) { setShowForm(false); setForm({ name: "", description: "" }); load(); }
  };

  const handleDelete = async (id) => { await api.delete(`/categories/${id}`); load(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Categories</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-lg bg-accent-600 text-white text-sm font-medium">
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-3" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <input placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
          <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
          <button type="submit" className="px-4 py-2 rounded-lg bg-accent-600 text-white text-sm">Save</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="p-4 rounded-xl flex justify-between items-start" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <div>
              <div className="font-medium" style={{ color: "var(--text-primary)" }}>{c.name}</div>
              <div className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{c.description || "No description"}</div>
            </div>
            <button onClick={() => handleDelete(c.id)} className="text-xs" style={{ color: "var(--danger)" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
