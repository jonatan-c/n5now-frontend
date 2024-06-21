import { useContext } from "react";

import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { IProduct } from "../interfaces";

const ProductPage = () => {
  const { products } = useContext(CartContext);

  return (
    <>
      <div className="product-list ">
        {products.map((product: IProduct) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductPage;
