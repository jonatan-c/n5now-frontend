import { CartItem, IProduct } from "../interfaces";
import {
  getStoredCart,
  storeCart,
  getStoredProducts,
  storeProducts,
} from "./storage";

describe("storage.ts tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getStoredCart", () => {
    it("should return an empty array if nothing is stored", () => {
      expect(getStoredCart()).toEqual([]);
    });

    it("should return the stored cart", () => {
      const mockCart: CartItem[] = [
        {
          product: { id: 1, name: "Product 1", amount: 10, price: 10 },
          quantity: 2,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(mockCart));
      expect(getStoredCart()).toEqual(mockCart);
    });
  });

  describe("storeCart", () => {
    it("should store the cart correctly", () => {
      const mockCart: CartItem[] = [
        {
          product: { id: 1, name: "Product 1", amount: 10, price: 10 },
          quantity: 2,
        },
      ];
      storeCart(mockCart);
      expect(localStorage.getItem("cart")).toEqual(JSON.stringify(mockCart));
    });
  });

  describe("getStoredProducts", () => {
    it("should return null if nothing is stored", () => {
      expect(getStoredProducts()).toBeNull();
    });

    it("should return the stored products", () => {
      const mockProducts: IProduct[] = [
        {
          id: 1,
          name: "Product 1",
          amount: 10,
          price: 10,
        },
      ];
      localStorage.setItem("products", JSON.stringify(mockProducts));
      expect(getStoredProducts()).toEqual(mockProducts);
    });
  });

  describe("storeProducts", () => {
    it("should store the products correctly", () => {
      const mockProducts: IProduct[] = [
        {
          id: 1,
          name: "Product 1",
          amount: 10,
          price: 10,
        },
      ];
      storeProducts(mockProducts);
      expect(localStorage.getItem("products")).toEqual(
        JSON.stringify(mockProducts),
      );
    });
  });
});
