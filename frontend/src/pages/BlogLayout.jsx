import { Link, Outlet } from "react-router-dom";

const ARTICLES = [
  {
    slug: "reorder-point-formula-explained",
    title: "Reorder Point Formula Explained — Never Run Out of Stock",
    description: "Learn how to calculate reorder points with safety stock. Includes the ROP formula, examples, and tips for setting optimal levels.",
  },
  {
    slug: "barcode-systems-small-business",
    title: "Barcode Systems for Small Businesses — A Complete Guide",
    description: "Everything you need to know about implementing barcode tracking. Choosing barcode types, printing labels, and scanning hardware.",
  },
  {
    slug: "inventory-management-methods-compared",
    title: "FIFO, LIFO, and Weighted Average — Inventory Methods Compared",
    description: "Compare inventory valuation methods. Learn when to use FIFO, LIFO, or weighted average cost for your business.",
  },
  {
    slug: "abc-analysis-inventory-management",
    title: "ABC Analysis in Inventory Management — The Complete Guide",
    description: "Apply the Pareto principle to classify inventory by value. Learn how to prioritize stock with ABC analysis and set category-specific policies.",
  },
  {
    slug: "inventory-turnover-ratio-guide",
    title: "Inventory Turnover Ratio — How to Calculate and Improve It",
    description: "Measure stock efficiency with the inventory turnover ratio. Includes benchmarks by industry, GMROI calculation, and improvement strategies.",
  },
  {
    slug: "stock-management-small-business-india",
    title: "Stock Management for Small Businesses in India — Complete Guide",
    description: "Practical stock management strategies for Indian small businesses. Covers manual vs digital tracking, demand forecasting, supplier management, and common mistakes to avoid.",
  },
  {
    slug: "gst-inventory-management-guide",
    title: "GST Inventory Management — Compliance Guide for Indian Businesses",
    description: "Manage inventory under India's GST regime. Covers stock registers, HSN codes, input tax credit on stock, e-way bills, and audit-ready record keeping.",
  },
  {
    slug: "warehouse-management-small-business",
    title: "Warehouse Management for Small Businesses — Optimise Your Godown",
    description: "Practical warehouse and godown management strategies. Covers layout planning, bin location systems, stock rotation, picking efficiency, and low-cost warehouse technology.",
  },
];

export { ARTICLES };

export default function BlogLayout() {
  return (
    <div className="blog-layout">
      <header className="blog-header">
        <Link to="/" className="blog-home-link">&larr; Back to DoAide Inventory</Link>
        <h1 className="blog-title">DoAide Inventory Blog</h1>
        <p className="blog-subtitle">Guides and resources for inventory management</p>
      </header>
      <Outlet />
    </div>
  );
}

export function BlogIndex() {
  return (
    <div className="blog-index">
      {ARTICLES.map((a) => (
        <Link key={a.slug} to={`/blog/${a.slug}`} className="blog-card">
          <h2>{a.title}</h2>
          <p>{a.description}</p>
          <span className="blog-read-more">Read more &rarr;</span>
        </Link>
      ))}
    </div>
  );
}
