import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import StockLevelCalculatorPage from "./StockLevelCalculatorPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

describe("StockLevelCalculatorPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><StockLevelCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("Stock Level Calculator")).toBeInTheDocument();
  });

  it("shows input fields", () => {
    render(<MemoryRouter><StockLevelCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("Current Stock on Hand (units)")).toBeInTheDocument();
    expect(screen.getByText("Average Daily Sales (units)")).toBeInTheDocument();
    expect(screen.getByText("Supplier Lead Time (days)")).toBeInTheDocument();
  });

  it("displays stock status and metrics", () => {
    render(<MemoryRouter><StockLevelCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("Stock Status")).toBeInTheDocument();
    expect(screen.getByText("Reorder Point")).toBeInTheDocument();
    expect(screen.getByText("Days of Supply")).toBeInTheDocument();
  });

  it("shows healthy status with default values", () => {
    render(<MemoryRouter><StockLevelCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("Healthy")).toBeInTheDocument();
  });
});
