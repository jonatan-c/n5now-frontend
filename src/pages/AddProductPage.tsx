/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

import { CartContext } from "../context/CartContext";
import { schema } from "../schemas/schema.create-product";

interface IFormProduct {
  id?: string;
  name: string;
  amount: number;
  price: number;
}

const AddProductPage: React.FC = () => {
  const { addProduct } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<Partial<IFormProduct>> = (
    data: any,
  ): any => {
    addProduct({
      id: uuidv4(),
      name: data.name,
      amount: data.amount,
      price: data.price,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="add-product-form">
      <h2>Add New Product</h2>
      <div>
        <label htmlFor="name">Product Name:</label>
        <input id="name" type="text" {...register("name")} />
        <p style={{ color: "red" }}>{errors.name?.message}</p>
      </div>

      <div>
        <label htmlFor="amount">Amount:</label>
        <input id="amount" type="number" {...register("amount")} />
        <p style={{ color: "red" }}>{errors.amount?.message}</p>
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input id="price" type="number" {...register("price")} />
        <p style={{ color: "red" }}>{errors.price?.message}</p>
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductPage;
