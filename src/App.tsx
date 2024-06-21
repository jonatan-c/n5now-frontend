import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

import "./App.scss";

import AddProductPage from "./pages/AddProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import { ErrorBoundary } from "./utils/ErrorBoundaries";
import FallbackComponent from "./components/FallbackComponent";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ErrorBoundary fallBackComponent={<FallbackComponent />}>
      <CartProvider>
        <div className={`app ${theme}`}>
          <Router>
            <Navbar toggleTheme={toggleTheme} theme={theme} />

            <Routes>
              <Route path="/" element={<ProductPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </div>
      </CartProvider>
    </ErrorBoundary>
  );
};

export default App;
