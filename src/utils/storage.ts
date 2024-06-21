import { CartItem, IProduct } from "../interfaces";

const CART_KEY = "cart";
const PRODUCTS_KEY = "products";

export const getStoredCart = () => {
  const storedCart = localStorage.getItem(CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

export const storeCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const getStoredProducts = () => {
  const storedProducts = localStorage.getItem(PRODUCTS_KEY);
  return storedProducts ? JSON.parse(storedProducts) : null;
};

export const storeProducts = (products: IProduct[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};
