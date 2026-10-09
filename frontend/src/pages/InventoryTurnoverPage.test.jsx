import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import InventoryTurnoverPage from "./InventoryTurnoverPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

describe("InventoryTurnoverPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><InventoryTurnoverPage /></MemoryRouter>);
    expect(screen.getByText("Inventory Turnover Calculator")).toBeInTheDocument();
  });

  it("shows input fields", () => {
    render(<MemoryRouter><InventoryTurnoverPage /></MemoryRouter>);
    expect(screen.getByText("Cost of Goods Sold ($)")).toBeInTheDocument();
    expect(screen.getByText("Beginning Inventory Value ($)")).toBeInTheDocument();
    expect(screen.getByText("Ending Inventory Value ($)")).toBeInTheDocument();
    expect(screen.getByText("Total Revenue ($)")).toBeInTheDocument();
  });

  it("displays the turnover ratio", () => {
    render(<MemoryRouter><InventoryTurnoverPage /></MemoryRouter>);
    expect(screen.getByText("Inventory Turnover Ratio")).toBeInTheDocument();
  });

  it("shows breakdown metrics", () => {
    render(<MemoryRouter><InventoryTurnoverPage /></MemoryRouter>);
    expect(screen.getAllByText("Average Inventory").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Days Sales of Inventory/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Gross Margin/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/GMROI/).length).toBeGreaterThan(0);
  });
});
