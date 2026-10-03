import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import CalculatorPage from "../pages/CalculatorPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`,
  copyToClipboard: vi.fn().mockResolvedValue(true),
}));
vi.mock("../lib/track", () => ({ track: vi.fn() }));

function renderCalc() {
  return render(
    <MemoryRouter initialEntries={["/calculator"]}>
      <CalculatorPage />
    </MemoryRouter>,
  );
}

describe("CalculatorPage", () => {
  it("renders the title", () => {
    renderCalc();
    expect(screen.getByRole("heading", { name: "Reorder Point Calculator" })).toBeInTheDocument();
  });

  it("shows result when inputs are filled", async () => {
    renderCalc();
    await userEvent.type(screen.getByPlaceholderText("Units sold or consumed per day"), "20");
    await userEvent.type(screen.getByPlaceholderText("Days from order to delivery"), "5");
    expect(screen.getByText("Reorder Point")).toBeInTheDocument();
    expect(screen.getAllByText(/160 units/).length).toBeGreaterThan(0);
  });

  it("shows no result when inputs are empty", () => {
    renderCalc();
    expect(screen.queryByText("Reorder Point")).not.toBeInTheDocument();
  });

  it("renders the info section", () => {
    renderCalc();
    expect(screen.getByText("How Reorder Point Works")).toBeInTheDocument();
  });
});
