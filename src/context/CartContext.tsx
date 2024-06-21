import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

import { CartItem, IProduct } from "../interfaces";
import {
  getStoredCart,
  storeCart,
  getStoredProducts,
  storeProducts,
} from "../utils/storage";

interface CartContextProps {
  products: IProduct[];
  cartItems: CartItem[];
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (product: IProduct) => void;
  incrementQuantity: (product: IProduct) => void;
  decrementQuantity: (product: IProduct) => void;
  purchaseCart: () => void;
  clearCart: () => void;

  addProduct: (product: IProduct) => void;
}

const initialProducts: IProduct[] = [
  {
    id: uuidv4(),
    name: "Leche",
    amount: 10,
    price: 100,
  },
  {
    id: uuidv4(),
    name: "Pan",
    amount: 20,
    price: 50,
  },
  {
    id: uuidv4(),
    name: "Huevos",
    amount: 30,
    price: 10,
  },
  {
    id: uuidv4(),
    name: "Carne",
    amount: 5,
    price: 200,
  },
  {
    id: uuidv4(),
    name: "Pescado",
    amount: 3,
    price: 250,
  },
  {
    id: uuidv4(),
    name: "Arroz",
    amount: 15,
    price: 30,
  },
  {
    id: uuidv4(),
    name: "Frijoles",
    amount: 25,
    price: 20,
  },
  {
    id: uuidv4(),
    name: "Pasta",
    amount: 10,
    price: 40,
  },
  {
    id: uuidv4(),
    name: "Salsa",
    amount: 30,
    price: 15,
  },
  {
    id: uuidv4(),
    name: "Aceite",
    amount: 10,
    price: 70,
  },
];

export const CartContext = createContext<CartContextProps>({
  products: initialProducts,
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  purchaseCart: () => {},
  addProduct: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<IProduct[]>(
    getStoredProducts() || initialProducts,
  );
  const [cartItems, setCartItems] = useState<CartItem[]>(getStoredCart() || []);

  useEffect(() => {
    storeProducts(products);
  }, [products]);

  useEffect(() => {
    storeCart(cartItems);
  }, [cartItems]);

  const addToCart = (product: IProduct, quantity: number) => {
    if (product.amount >= quantity) {
      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, amount: p.amount - quantity } : p,
        ),
      );
      const existingCartItem = cartItems.find(
        (item) => item.product.id === product.id,
      );
      if (existingCartItem) {
        setCartItems(
          cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        );
      } else {
        setCartItems([...cartItems, { product, quantity }]);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Only ${product.amount} of ${product.name} available in stock.`,
        timer: 2000,
      });
    }
  };

  const removeFromCart = (product: IProduct) => {
    const existingCartItem = cartItems.find(
      (item) => item.product.id === product.id,
    );
    if (existingCartItem) {
      setProducts(
        products.map((p) =>
          p.id === product.id
            ? { ...p, amount: p.amount + existingCartItem.quantity }
            : p,
        ),
      );
      setCartItems(cartItems.filter((item) => item.product.id !== product.id));
    }
  };

  const incrementQuantity = (product: IProduct) => {
    const existingCartItem = cartItems.find(
      (item) => item.product.id === product.id,
    );
    if (existingCartItem && product.amount - existingCartItem.quantity > 0) {
      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, amount: p.amount - 1 } : p,
        ),
      );
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `No more stock available for ${product.name}`,
        timer: 2000,
      });
    }
  };

  const decrementQuantity = (product: IProduct) => {
    const existingCartItem = cartItems.find(
      (item) => item.product.id === product.id,
    );
    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        setProducts(
          products.map((p) =>
            p.id === product.id ? { ...p, amount: p.amount + 1 } : p,
          ),
        );
        setCartItems(
          cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        );
      } else if (existingCartItem.quantity === 1) {
        removeFromCart(product);
      }
    }
  };

  const purchaseCart = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Purchase successful",
      timer: 2000,
    });
    const updatedProducts = products.filter((p) => p.amount > 0);
    setProducts(updatedProducts);
    setCartItems([]);
    storeProducts(updatedProducts);
    storeCart([]);
  };

  const clearCart = () => {
    const updatedProducts = products.map((product) => {
      const cartItem = cartItems.find((item) => item.product.id === product.id);
      if (cartItem) {
        return { ...product, amount: product.amount + cartItem.quantity };
      }
      return product;
    });

    setProducts(updatedProducts);
    setCartItems([]);
    storeProducts(updatedProducts);
    storeCart([]);
  };

  const addProduct = (product: IProduct) => {
    try {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product added successfully",
        timer: 2000,
      });
      setProducts([...products, product]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error adding product",
        timer: 2000,
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cartItems,
        clearCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        purchaseCart,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
