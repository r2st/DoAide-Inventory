import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function InventoryMethodsGuide() {
  usePageTitle("FIFO, LIFO, and Weighted Average — Inventory Methods Compared");
  return (
    <article className="blog-article">
      <Link to="/blog" className="blog-back">&larr; All articles</Link>
      <h1>FIFO, LIFO, and Weighted Average — Inventory Methods Compared</h1>
      <p>How you value your inventory affects your cost of goods sold (COGS), profit margins, and tax liability. Choosing the right method depends on your product type, industry regulations, and accounting needs.</p>

      <h2>FIFO — First In, First Out</h2>
      <p>The oldest inventory is sold first. This matches the natural flow for most physical products, especially perishable goods.</p>
      <ul>
        <li><strong>Best for:</strong> Food, pharmaceuticals, fashion, any product with shelf life</li>
        <li><strong>Tax impact:</strong> Higher profits in times of rising costs (older, cheaper stock is sold first)</li>
        <li><strong>Advantage:</strong> Ending inventory reflects current market prices</li>
        <li><strong>Accepted under:</strong> Both GAAP and IFRS</li>
      </ul>

      <h2>LIFO — Last In, First Out</h2>
      <p>The newest inventory is sold first. This doesn't match physical flow for most products but can provide tax advantages.</p>
      <ul>
        <li><strong>Best for:</strong> Non-perishable commodities, raw materials</li>
        <li><strong>Tax impact:</strong> Lower profits in times of rising costs (newer, more expensive stock is sold first)</li>
        <li><strong>Advantage:</strong> COGS better reflects current replacement costs</li>
        <li><strong>Note:</strong> Not allowed under IFRS — only under US GAAP</li>
      </ul>

      <h2>Weighted Average Cost</h2>
      <p>Every unit is valued at the average cost of all units available. Simple to calculate and smooths out price fluctuations.</p>
      <ul>
        <li><strong>Best for:</strong> Fungible goods (grains, chemicals, fuel), large volumes of identical items</li>
        <li><strong>Tax impact:</strong> Falls between FIFO and LIFO</li>
        <li><strong>Advantage:</strong> Simple, no need to track individual purchase lots</li>
        <li><strong>Accepted under:</strong> Both GAAP and IFRS</li>
      </ul>

      <h2>How to Choose</h2>
      <ol>
        <li>If products expire or go out of style, use FIFO</li>
        <li>If you want to minimize taxes during inflation and you're under US GAAP, consider LIFO</li>
        <li>If tracking individual costs is impractical, use Weighted Average</li>
        <li>For Indian businesses under Ind AS, FIFO or Weighted Average (LIFO is not permitted)</li>
      </ol>

      <p>Start tracking your inventory with the right method using <Link to="/auth">DoAide Inventory</Link> — free for up to 50 products.</p>
    </article>
  );
}
