import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function AbcAnalysisGuide() {
  usePageTitle("ABC Analysis in Inventory Management — The Complete Guide");
  return (
    <article className="blog-article">
      <Link to="/blog" className="blog-back">&larr; All articles</Link>
      <h1>ABC Analysis in Inventory Management — The Complete Guide</h1>
      <p>Not all inventory items are equal. ABC analysis applies the Pareto principle (80/20 rule) to classify products by their contribution to total inventory value. This helps you focus time, money, and warehouse space on the items that matter most.</p>

      <h2>What is ABC Analysis?</h2>
      <p>ABC analysis divides inventory into three categories based on annual consumption value (quantity used multiplied by unit cost):</p>
      <ul>
        <li><strong>Class A</strong> — Top 10-20% of items that account for 70-80% of total inventory value. These are your highest-priority products.</li>
        <li><strong>Class B</strong> — Next 20-30% of items, representing 15-25% of total value. Moderate priority with periodic review.</li>
        <li><strong>Class C</strong> — Bottom 50-60% of items, contributing only 5-10% of total value. Low priority with simplified controls.</li>
      </ul>

      <h2>How to Perform ABC Analysis</h2>
      <ol>
        <li>List all inventory items with their annual usage quantity and unit cost</li>
        <li>Calculate the annual consumption value for each item (quantity times unit cost)</li>
        <li>Sort items from highest to lowest consumption value</li>
        <li>Calculate cumulative percentages of total value</li>
        <li>Assign categories: A (up to 80%), B (80-95%), C (95-100%)</li>
      </ol>

      <h2>Management Strategies by Category</h2>
      <h3>Class A Items</h3>
      <ul>
        <li>Tight inventory control with accurate, frequent counts</li>
        <li>Lower safety stock but more frequent reordering</li>
        <li>Strong supplier relationships with negotiated pricing</li>
        <li>Detailed demand forecasting and trend analysis</li>
      </ul>

      <h3>Class B Items</h3>
      <ul>
        <li>Moderate controls with monthly or quarterly reviews</li>
        <li>Standard reorder points and safety stock levels</li>
        <li>Regular supplier evaluation</li>
      </ul>

      <h3>Class C Items</h3>
      <ul>
        <li>Simple controls — bulk ordering to reduce order frequency</li>
        <li>Higher safety stock to avoid stockout hassle on low-value items</li>
        <li>Periodic review rather than continuous monitoring</li>
      </ul>

      <h2>Common Pitfalls</h2>
      <ul>
        <li>Classifying by unit cost alone instead of total consumption value</li>
        <li>Ignoring critical items — a cheap bolt that stops a production line belongs in Class A regardless of value</li>
        <li>Not reviewing classifications regularly as demand patterns change</li>
        <li>Applying identical policies across all categories</li>
      </ul>

      <h2>ABC Analysis and Other Inventory Metrics</h2>
      <p>ABC analysis works best when combined with other inventory management techniques:</p>
      <ul>
        <li>Use <Link to="/tools/inventory-turnover">inventory turnover analysis</Link> to identify slow-moving Class A items</li>
        <li>Set tighter <Link to="/tools/reorder-point">reorder points</Link> for Class A items</li>
        <li>Apply <Link to="/tools/eoq">EOQ calculations</Link> primarily to Class A and B items where order cost optimization matters most</li>
      </ul>

      <p>Try our <Link to="/tools/abc-analysis">free ABC analysis tool</Link> to classify your inventory instantly.</p>
    </article>
  );
}
