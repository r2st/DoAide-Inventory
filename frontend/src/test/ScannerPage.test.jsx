import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ScannerPage from "../pages/ScannerPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`,
  copyToClipboard: vi.fn().mockResolvedValue(true),
}));
vi.mock("../lib/track", () => ({ track: vi.fn() }));

function renderScanner() {
  return render(
    <MemoryRouter initialEntries={["/scanner"]}>
      <ScannerPage />
    </MemoryRouter>,
  );
}

describe("ScannerPage", () => {
  it("renders the title", () => {
    renderScanner();
    expect(screen.getByRole("heading", { name: "Barcode & QR Code Generator" })).toBeInTheDocument();
  });

  it("shows barcode/qr toggle buttons", () => {
    renderScanner();
    expect(screen.getByText("Barcode")).toBeInTheDocument();
    expect(screen.getByText("QR Code")).toBeInTheDocument();
  });

  it("generates code when text is entered", async () => {
    renderScanner();
    await userEvent.type(screen.getByPlaceholderText("Enter SKU, product name, or URL"), "SKU-001");
    expect(screen.getByText("Download SVG")).toBeInTheDocument();
  });

  it("shows share buttons when code is generated", async () => {
    renderScanner();
    await userEvent.type(screen.getByPlaceholderText("Enter SKU, product name, or URL"), "TEST");
    expect(screen.getByLabelText("Share on WhatsApp")).toBeInTheDocument();
  });

  it("renders the info section", () => {
    renderScanner();
    expect(screen.getByText("About Barcode & QR Codes")).toBeInTheDocument();
  });
});
