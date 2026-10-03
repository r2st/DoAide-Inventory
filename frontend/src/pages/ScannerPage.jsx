import { useState } from "react";
import ShareButtons from "../components/ShareButtons";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";
import { track } from "../lib/track";

function generateBarcodeSvg(text) {
  const chars = text.split("");
  const barWidth = 2;
  const height = 80;
  let x = 10;
  const bars = [];

  bars.push({ x, w: barWidth, h: height });
  x += barWidth * 2;
  bars.push({ x, w: barWidth, h: height });
  x += barWidth * 2;

  for (const ch of chars) {
    const code = ch.charCodeAt(0);
    for (let i = 0; i < 4; i++) {
      const w = ((code >> (i * 2)) & 3) + 1;
      if (i % 2 === 0) bars.push({ x, w: w * barWidth * 0.5, h: height });
      x += w * barWidth * 0.5 + barWidth * 0.5;
    }
  }

  bars.push({ x, w: barWidth, h: height });
  x += barWidth * 2;
  bars.push({ x, w: barWidth, h: height });
  x += barWidth + 10;

  const rects = bars.map((b, i) => `<rect x="${b.x}" y="10" width="${b.w}" height="${b.h}" fill="#000" key="${i}" />`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x} ${height + 30}" width="${x}" height="${height + 30}">${rects}<text x="${x / 2}" y="${height + 25}" text-anchor="middle" font-size="14" font-family="monospace">${text}</text></svg>`;
}

function generateQrSvg(text) {
  const size = 21;
  const scale = 8;
  const grid = Array.from({ length: size }, () => Array(size).fill(false));

  function addFinderPattern(row, col) {
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 7; c++)
        if (r < size && c < size && row + r < size && col + c < size)
          grid[row + r][col + c] = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
  }

  addFinderPattern(0, 0);
  addFinderPattern(0, 14);
  addFinderPattern(14, 0);

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    const row = 8 + Math.floor(i / 5) % (size - 8);
    const col = 8 + (i * 3) % (size - 8);
    for (let b = 0; b < 8; b++) {
      const r = row + Math.floor(b / 3) % 3;
      const c = col + (b % 3);
      if (r < size && c < size) grid[r][c] = !!(code & (1 << b));
    }
  }

  let rects = "";
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (grid[r][c]) rects += `<rect x="${c * scale + scale}" y="${r * scale + scale}" width="${scale}" height="${scale}" fill="#000"/>`;

  const full = (size + 2) * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${full} ${full}" width="${full}" height="${full}"><rect width="${full}" height="${full}" fill="#fff"/>${rects}</svg>`;
}

export default function ScannerPage() {
  usePageTitle("Free Barcode & QR Code Generator for Products");
  const [text, setText] = useState("");
  const [mode, setMode] = useState("barcode");

  const trimmed = text.trim();
  const svg = trimmed ? (mode === "barcode" ? generateBarcodeSvg(trimmed) : generateQrSvg(trimmed)) : null;

  const handleGenerate = () => {
    if (trimmed) track("code_generate", { mode, text: trimmed });
  };

  const handleDownload = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${mode}-${trimmed}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    track("code_download", { mode });
  };

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Barcode & QR Code Generator</h1>
          <p className="tool-subtitle">
            Generate barcodes and QR codes for your products. Enter a SKU, product name, or any text to create a scannable code.
          </p>

          <div className="calc-card">
            <div className="embed-tools" role="group" aria-label="Code type">
              <button className={`embed-tool-btn${mode === "barcode" ? " active" : ""}`} onClick={() => setMode("barcode")}>
                <strong>Barcode</strong>
                <span>Linear barcode for product labels</span>
              </button>
              <button className={`embed-tool-btn${mode === "qr" ? " active" : ""}`} onClick={() => setMode("qr")}>
                <strong>QR Code</strong>
                <span>2D code for scanning with phones</span>
              </button>
            </div>

            <label className="calc-label">
              Text / SKU
              <input type="text" className="calc-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter SKU, product name, or URL" autoFocus onKeyDown={(e) => e.key === "Enter" && handleGenerate()} />
            </label>

            {svg && (
              <div className="calc-result" aria-live="polite">
                <div className="scanner-preview" dangerouslySetInnerHTML={{ __html: svg }} />
                <button onClick={handleDownload} className="btn btn-primary">Download SVG</button>
                <ShareButtons path="/scanner" text={`Generated a ${mode} for "${trimmed}" — free on DoAide Inventory`} />
              </div>
            )}
          </div>

          <section className="tool-info">
            <h2>About Barcode & QR Codes</h2>
            <p>Barcodes and QR codes help you identify and track products efficiently. Print them on labels, packaging, or shelf tags.</p>
            <h3>When to Use Barcodes</h3>
            <ul>
              <li>Product labels and shelf tags in retail</li>
              <li>Warehouse bin locations and inventory tracking</li>
              <li>Point-of-sale scanning at checkout</li>
            </ul>
            <h3>When to Use QR Codes</h3>
            <ul>
              <li>Product details or spec sheets linked via URL</li>
              <li>Inventory lookup with smartphone cameras</li>
              <li>Customer-facing product pages and promotions</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
