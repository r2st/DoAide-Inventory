import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function StockManagementIndiaGuide() {
  usePageTitle("Stock Management for Small Businesses in India — Complete Guide");

  useEffect(() => {
    const blogPosting = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Stock Management for Small Businesses in India — Complete Guide",
      description: "Learn practical stock management strategies for Indian small businesses. Covers manual vs digital tracking, demand forecasting, supplier management, and common mistakes to avoid.",
      author: { "@type": "Organization", name: "DoAide" },
      publisher: { "@type": "Organization", name: "DoAide", url: "https://inventory.doaide.com" },
      url: "https://inventory.doaide.com/blog/stock-management-small-business-india",
      datePublished: "2026-10-10",
      dateModified: "2026-10-10",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://inventory.doaide.com/blog/stock-management-small-business-india" },
      inLanguage: "en-IN",
    };

    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best stock management method for small shops in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For small shops in India, a combination of periodic review and minimum stock level method works best. Track daily sales, set reorder points for fast-moving items, and use simple software or spreadsheets instead of manual registers. Cloud-based tools like DoAide Inventory offer free tiers suitable for small retailers.",
          },
        },
        {
          "@type": "Question",
          name: "How do I manage stock for a business with GST compliance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Maintain a stock register that records quantity, value, and HSN codes for every item. Use software that tracks purchases and sales with GST rates, generates reports matching GSTR-1 and GSTR-3B, and supports e-way bill details for shipments above ₹50,000.",
          },
        },
        {
          "@type": "Question",
          name: "What are common stock management mistakes Indian businesses make?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Common mistakes include relying on memory instead of written records, not accounting for seasonal demand (festivals like Diwali and wedding seasons), ignoring dead stock, mixing personal and business inventory, and failing to reconcile physical stock with register entries regularly.",
          },
        },
      ],
    };

    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.textContent = JSON.stringify(blogPosting);
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.textContent = JSON.stringify(faqPage);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <article className="blog-article">
      <Link to="/blog" className="blog-back">&larr; All articles</Link>
      <h1>Stock Management for Small Businesses in India — Complete Guide</h1>
      <p>Running a small business in India — whether it is a kirana store, a textile shop, or a hardware supplies dealer — means managing dozens to thousands of SKUs with limited staff and tight margins. Poor stock management leads to lost sales, expired goods, and capital locked in unsold inventory. This guide covers practical strategies that work for Indian small businesses, from manual methods to affordable software tools.</p>

      <h2>Why Stock Management Matters for Indian SMEs</h2>
      <p>India has over 63 million micro, small, and medium enterprises (MSMEs), and most manage inventory using physical registers or memory. The result is predictable: overstocking during slow months, stockouts during festivals, and no visibility into which products actually make money.</p>
      <p>Proper stock management gives you three things:</p>
      <ul>
        <li><strong>Cash flow control</strong> — knowing what to buy and when prevents capital from sitting idle on shelves</li>
        <li><strong>GST compliance</strong> — accurate stock records simplify tax filing and protect you during audits</li>
        <li><strong>Profitability insight</strong> — understanding which items move fast and which sit helps you make better purchasing decisions</li>
      </ul>

      <h2>Manual vs Digital Stock Tracking</h2>
      <p>Many Indian shopkeepers still use a physical bahi khata (ledger) for stock records. This works for very small operations but breaks down as you grow. Here is a comparison:</p>

      <h3>Manual Registers</h3>
      <ul>
        <li>No software cost or training needed</li>
        <li>Prone to calculation errors and missed entries</li>
        <li>Difficult to search or generate reports</li>
        <li>Physical damage (water, fire) means permanent data loss</li>
        <li>Cannot integrate with GST filing or billing software</li>
      </ul>

      <h3>Digital Tools (Spreadsheets or Cloud Software)</h3>
      <ul>
        <li>Automatic calculations for stock value, reorder levels, and profit margins</li>
        <li>Instant search across hundreds of products</li>
        <li>Cloud backup protects against data loss</li>
        <li>Can generate GST-ready reports and connect with billing</li>
        <li>Access from phone or computer — useful for owners who travel between locations</li>
      </ul>
      <p>If you handle more than 50 SKUs, switching to a digital tool pays for itself within weeks through reduced errors and faster decision-making.</p>

      <h2>Setting Up Your Stock Register</h2>
      <p>Whether you use a notebook or software, every stock register needs these fields for each item:</p>
      <ol>
        <li><strong>Item name and SKU code</strong> — a unique identifier for each product variant (size, colour, pack size)</li>
        <li><strong>HSN code</strong> — the Harmonized System of Nomenclature code required for GST compliance</li>
        <li><strong>Current quantity</strong> — updated with every purchase and sale</li>
        <li><strong>Unit cost (purchase price)</strong> — what you paid the supplier, including freight</li>
        <li><strong>Selling price and MRP</strong> — your retail price and the maximum retail price printed on the item</li>
        <li><strong>Reorder level</strong> — the minimum quantity below which you should place a new order</li>
        <li><strong>Supplier name and lead time</strong> — how long it takes to receive goods after ordering</li>
      </ol>
      <p>Use our free <Link to="/tools/reorder-point">reorder point calculator</Link> to determine the right reorder level based on your daily sales rate and supplier lead time.</p>

      <h2>Demand Forecasting for Indian Markets</h2>
      <p>India has unique demand patterns driven by festivals, monsoons, and wedding seasons. Account for these when planning purchases:</p>
      <ul>
        <li><strong>Diwali and Navratri (October–November)</strong> — spike in consumer goods, sweets, electronics, clothing, and home decor</li>
        <li><strong>Wedding season (November–February, April–June)</strong> — increased demand for jewellery, textiles, catering supplies, and gifts</li>
        <li><strong>Monsoon (June–September)</strong> — slowdown in construction materials and outdoor goods, spike in rainwear and indoor products</li>
        <li><strong>Back-to-school (March–April, June–July)</strong> — stationery, uniforms, and school supplies move fast</li>
        <li><strong>Financial year-end (March)</strong> — businesses accelerate purchases for tax benefit; B2B demand rises</li>
      </ul>
      <p>Review your previous year's sales data (even rough estimates) for these periods and stock up 2-4 weeks ahead. Running an <Link to="/tools/abc-analysis">ABC analysis</Link> helps you focus your forecasting effort on the items that contribute most to revenue.</p>

      <h2>Supplier Management Tips</h2>
      <p>For Indian small businesses, supplier relationships are everything. Here are practical strategies:</p>
      <ul>
        <li><strong>Maintain 2-3 suppliers for critical items</strong> — single-supplier dependency is risky, especially during transport strikes or supply shortages</li>
        <li><strong>Negotiate payment terms</strong> — 15 to 30 day credit is standard; use it to align payments with your sales cycle</li>
        <li><strong>Track supplier lead times</strong> — record how long each supplier takes to deliver, and factor this into your reorder calculations</li>
        <li><strong>Compare landed cost, not just unit price</strong> — include GST, freight, and handling charges when comparing quotes</li>
        <li><strong>Build rapport</strong> — in India, personal relationships with suppliers can secure priority during shortages and better prices on bulk orders</li>
      </ul>

      <h2>Handling Dead Stock and Slow Movers</h2>
      <p>Dead stock — inventory that has not sold in 6+ months — ties up capital and warehouse space. Indian businesses often hesitate to discount or dispose of unsold goods, but holding them is more expensive than you think. Storage cost, deterioration, and the opportunity cost of the capital all add up.</p>
      <ul>
        <li>Run a monthly report of items with zero sales in the last 90 days</li>
        <li>Bundle slow-moving items with popular products as combo offers</li>
        <li>Sell dead stock at cost or below cost to recover cash — even ₹1 recovered is better than ₹0 from expired goods</li>
        <li>Review your <Link to="/tools/inventory-turnover">inventory turnover ratio</Link> to catch slow movers early before they become dead stock</li>
      </ul>

      <h2>Physical Stock Verification</h2>
      <p>Register quantities drift from reality over time due to theft (shrinkage), damage, unrecorded samples, and data entry errors. Regular physical counts keep your records accurate:</p>
      <ul>
        <li><strong>Full count</strong> — once a quarter (or at minimum before GST filing deadlines in March and September)</li>
        <li><strong>Cycle counting</strong> — count a small batch of items daily, rotating through all products over a month</li>
        <li><strong>Spot checks</strong> — randomly verify high-value Class A items weekly</li>
      </ul>
      <p>After every count, reconcile the physical quantity with your register and investigate discrepancies above 2-3%. Use our <Link to="/scanner">barcode scanner</Link> to speed up the counting process.</p>

      <h2>Common Stock Management Mistakes</h2>
      <ul>
        <li><strong>Buying based on supplier discounts alone</strong> — a 5% bulk discount is not worth it if the extra stock sits for 6 months and eats into your margin through holding costs</li>
        <li><strong>Ignoring expiry dates</strong> — especially relevant for food, pharma, and cosmetic retailers; use FIFO (first in, first out) rigorously</li>
        <li><strong>Not separating damaged or returned goods</strong> — these should be tracked separately and not mixed into saleable inventory</li>
        <li><strong>Mixing personal use with business stock</strong> — common in family-run businesses; it distorts your records and your profitability picture</li>
        <li><strong>Delaying record updates</strong> — entering transactions the next day or next week guarantees inaccuracies</li>
      </ul>

      <h2>Getting Started</h2>
      <p>You do not need expensive ERP software to manage stock well. Start with these steps today:</p>
      <ol>
        <li>List your top 20 products by sales volume — these are your Class A items</li>
        <li>Set a reorder level for each based on your average daily sales and supplier lead time</li>
        <li>Do a physical count and record the current quantity</li>
        <li>Track every purchase and sale going forward — no exceptions</li>
      </ol>
      <p>Try <Link to="/">DoAide Inventory</Link> — a free stock management tool designed for Indian small businesses, with GST-ready reports, barcode scanning, and automated reorder alerts.</p>
    </article>
  );
}
