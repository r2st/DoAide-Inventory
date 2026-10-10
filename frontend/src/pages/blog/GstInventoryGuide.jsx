import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function GstInventoryGuide() {
  usePageTitle("GST Inventory Management — Compliance Guide for Indian Businesses");

  useEffect(() => {
    const blogPosting = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "GST Inventory Management — Compliance Guide for Indian Businesses",
      description: "Complete guide to managing inventory under India's GST regime. Covers stock registers, HSN codes, input tax credit on stock, e-way bills, and audit-ready record keeping.",
      author: { "@type": "Organization", name: "DoAide" },
      publisher: { "@type": "Organization", name: "DoAide", url: "https://inventory.doaide.com" },
      url: "https://inventory.doaide.com/blog/gst-inventory-management-guide",
      datePublished: "2026-10-10",
      dateModified: "2026-10-10",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://inventory.doaide.com/blog/gst-inventory-management-guide" },
      inLanguage: "en-IN",
    };

    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is a stock register mandatory under GST?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Under GST rules, every registered dealer must maintain a stock register showing quantity, value, and HSN code for each item. During audits, GST officers can request stock records to verify that purchases, sales, and closing stock match the filed returns.",
          },
        },
        {
          "@type": "Question",
          name: "How do HSN codes affect inventory management under GST?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "HSN (Harmonized System of Nomenclature) codes determine the applicable GST rate for each product. Your inventory system must map every item to its correct HSN code. Businesses with turnover above ₹5 crore must report 6-digit HSN codes in GST returns; those between ₹1.5 crore and ₹5 crore require 4-digit codes.",
          },
        },
        {
          "@type": "Question",
          name: "Can I claim input tax credit on opening stock when registering for GST?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. When you register for GST for the first time, you can claim ITC on stock held on the registration date, provided you have valid purchase invoices not older than 12 months. This includes raw materials, semi-finished goods, and finished goods. File the claim through FORM GST ITC-01 within 30 days of registration.",
          },
        },
        {
          "@type": "Question",
          name: "When is an e-way bill required for stock transfers in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An e-way bill is mandatory for movement of goods valued above ₹50,000, including stock transfers between your own warehouses or branches. Generate the e-way bill on the GST portal before dispatch. Some states have lower thresholds — for example, Karnataka requires e-way bills for goods above ₹50,000 while some states set ₹1 lakh for intra-state movement.",
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
      <h1>GST Inventory Management — Compliance Guide for Indian Businesses</h1>
      <p>Since the Goods and Services Tax (GST) was introduced in July 2017, inventory management in India has become inseparable from tax compliance. Every purchase, sale, stock transfer, and write-off has GST implications. Businesses that treat inventory tracking and GST filing as separate activities end up with mismatched returns, rejected input tax credit claims, and audit notices. This guide explains how to align your inventory practices with GST requirements.</p>

      <h2>GST Stock Register Requirements</h2>
      <p>Under GST, every registered person must maintain records of goods received, supplied, and in stock. While the law does not prescribe a specific format, your stock register must contain:</p>
      <ul>
        <li><strong>Description of goods</strong> — product name, variant, and quality/grade</li>
        <li><strong>HSN code</strong> — the classification code that determines the GST rate</li>
        <li><strong>Quantity and unit of measurement</strong> — in standard units (kg, litres, pieces, metres)</li>
        <li><strong>Value per unit</strong> — the purchase cost excluding GST (assessable value)</li>
        <li><strong>GST paid</strong> — CGST, SGST/UTGST, or IGST amounts on each purchase</li>
        <li><strong>Supplier GSTIN and invoice number</strong> — required for input tax credit claims</li>
        <li><strong>Date of receipt and date of issue</strong></li>
      </ul>
      <p>Section 35 of the CGST Act requires these records to be maintained at each place of business. If you operate from multiple locations (a shop and a godown, for example), each location should have its own stock register or a consolidated system that tracks stock per location.</p>

      <h2>HSN Code Mapping</h2>
      <p>HSN codes are the bridge between your inventory and GST rates. Getting them wrong means charging incorrect tax, which leads to compliance issues during reconciliation.</p>
      <ul>
        <li><strong>Turnover up to ₹1.5 crore</strong> — HSN codes are optional on invoices (but recommended for your own records)</li>
        <li><strong>Turnover ₹1.5 crore to ₹5 crore</strong> — 4-digit HSN codes mandatory</li>
        <li><strong>Turnover above ₹5 crore</strong> — 6-digit HSN codes mandatory</li>
      </ul>
      <p>Map HSN codes at the time you add a product to your inventory system, not when you generate invoices. This prevents last-minute guesswork and ensures consistent classification across all transactions. The GST portal provides a searchable HSN directory at <strong>services.gst.gov.in</strong>.</p>

      <h2>Input Tax Credit and Inventory</h2>
      <p>Input Tax Credit (ITC) is the cornerstone of GST — you reduce your output tax liability by the GST already paid on purchases. But ITC claims are closely tied to inventory management:</p>

      <h3>Conditions for Claiming ITC</h3>
      <ol>
        <li>You must possess a valid tax invoice from a GST-registered supplier</li>
        <li>The goods must have been received by you (or delivered on your direction)</li>
        <li>The supplier must have actually filed the return and paid the tax</li>
        <li>You must file your return (GSTR-3B) for the relevant period</li>
      </ol>

      <h3>ITC Reversal on Stock</h3>
      <p>There are situations where you must reverse (pay back) ITC previously claimed:</p>
      <ul>
        <li><strong>Goods destroyed, lost, or stolen</strong> — if insured stock is damaged and written off, the ITC on that stock must be reversed</li>
        <li><strong>Goods given away as free samples</strong> — ITC cannot be claimed on items distributed free of charge</li>
        <li><strong>Stock used for personal purposes</strong> — ITC must be reversed on any business stock consumed personally</li>
        <li><strong>Non-payment to supplier within 180 days</strong> — if you have not paid the supplier within 180 days of the invoice date, the ITC must be reversed with interest</li>
      </ul>
      <p>Your inventory system should flag items that are written off, transferred for personal use, or associated with overdue supplier payments, so you can reverse ITC in the correct filing period.</p>

      <h2>Stock Transfers and E-Way Bills</h2>
      <p>Moving goods between your own branches or warehouses is called a stock transfer or branch transfer. Under GST, these transfers have specific compliance requirements:</p>
      <ul>
        <li><strong>Same state, same GSTIN</strong> — no GST invoice required, but maintain a delivery challan with product details, quantity, and value</li>
        <li><strong>Different states (different GSTINs)</strong> — treated as a supply; you must issue a tax invoice and charge IGST</li>
        <li><strong>E-way bill</strong> — required for any goods movement valued above ₹50,000, regardless of whether it is a sale or a stock transfer</li>
      </ul>
      <p>Track stock transfers in your inventory system as a separate transaction type (not a sale or purchase) to keep your reports accurate and GST-compliant.</p>

      <h2>Inventory Valuation for GST Returns</h2>
      <p>GST returns require you to report the value of goods sold and purchased. Your inventory valuation method affects these numbers:</p>
      <ul>
        <li><strong>FIFO (First In, First Out)</strong> — the cost of the oldest stock is used first. Most common and generally accepted under Indian accounting standards</li>
        <li><strong>Weighted Average Cost</strong> — averages the cost of all available units. Simpler but can smooth out price fluctuations</li>
        <li><strong>Specific Identification</strong> — tracks exact cost of each unit. Used for high-value items like jewellery or automobiles</li>
      </ul>
      <p>Whichever method you choose, apply it consistently across all periods. Changing methods without proper disclosure invites scrutiny during audits. Read our detailed comparison of <Link to="/blog/inventory-management-methods-compared">FIFO, LIFO, and weighted average methods</Link>.</p>

      <h2>Annual Return and Stock Reconciliation</h2>
      <p>The annual GST return (GSTR-9) requires you to reconcile your purchases, sales, and closing stock for the financial year. Here is what auditors check:</p>
      <ol>
        <li>Does your closing stock quantity match the physical stock?</li>
        <li>Does the value of closing stock (at cost) reconcile with your purchase invoices minus cost of goods sold?</li>
        <li>Is the ITC claimed consistent with the goods received and in stock?</li>
        <li>Are there any goods received but not invoiced, or invoiced but not received?</li>
      </ol>
      <p>Conduct a thorough physical stock count before the March 31 financial year-end. Investigate and document any variances between physical stock and book stock. Even small discrepancies can cascade into larger mismatches in GST returns.</p>

      <h2>Practical Tips for GST-Compliant Inventory</h2>
      <ul>
        <li><strong>Record every purchase immediately</strong> — do not batch entries at month-end. Late entries lead to missed ITC claims in the filing period</li>
        <li><strong>Match purchase invoices with GSTR-2B</strong> — verify that your supplier's filings match your records before claiming ITC</li>
        <li><strong>Use rate-wise stock grouping</strong> — group items by their GST rate (5%, 12%, 18%, 28%) for faster return filing</li>
        <li><strong>Track exempted and zero-rated items separately</strong> — these have different ITC rules and reporting requirements</li>
        <li><strong>Archive invoices for 6 years</strong> — GST law requires you to retain records for at least 72 months from the due date of the annual return</li>
        <li><strong>Automate where possible</strong> — manual tracking across multiple GST categories is error-prone. Even a basic inventory tool that maps HSN codes and GST rates saves significant effort during filing</li>
      </ul>

      <h2>Job Work and GST Implications</h2>
      <p>If you send raw materials or semi-finished goods to a job worker (common in manufacturing, textiles, and jewellery), GST has specific rules:</p>
      <ul>
        <li>Maintain a job work register showing goods sent, goods received back, and waste/scrap</li>
        <li>Goods must be returned within 1 year (inputs) or 3 years (capital goods), otherwise GST is payable as if the goods were supplied to the job worker</li>
        <li>Issue a delivery challan when sending goods for job work — this is not a supply, so no tax invoice is needed at the time of dispatch</li>
      </ul>

      <h2>Getting Your Inventory GST-Ready</h2>
      <p>If your current inventory system is not aligned with GST requirements, start with these steps:</p>
      <ol>
        <li>Add HSN codes to every product in your catalog</li>
        <li>Set up GST rate mapping (5%, 12%, 18%, 28%, exempt, zero-rated)</li>
        <li>Ensure every purchase entry includes the supplier GSTIN and invoice number</li>
        <li>Run a <Link to="/tools/abc-analysis">ABC analysis</Link> to prioritise accuracy for high-value items</li>
        <li>Schedule quarterly stock counts aligned with your GST return filing dates</li>
      </ol>
      <p><Link to="/">DoAide Inventory</Link> tracks HSN codes, GST rates, and supplier details for every item. Set up your stock register in minutes — free for small businesses.</p>
    </article>
  );
}
