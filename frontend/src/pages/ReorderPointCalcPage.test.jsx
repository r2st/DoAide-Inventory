import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ReorderPointCalcPage from "./ReorderPointCalcPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

describe("ReorderPointCalcPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><ReorderPointCalcPage /></MemoryRouter>);
    expect(screen.getByText("Reorder Point Calculator")).toBeInTheDocument();
  });

  it("shows input fields", () => {
    render(<MemoryRouter><ReorderPointCalcPage /></MemoryRouter>);
    expect(screen.getByText("Average Lead Time (days)")).toBeInTheDocument();
    expect(screen.getByText("Maximum Lead Time (days)")).toBeInTheDocument();
    expect(screen.getByText("Average Daily Demand (units)")).toBeInTheDocument();
  });

  it("displays calculated reorder point and safety stock", () => {
    render(<MemoryRouter><ReorderPointCalcPage /></MemoryRouter>);
    expect(screen.getByText("Reorder Point")).toBeInTheDocument();
    expect(screen.getByText("Safety Stock")).toBeInTheDocument();
  });
});
