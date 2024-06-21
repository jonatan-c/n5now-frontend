import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import { CartContext } from "../context/CartContext";
import Cart from "./Cart";

const mockCloseDropdown = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockIncrementQuantity = vi.fn();
const mockDecrementQuantity = vi.fn();
const mockPurchaseCart = vi.fn();
const mockClearCart = vi.fn();

const mockAddToCart = vi.fn();
const mockAddProduct = vi.fn();

const mockContextValue = {
  cartItems: [
    { product: { name: "Product 1", price: 10 }, quantity: 1 },
    { product: { name: "Product 2", price: 20 }, quantity: 2 },
  ],
  removeFromCart: mockRemoveFromCart,
  incrementQuantity: mockIncrementQuantity,
  decrementQuantity: mockDecrementQuantity,
  purchaseCart: mockPurchaseCart,
  clearCart: mockClearCart,
  products: [],
  addToCart: mockAddToCart,
  addProduct: mockAddProduct,
};

describe("Cart Component", () => {
  it("renders cart items correctly", () => {
    const screen = render(
      <CartContext.Provider value={mockContextValue}>
        <Cart closeDropdown={mockCloseDropdown} />
      </CartContext.Provider>,
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Total: $50.00")).toBeInTheDocument();
  });

  it("calls incrementQuantity when + button is clicked", () => {
    const screen = render(
      <CartContext.Provider value={mockContextValue}>
        <Cart closeDropdown={mockCloseDropdown} />
      </CartContext.Provider>,
    );

    fireEvent.click(screen.getAllByText("+")[0]);
    expect(mockIncrementQuantity).toHaveBeenCalledWith(
      mockContextValue.cartItems[0].product,
    );
  });

  it("calls decrementQuantity when - button is clicked", () => {
    const screen = render(
      <CartContext.Provider value={mockContextValue}>
        <Cart closeDropdown={mockCloseDropdown} />
      </CartContext.Provider>,
    );

    fireEvent.click(screen.getAllByText("-")[0]);

    expect(mockDecrementQuantity).toHaveBeenCalledWith(
      mockContextValue.cartItems[0].product,
    );
  });

  it("calls removeFromCart when Remove button is clicked", () => {
    const screen = render(
      <CartContext.Provider value={mockContextValue}>
        <Cart closeDropdown={mockCloseDropdown} />
      </CartContext.Provider>,
    );

    fireEvent.click(screen.getAllByText("Remove")[0]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(
      mockContextValue.cartItems[0].product,
    );
  });

  it("calls purchaseCart when Purchase button is clicked", () => {
    const screen = render(
      <CartContext.Provider value={mockContextValue}>
        <Cart closeDropdown={mockCloseDropdown} />
      </CartContext.Provider>,
    );

    fireEvent.click(screen.getByText("Purchase"));
    expect(mockPurchaseCart).toHaveBeenCalled();
  });

  it("calls clearCart when Clear button is clicked", () => {
    const screen = render(
      <CartContext.Provider value={mockContextValue}>
        <Cart closeDropdown={mockCloseDropdown} />
      </CartContext.Provider>,
    );

    fireEvent.click(screen.getByText("Clear"));
    expect(mockClearCart).toHaveBeenCalled();
  });
});
