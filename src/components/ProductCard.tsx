import React, { useContext, useState } from "react";
import Swal from "sweetalert2";

import { CartContext } from "../context/CartContext";
import { IProduct } from "../interfaces";
import Button from "./Button";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (quantity > product.amount) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Quantity exceeds available stock",
        timer: 2000,
      });
      return;
    }
    addToCart(product, quantity);
  };

  return (
    <div className="product-card">
      <h2 className="text">{product.name}</h2>
      <p className="text">Price: ${product.price}</p>
      <p className="text">Amount: {product.amount}</p>
      <input
        type="number"
        value={quantity}
        min="1"
        max={product.amount}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className=""
      />
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
