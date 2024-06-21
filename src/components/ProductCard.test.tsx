import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { CartContext } from "../context/CartContext";
import ProductCard from "./ProductCard";

const mockAddToCart = vi.fn();

const product = {
  id: 1,
  name: "Test Product",
  amount: 5,
  price: 10,
};

describe("ProductCard", () => {
  it("renders correctly", () => {
    const { getByText, getByRole } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <ProductCard product={product} />
      </CartContext.Provider>,
    );

    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("Price: $10")).toBeInTheDocument();
    expect(getByText("Amount: 5")).toBeInTheDocument();
    expect(getByRole("spinbutton")).toHaveValue(1);
  });

  it("calls addToCart when Add to Cart button is clicked", () => {
    const { getByText } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <ProductCard product={product} />
      </CartContext.Provider>,
    );

    fireEvent.click(getByText("Add to Cart"));
    expect(mockAddToCart).toHaveBeenCalledWith(product, 1);
  });

  it("updates quantity on input change", () => {
    const { getByRole } = render(
      <CartContext.Provider value={{ addToCart: mockAddToCart }}>
        <ProductCard product={product} />
      </CartContext.Provider>,
    );

    const quantityInput = getByRole("spinbutton");
    fireEvent.change(quantityInput, { target: { value: 3 } });
    expect(quantityInput).toHaveValue(3);
  });
});
