import { NavLink, Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import "./Navbar.css";

const Navbar = () => {
  const [toggleIngredients, setToggleIngredients] = useState(false);
  const [toggleCocktails, setToggleCocktails] = useState(false);

  const dropdownCocktails = () => {
    setToggleCocktails((toggleCocktails) => !toggleCocktails);
    setToggleIngredients(false);
  };

  const dropdownIngredients = () => {
    setToggleIngredients((toggleIngredients) => !toggleIngredients);
    setToggleCocktails(false);
  };

  return (
    <>
      <nav className="Navbar">
        <div className="Navbar-btn">
          <NavLink to="/">Home</NavLink>
        </div>

        <div className="Navbar-btn" onClick={dropdownCocktails}>
          Cocktails{" "}
          {toggleCocktails === true && (
            <div className="Navbar-toggle-menu">
              <div className="Navbar-toggle">
                <NavLink to="/cocktails">All</NavLink>
              </div>
              <div className="Navbar-toggle">
                <NavLink to="/cocktails/search">Search</NavLink>
              </div>
            </div>
          )}
        </div>

        <div className="Navbar-btn" onClick={dropdownIngredients}>
          Ingredients{" "}
          {toggleIngredients === true && (
            <div className="Navbar-toggle-menu">
              <div className="Navbar-toggle">
                <NavLink to="/ingredients">All</NavLink>
              </div>
              <div className="Navbar-toggle">
                <NavLink to="/ingredients/search">Search</NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="Navbar-btn">
          <NavLink to="/login">Sign in</NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
