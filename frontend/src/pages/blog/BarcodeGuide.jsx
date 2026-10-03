import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function BarcodeGuide() {
  usePageTitle("Barcode Systems for Small Businesses — A Complete Guide");
  return (
    <article className="blog-article">
      <Link to="/blog" className="blog-back">&larr; All articles</Link>
      <h1>Barcode Systems for Small Businesses — A Complete Guide</h1>
      <p>Barcodes transform inventory management from manual counting to instant scanning. Even a small business with 50 products can save hours every week by implementing a barcode system.</p>

      <h2>Types of Barcodes</h2>
      <h3>1D Barcodes (Linear)</h3>
      <p>Traditional barcodes with vertical lines. Common types include UPC (retail products), Code 128 (logistics), and Code 39 (manufacturing). They hold 20-25 characters of data and require a dedicated scanner or smartphone app.</p>

      <h3>2D Barcodes (QR Codes)</h3>
      <p>Square matrix codes that hold much more data — up to 4,000 characters. Any smartphone camera can read them. Great for linking to product pages, storing lot numbers, or encoding full product details.</p>

      <h2>What You Need to Get Started</h2>
      <ul>
        <li><strong>Barcode generator</strong> — Create codes from your SKUs or product names</li>
        <li><strong>Label printer</strong> — A thermal printer like Zebra or Brother QL series (₹5,000-₹15,000)</li>
        <li><strong>Scanner</strong> — USB barcode scanner (₹2,000-₹5,000) or smartphone with scanning app</li>
        <li><strong>Inventory software</strong> — To link scanned codes to your product database</li>
      </ul>

      <h2>Implementation Steps</h2>
      <ol>
        <li>Assign unique SKUs to every product variant (size, color, etc.)</li>
        <li>Generate barcodes from SKUs using our <Link to="/scanner">free barcode generator</Link></li>
        <li>Print labels and apply them to products, shelves, or bins</li>
        <li>Set up scanning in your inventory system to record stock movements</li>
        <li>Train staff on scanning during receiving, picking, and stocktaking</li>
      </ol>

      <h2>Best Practices</h2>
      <ul>
        <li>Use a consistent SKU format across all products (e.g., CAT-PROD-001)</li>
        <li>Print labels at high resolution to avoid scan failures</li>
        <li>Place labels where they're easy to scan during daily operations</li>
        <li>Keep a master list linking SKUs to product details</li>
        <li>Do regular test scans to catch damaged or faded labels</li>
      </ul>
    </article>
  );
}
