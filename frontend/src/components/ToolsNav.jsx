import { Link, useLocation } from "react-router-dom";

const TOOLS = [
  { path: "/calculator", label: "Reorder Calculator" },
  { path: "/scanner", label: "Barcode Generator" },
  { path: "/templates", label: "Templates" },
];

export default function ToolsNav() {
  const { pathname } = useLocation();
  return (
    <nav className="tools-nav">
      <Link to="/" className="tools-nav-brand">DoAide Inventory</Link>
      <div className="tools-nav-links">
        {TOOLS.map((t) => (
          <Link key={t.path} to={t.path} className={`tools-nav-link${pathname === t.path ? " active" : ""}`}>
            {t.label}
          </Link>
        ))}
      </div>
      <Link to="/auth" className="tools-nav-cta">Sign up free</Link>
    </nav>
  );
}
