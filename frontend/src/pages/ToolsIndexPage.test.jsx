import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ToolsIndexPage from "./ToolsIndexPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

describe("ToolsIndexPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><ToolsIndexPage /></MemoryRouter>);
    expect(screen.getByText("Free Inventory Tools")).toBeInTheDocument();
  });

  it("lists all tool cards", () => {
    render(<MemoryRouter><ToolsIndexPage /></MemoryRouter>);
    expect(screen.getByText("Safety Stock Calculator")).toBeInTheDocument();
    expect(screen.getByText("EOQ Calculator")).toBeInTheDocument();
    expect(screen.getByText("Reorder Point Calculator")).toBeInTheDocument();
  });

  it("links to individual tool pages", () => {
    render(<MemoryRouter><ToolsIndexPage /></MemoryRouter>);
    const link = screen.getByText("Safety Stock Calculator").closest("a");
    expect(link).toHaveAttribute("href", "/tools/safety-stock");
  });
});
