import { useEffect, useState } from "react";
import ShareButtons from "../components/ShareButtons";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";
import { track } from "../lib/track";

function calculate(dailyUsage, leadTime, safetyDays) {
  const safetyStock = dailyUsage * safetyDays;
  const reorderPoint = dailyUsage * leadTime + safetyStock;
  const eoqDemand = dailyUsage * 365;
  return { safetyStock, reorderPoint, eoqDemand };
}

export default function CalculatorPage() {
  usePageTitle("Reorder Point Calculator — Never Run Out of Stock");
  const [dailyUsage, setDailyUsage] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [safetyDays, setSafetyDays] = useState("3");

  const usage = parseFloat(dailyUsage);
  const lead = parseFloat(leadTime);
  const safety = parseFloat(safetyDays) || 0;
  const valid = Number.isFinite(usage) && usage > 0 && Number.isFinite(lead) && lead > 0;
  const result = valid ? calculate(usage, lead, safety) : null;

  useEffect(() => {
    if (result) track("reorder_calc", { dailyUsage: usage, leadTime: lead });
  }, [result, usage, lead]);

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Reorder Point Calculator</h1>
          <p className="tool-subtitle">
            Calculate when to reorder stock. Enter daily usage, supplier lead time, and safety stock days to find your optimal reorder point.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              Average daily usage (units)
              <input type="number" className="calc-input" value={dailyUsage} onChange={(e) => setDailyUsage(e.target.value)} placeholder="Units sold or consumed per day" min="0" inputMode="numeric" autoFocus />
            </label>
            <label className="calc-label">
              Supplier lead time (days)
              <input type="number" className="calc-input" value={leadTime} onChange={(e) => setLeadTime(e.target.value)} placeholder="Days from order to delivery" min="0" inputMode="numeric" />
            </label>
            <label className="calc-label">
              Safety stock days
              <input type="number" className="calc-input" value={safetyDays} onChange={(e) => setSafetyDays(e.target.value)} placeholder="Extra buffer days" min="0" inputMode="numeric" />
            </label>

            {result && (
              <div className="calc-result" aria-live="polite">
                <div className="calc-row"><span>Daily Usage</span><span>{usage} units/day</span></div>
                <div className="calc-row"><span>Lead Time</span><span>{lead} days</span></div>
                <div className="calc-row"><span>Safety Stock</span><span>{result.safetyStock} units</span></div>
                <div className="calc-row calc-highlight"><span>Reorder Point</span><span>{result.reorderPoint} units</span></div>
                <div className="calc-row"><span>Annual Demand (est.)</span><span>{result.eoqDemand.toLocaleString("en-IN")} units</span></div>
                <p className="calc-note">When stock drops to {result.reorderPoint} units, place a new order to avoid stockouts.</p>
                <ShareButtons path="/calculator" text={`Reorder point: ${result.reorderPoint} units — calculated free on DoAide Inventory`} />
              </div>
            )}
          </div>

          <section className="tool-info">
            <h2>How Reorder Point Works</h2>
            <p>The reorder point formula helps you determine the minimum stock level at which you should place a new purchase order.</p>
            <h3>Formula</h3>
            <p><strong>Reorder Point = (Daily Usage × Lead Time) + Safety Stock</strong></p>
            <ul>
              <li><strong>Daily Usage</strong> — Average units sold or consumed per day</li>
              <li><strong>Lead Time</strong> — Days between placing and receiving an order</li>
              <li><strong>Safety Stock</strong> — Buffer to handle demand spikes or delivery delays</li>
            </ul>
            <h3>Why Safety Stock Matters</h3>
            <p>Without safety stock, any delay in delivery or spike in demand leads to a stockout. A common rule of thumb is 3-7 days of safety stock for most products.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
