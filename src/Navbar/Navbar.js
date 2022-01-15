import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import UserContext from "../UserContext";
import "./Navbar.css";

const Navbar = ({ logout }) => {
  const { user } = useContext(UserContext);
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
        <div className="Navbar-btn">
          <NavLink to="/cocktails">All Cocktails</NavLink>
        </div>

        <div className="Navbar-btn" onClick={dropdownCocktails}>
          Search{" "}
          {toggleCocktails === true && (
            <div className="Navbar-toggle-menu">
              <div className="Navbar-toggle">
                <NavLink to="/cocktails/search">by Cocktail</NavLink>
              </div>
              <div className="Navbar-toggle">
                <NavLink to="/ingredients/search">by Ingredient</NavLink>
              </div>
            </div>
          )}
        </div>

        {!user && (
          <div className="Navbar-btn">
            <NavLink to="/login">Sign in</NavLink>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
