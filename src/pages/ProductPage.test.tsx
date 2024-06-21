import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { CartContext } from "../context/CartContext";
import ProductPage from "./ProductPage";

const mockProducts = [
  { id: 1, name: "Product 1", amount: 3, price: 10 },
  { id: 2, name: "Product 2", amount: 5, price: 15 },
];

const mockRemoveFromCart = vi.fn();
const mockIncrementQuantity = vi.fn();
const mockDecrementQuantity = vi.fn();
const mockPurchaseCart = vi.fn();
const mockClearCart = vi.fn();

const mockAddToCart = vi.fn();
const mockAddProduct = vi.fn();

describe("ProductPage", () => {
  it("renders a list of products", () => {
    const { getByText } = render(
      <CartContext.Provider
        value={{
          cartItems: [],
          removeFromCart: mockRemoveFromCart,
          incrementQuantity: mockIncrementQuantity,
          decrementQuantity: mockDecrementQuantity,
          purchaseCart: mockPurchaseCart,
          clearCart: mockClearCart,
          products: mockProducts,
          addToCart: mockAddToCart,
          addProduct: mockAddProduct,
        }}
      >
        <ProductPage />
      </CartContext.Provider>,
    );

    mockProducts.forEach((product) => {
      expect(getByText(product.name)).toBeInTheDocument();
      expect(getByText(`Price: $${product.price}`)).toBeInTheDocument();
      expect(getByText(`Amount: ${product.amount}`)).toBeInTheDocument();
    });
  });
});
