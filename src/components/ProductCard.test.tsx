import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ProductCard from "./ProductCard";

const product = {
  id: 1,
  name: "Test Product",
  amount: 5,
  price: 10,
};

describe("ProductCard", () => {
  it("renders correctly", () => {
    const { getByText, getByRole } = render(<ProductCard product={product} />);

    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("Price: $10")).toBeInTheDocument();
    expect(getByText("Amount: 5")).toBeInTheDocument();
    expect(getByRole("spinbutton")).toHaveValue(1);
  });

  it("updates quantity on input change", () => {
    const { getByRole } = render(<ProductCard product={product} />);

    const quantityInput = getByRole("spinbutton");
    fireEvent.change(quantityInput, { target: { value: 3 } });
    expect(quantityInput).toHaveValue(3);
  });
});
