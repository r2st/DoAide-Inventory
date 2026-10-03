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
