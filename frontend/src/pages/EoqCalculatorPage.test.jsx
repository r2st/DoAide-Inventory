import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import EoqCalculatorPage from "./EoqCalculatorPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

describe("EoqCalculatorPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><EoqCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("EOQ Calculator")).toBeInTheDocument();
  });

  it("shows input fields", () => {
    render(<MemoryRouter><EoqCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("Annual Demand (units)")).toBeInTheDocument();
    expect(screen.getByText("Cost per Order ($)")).toBeInTheDocument();
    expect(screen.getByText("Holding Cost per Unit/Year ($)")).toBeInTheDocument();
  });

  it("displays the EOQ result", () => {
    render(<MemoryRouter><EoqCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("Economic Order Quantity")).toBeInTheDocument();
    expect(screen.getByText("Orders per Year")).toBeInTheDocument();
    expect(screen.getByText("Total Annual Cost")).toBeInTheDocument();
  });
});
