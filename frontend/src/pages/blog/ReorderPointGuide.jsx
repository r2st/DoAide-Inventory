import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function ReorderPointGuide() {
  usePageTitle("Reorder Point Formula Explained — Never Run Out of Stock");
  return (
    <article className="blog-article">
      <Link to="/blog" className="blog-back">&larr; All articles</Link>
      <h1>Reorder Point Formula Explained — Never Run Out of Stock</h1>
      <p>Running out of stock means lost sales, unhappy customers, and emergency orders at premium prices. The reorder point (ROP) formula helps you avoid all of that by telling you exactly when to place a new order.</p>

      <h2>The Reorder Point Formula</h2>
      <p><strong>Reorder Point = (Average Daily Usage × Lead Time) + Safety Stock</strong></p>
      <p>When your stock level drops to the reorder point, it's time to place a purchase order. By the time the supplier delivers, you'll have just enough safety stock to cover any variability.</p>

      <h2>Breaking Down Each Component</h2>
      <h3>Average Daily Usage</h3>
      <p>Calculate this by dividing total units sold over a period by the number of days. Use 30, 60, or 90-day windows depending on how seasonal your product is. For seasonal items, calculate separate averages for peak and off-peak periods.</p>

      <h3>Lead Time</h3>
      <p>This is the number of days between placing an order and receiving it. Include supplier processing time, shipping time, and your own receiving/inspection time. Always use the longest realistic lead time, not the best case.</p>

      <h3>Safety Stock</h3>
      <p>Safety stock is your buffer against uncertainty. A common approach is to multiply daily usage by a safety factor (usually 3-7 days). Businesses with reliable suppliers can use fewer safety days; those with volatile demand need more.</p>

      <h2>Example Calculation</h2>
      <p>A retailer sells 20 units per day of a product. The supplier delivers in 5 days. They want 3 days of safety stock.</p>
      <ul>
        <li>Safety Stock = 20 × 3 = 60 units</li>
        <li>Reorder Point = (20 × 5) + 60 = 160 units</li>
      </ul>
      <p>When stock drops to 160 units, they place a new order.</p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>Using average lead time instead of worst-case lead time</li>
        <li>Ignoring seasonal demand spikes when calculating daily usage</li>
        <li>Setting safety stock to zero to minimize carrying costs</li>
        <li>Not updating reorder points as demand patterns change</li>
      </ul>

      <p>Try our <Link to="/calculator">free reorder point calculator</Link> to find the right levels for your products.</p>
    </article>
  );
}
