import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Cart from "./Cart";

interface NavbarProps {
  toggleTheme: () => void;
  theme: string;
}

export default function Navbar({ toggleTheme, theme }: NavbarProps) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [optionsDropdownIsOpen, setOptionsDropdownIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleDropdown = () => setDropdownIsOpen(!dropdownIsOpen);
  const toggleOptionsDropdown = () =>
    setOptionsDropdownIsOpen(!optionsDropdownIsOpen);

  const closeDropdown = () => setDropdownIsOpen(false);

  const desktopMediaQuery = window.matchMedia("(min-width: 768px)");
  desktopMediaQuery.addEventListener("change", (e) => {
    if (!e.matches) {
      console.log("Media query changed to mobile");
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });

  useEffect(() => {
    if (!desktopMediaQuery.matches) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className="navbar">
      <div className="logo">N5Now Shop</div>
      <button className="btn-theme" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {isMobile && (
        <>
          <div style={{ color: "white" }} onClick={toggleOptionsDropdown}>
            ☰
          </div>
          {optionsDropdownIsOpen && (
            <div className="options-dropdown">
              <NavLink to="/" onClick={() => setOptionsDropdownIsOpen(false)}>
                Product List
              </NavLink>
              <NavLink
                to="/add-product"
                onClick={() => setOptionsDropdownIsOpen(false)}
              >
                Add Product
              </NavLink>
            </div>
          )}
        </>
      )}
      {!isMobile && (
        <>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Product List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-product"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Add Product
              </NavLink>
            </li>
          </ul>
        </>
      )}
      <div className="cart-container">
        <div className="cart-icon" onClick={toggleDropdown}></div>
        {dropdownIsOpen && <Cart closeDropdown={closeDropdown} />}
      </div>
    </div>
  );
}
