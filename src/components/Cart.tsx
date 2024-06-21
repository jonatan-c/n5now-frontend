import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import Button from "./Button";

interface Props {
  closeDropdown: () => void;
}

const Cart = ({ closeDropdown }: Props) => {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    purchaseCart,
    clearCart,
  } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="cart-dropdown">
      <span className="close-button" onClick={closeDropdown}>
        &times;
      </span>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.product.id} className="cart-item">
            <h3>{item.product.name}</h3>
            <p>Price: ${item.product.price.toFixed(2)}</p>
            <p>Total: ${item.product.price * item.quantity}</p>
            <div className="quantity-controls">
              <Button onClick={() => decrementQuantity(item.product)}>-</Button>
              <span>{item.quantity}</span>
              <button onClick={() => incrementQuantity(item.product)}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.product)}>Remove</button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <>
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button onClick={purchaseCart} className="purchase-button">
            Purchase
          </button>
          <button className="clear-button" onClick={clearCart}>
            Clear
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
