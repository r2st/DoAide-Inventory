import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import SafetyStockPage from "./SafetyStockPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

describe("SafetyStockPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><SafetyStockPage /></MemoryRouter>);
    expect(screen.getByText("Safety Stock Calculator")).toBeInTheDocument();
  });

  it("shows input fields", () => {
    render(<MemoryRouter><SafetyStockPage /></MemoryRouter>);
    expect(screen.getByText("Average Daily Demand (units)")).toBeInTheDocument();
    expect(screen.getByText("Average Lead Time (days)")).toBeInTheDocument();
    expect(screen.getByText("Service Level")).toBeInTheDocument();
  });

  it("displays calculated safety stock and reorder point", () => {
    render(<MemoryRouter><SafetyStockPage /></MemoryRouter>);
    expect(screen.getByText("Safety Stock")).toBeInTheDocument();
    expect(screen.getByText("Reorder Point")).toBeInTheDocument();
  });
});
