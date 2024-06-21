import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { CartContext } from "../context/CartContext";
import ProductPage from "./ProductPage";

const mockProducts = [
  { name: "Product 1", amount: 3, price: 10 },
  { name: "Product 2", amount: 5, price: 15 },
];

describe("ProductPage", () => {
  it("renders a list of products", () => {
    const { getByText } = render(
      <CartContext.Provider value={{ products: mockProducts }}>
        <ProductPage />
      </CartContext.Provider>,
    );

    // Verificar que cada producto se renderiza
    mockProducts.forEach((product) => {
      expect(getByText(product.name)).toBeInTheDocument();
      expect(getByText(`Price: $${product.price}`)).toBeInTheDocument();
      expect(getByText(`Amount: ${product.amount}`)).toBeInTheDocument();
    });
  });
});
