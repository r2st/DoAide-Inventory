import { useState } from "react";
import ShareButtons from "../components/ShareButtons";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";
import { copyToClipboard } from "../lib/share";
import { track } from "../lib/track";

const TEMPLATES = [
  {
    key: "warehouse",
    name: "Warehouse Inventory",
    desc: "General warehouse tracking with bin locations, quantities, and reorder levels.",
    columns: ["SKU", "Product Name", "Category", "Bin Location", "Quantity", "Min Level", "Max Level", "Unit Cost", "Total Value"],
  },
  {
    key: "retail",
    name: "Retail Stock Sheet",
    desc: "Retail store inventory with selling price, margin, and display quantities.",
    columns: ["SKU", "Item Name", "Category", "On Display", "In Stockroom", "Total", "Cost Price", "Selling Price", "Margin %", "Reorder Qty"],
  },
  {
    key: "restaurant",
    name: "Restaurant Inventory",
    desc: "Food & beverage inventory with shelf life tracking and par levels.",
    columns: ["Item", "Category", "Unit", "On Hand", "Par Level", "Expiry Date", "Supplier", "Unit Cost", "Weekly Usage"],
  },
  {
    key: "manufacturing",
    name: "Manufacturing BOM",
    desc: "Bill of materials tracking for production with raw material quantities.",
    columns: ["Part Number", "Component Name", "Type", "Qty per Unit", "On Hand", "On Order", "Lead Time (days)", "Unit Cost", "Supplier", "Status"],
  },
  {
    key: "ecommerce",
    name: "E-commerce Inventory",
    desc: "Multi-channel stock sync with marketplace listings and fulfillment status.",
    columns: ["SKU", "Product Title", "Variant", "Available", "Reserved", "In Transit", "Warehouse", "Weight (kg)", "HS Code", "Channel"],
  },
  {
    key: "raw-materials",
    name: "Raw Materials Log",
    desc: "Track raw material receipts, consumption, and wastage for production.",
    columns: ["Material", "Batch No", "Received Date", "Received Qty", "Consumed", "Wastage", "Balance", "Unit", "Cost/Unit", "Supplier"],
  },
];

export default function TemplatesPage() {
  usePageTitle("Free Inventory Templates — Download Spreadsheet Formats");
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = async (template) => {
    const csv = template.columns.join(",");
    const ok = await copyToClipboard(csv);
    if (ok) {
      track("template_copy", { template: template.key });
      setCopiedKey(template.key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Inventory Templates</h1>
          <p className="tool-subtitle">
            Free inventory spreadsheet templates for different industries. Copy the column headers and paste into your spreadsheet.
          </p>

          <div className="template-grid">
            {TEMPLATES.map((t) => (
              <div key={t.key} className="template-card">
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
                <div className="template-preview">
                  {t.columns.slice(0, 5).map((col) => (
                    <span key={col} className="template-col">{col}</span>
                  ))}
                  {t.columns.length > 5 && (
                    <span className="template-col template-more">+{t.columns.length - 5} more</span>
                  )}
                </div>
                <button onClick={() => handleCopy(t)} className="btn btn-primary template-copy-btn">
                  {copiedKey === t.key ? "Copied!" : "Copy Columns"}
                </button>
              </div>
            ))}
          </div>

          <ShareButtons path="/templates" text="Free inventory templates for warehouse, retail, restaurant, and more — DoAide Inventory" />

          <section className="tool-info">
            <h2>Which Inventory Template Should You Use?</h2>
            <ul>
              <li><strong>Warehouse</strong> — General-purpose for any business with a stockroom or warehouse.</li>
              <li><strong>Retail</strong> — For stores tracking display vs. stockroom quantities and margins.</li>
              <li><strong>Restaurant</strong> — Food service with expiry dates, par levels, and weekly usage.</li>
              <li><strong>Manufacturing</strong> — Bill of materials for production planning and procurement.</li>
              <li><strong>E-commerce</strong> — Multi-channel sellers managing listings across marketplaces.</li>
              <li><strong>Raw Materials</strong> — Track receipts, consumption, and wastage for production inputs.</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
