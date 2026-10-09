import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function InventoryTurnoverGuide() {
  usePageTitle("Inventory Turnover Ratio — How to Calculate and Improve It");
  return (
    <article className="blog-article">
      <Link to="/blog" className="blog-back">&larr; All articles</Link>
      <h1>Inventory Turnover Ratio — How to Calculate and Improve It</h1>
      <p>Inventory turnover ratio measures how many times you sell and replace your inventory over a period. A high ratio means efficient selling; a low ratio suggests overstocking or weak demand. Understanding this metric is critical for cash flow management and warehouse efficiency.</p>

      <h2>The Formula</h2>
      <p><strong>Inventory Turnover = Cost of Goods Sold / Average Inventory</strong></p>
      <p>Average inventory is calculated as (Beginning Inventory + Ending Inventory) / 2. Use values from the same period — typically annual.</p>

      <h2>Days Sales of Inventory (DSI)</h2>
      <p><strong>DSI = 365 / Inventory Turnover Ratio</strong></p>
      <p>This tells you how many days it takes, on average, to sell through your inventory. A DSI of 45 means you hold about 45 days of stock at any time.</p>

      <h2>What's a Good Turnover Ratio?</h2>
      <p>There is no universal benchmark — it varies by industry:</p>
      <ul>
        <li><strong>Grocery / perishables:</strong> 12-20x (fast turnover due to shelf life)</li>
        <li><strong>Fashion / apparel:</strong> 4-6x (seasonal collections)</li>
        <li><strong>Electronics:</strong> 6-10x (fast product cycles)</li>
        <li><strong>Furniture / durables:</strong> 3-5x (high-value, slower sales)</li>
        <li><strong>Industrial / manufacturing:</strong> 4-8x (depends on lead times)</li>
      </ul>

      <h2>GMROI — The Profitability Angle</h2>
      <p><strong>GMROI = Gross Margin / Average Inventory Cost</strong></p>
      <p>Gross Margin Return on Investment combines turnover with profitability. A GMROI of 2.0 means you earn $2 in gross profit for every $1 of inventory investment. Anything above 1.0 is profitable; below 1.0 means your inventory costs more than the margin it generates.</p>

      <h2>How to Improve Inventory Turnover</h2>
      <ol>
        <li><strong>Reduce excess stock</strong> — Run clearance sales on slow-moving items. Use <Link to="/tools/abc-analysis">ABC analysis</Link> to identify low-value items consuming warehouse space.</li>
        <li><strong>Improve demand forecasting</strong> — Use historical sales data to predict demand more accurately. Seasonal adjustments prevent over-ordering.</li>
        <li><strong>Negotiate shorter lead times</strong> — Shorter supplier lead times let you order smaller, more frequent batches, reducing average inventory.</li>
        <li><strong>Optimize order quantities</strong> — Use the <Link to="/tools/eoq">EOQ calculator</Link> to find the sweet spot between ordering costs and holding costs.</li>
        <li><strong>Drop unprofitable SKUs</strong> — Products with low turnover AND low margins should be discontinued or replaced.</li>
      </ol>

      <h2>Warning Signs</h2>
      <ul>
        <li>Turnover ratio declining quarter over quarter</li>
        <li>DSI increasing while sales remain flat</li>
        <li>GMROI below 1.0 for a product category</li>
        <li>Significant difference between turnover of similar products</li>
      </ul>

      <p>Calculate your inventory turnover with our <Link to="/tools/inventory-turnover">free inventory turnover calculator</Link> — no sign-up required.</p>
    </article>
  );
}
