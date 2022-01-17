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

  return (
    <>
      <nav className="Navbar">
        <div className="Navbar-btn">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="Navbar-btn">
          <NavLink to="/cocktails">Cocktails</NavLink>
        </div>

        <div className="Navbar-btn" onClick={dropdownCocktails}>
          Search{" "}
          {toggleCocktails === true && (
            <div className="Navbar-toggle-menu">
              <div className="Navbar-toggle">
                <NavLink to="/cocktails/search">cocktails</NavLink>
              </div>
              <div className="Navbar-toggle">
                <NavLink to="/ingredients/search">ingredients</NavLink>
              </div>
            </div>
          )}
        </div>

        {!user && (
          <div className="Navbar-btn">
            <NavLink to="/login">Sign in</NavLink>
          </div>
        )}

        {user && (
          <>
            <div className="Navbar-btn">
              <NavLink to="/profile">{user}</NavLink>
            </div>
            <div className="Navbar-btn" onClick={logout}>
              <NavLink to="/">Logout</NavLink>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
