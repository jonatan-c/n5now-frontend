import { render } from "@testing-library/react";
import { vi } from "vitest";

import { CartContext } from "../context/CartContext";
import AddProductPage from "./AddProductPage";

const mockAddProduct = vi.fn();

describe("AddProductPage", () => {
  it("renders correctly", () => {
    const screen = render(
      <CartContext.Provider value={{ addProduct: mockAddProduct }}>
        <AddProductPage />
      </CartContext.Provider>,
    );
    expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount:/i)).toBeInTheDocument();
  });
});
