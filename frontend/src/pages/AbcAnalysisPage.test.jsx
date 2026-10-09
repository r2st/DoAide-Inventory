import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import AbcAnalysisPage from "./AbcAnalysisPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

describe("AbcAnalysisPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><AbcAnalysisPage /></MemoryRouter>);
    expect(screen.getByText("ABC Analysis Tool")).toBeInTheDocument();
  });

  it("shows input textarea and thresholds", () => {
    render(<MemoryRouter><AbcAnalysisPage /></MemoryRouter>);
    expect(screen.getByText("A Threshold (%)")).toBeInTheDocument();
    expect(screen.getByText("B Threshold (%)")).toBeInTheDocument();
  });

  it("displays ABC classification results with sample data", () => {
    render(<MemoryRouter><AbcAnalysisPage /></MemoryRouter>);
    expect(screen.getByText("Class A")).toBeInTheDocument();
    expect(screen.getByText("Class B")).toBeInTheDocument();
    expect(screen.getByText("Class C")).toBeInTheDocument();
  });

  it("renders the results table with sample items", () => {
    render(<MemoryRouter><AbcAnalysisPage /></MemoryRouter>);
    expect(screen.getByText("Widget Alpha")).toBeInTheDocument();
    expect(screen.getByText("Widget Theta")).toBeInTheDocument();
  });
});
