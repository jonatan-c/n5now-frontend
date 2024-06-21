import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ProductPage from "../pages/ProductPage";
import { ErrorBoundary } from "../utils/ErrorBoundaries";
import FallbackComponent from "./FallbackComponent";

vi.mock("../pages/ProductPage", () => {
  return {
    default: () => {
      throw new Error("Simulated error");
    },
  };
});

describe("FallbackComponent", () => {
  it("displays when ProductPage throws an error", () => {
    const screen = render(
      <ErrorBoundary fallBackComponent={<FallbackComponent />}>
        <ProductPage />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Whoops!")).toBeInTheDocument();
    expect(
      screen.getByText("Something went wrong. Please try again later."),
    ).toBeInTheDocument();
  });
});
