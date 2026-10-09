import { Link } from "react-router-dom";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";

const TOOLS = [
  { path: "/calculator", title: "Reorder Point Calculator", description: "Calculate when to reorder stock based on usage and lead time.", icon: "📦" },
  { path: "/tools/safety-stock", title: "Safety Stock Calculator", description: "Determine optimal safety stock levels to prevent stockouts.", icon: "🛡️" },
  { path: "/tools/eoq", title: "EOQ Calculator", description: "Find the economic order quantity to minimize total inventory costs.", icon: "📊" },
  { path: "/tools/stock-level", title: "Stock Level Calculator", description: "Analyze current stock position and find optimal min/max levels.", icon: "📈" },
  { path: "/tools/reorder-point", title: "Reorder Point (Advanced)", description: "Calculate reorder points with demand variability and lead time analysis.", icon: "🔄" },
  { path: "/tools/abc-analysis", title: "ABC Analysis Tool", description: "Classify inventory items by value using Pareto analysis.", icon: "🏷️" },
  { path: "/tools/inventory-turnover", title: "Inventory Turnover Calculator", description: "Measure stock efficiency with turnover ratio and GMROI.", icon: "⚡" },
  { path: "/scanner", title: "Barcode Generator", description: "Generate barcodes for your products instantly.", icon: "🔲" },
  { path: "/templates", title: "Inventory Templates", description: "Download free spreadsheet templates for inventory tracking.", icon: "📁" },
];

export default function ToolsIndexPage() {
  usePageTitle("Free Inventory Tools — No Sign-up Required");
  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Free Inventory Tools</h1>
          <p className="tool-subtitle">
            Calculate reorder points, safety stock, EOQ, ABC analysis, inventory turnover, and more — no sign-up required.
          </p>
          <div className="tools-grid">
            {TOOLS.map((t) => (
              <Link key={t.path} to={t.path} className="tool-card">
                <span className="tool-card-icon">{t.icon}</span>
                <h2 className="tool-card-title">{t.title}</h2>
                <p className="tool-card-desc">{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Inventory Tools",
            description: "Free inventory management tools — reorder point, safety stock, EOQ calculators and more.",
            url: "https://inventory.doaide.com/tools",
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
