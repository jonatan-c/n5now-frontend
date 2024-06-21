import { render } from "@testing-library/react";

import AddProductPage from "./AddProductPage";

describe("AddProductPage", () => {
  it("renders correctly", () => {
    const screen = render(<AddProductPage />);
    expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount:/i)).toBeInTheDocument();
  });
});
