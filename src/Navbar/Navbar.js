import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import UserContext from "../UserContext";
import "./Navbar.css";

const Navbar = ({ logout }) => {
  const { user } = useContext(UserContext);

  const [toggleCocktails, setToggleCocktails] = useState(false);

  const dropdownCocktails = (e) => {
    setToggleCocktails((toggleCocktails) => !toggleCocktails);
  };

  const prepareLogout = () => {
    setToggleCocktails(false);
    logout();
  };

  return (
    <>
      <nav className="Navbar">
        <div
          className="Navbar-logo-holder"
          onClick={() => setToggleCocktails(false)}
        >
          <NavLink to="/">
            <div className="Navbar-logo" />
          </NavLink>
        </div>

        <div className="Navbar-btn" onClick={() => setToggleCocktails(false)}>
          <NavLink to="/cocktails">Cocktails</NavLink>
        </div>

        <div className="Navbar-dropdown-btn" onClick={dropdownCocktails}>
          Search
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
          <div className="Navbar-btn" onClick={() => setToggleCocktails(false)}>
            <NavLink to="/login">Sign in</NavLink>
          </div>
        )}

        {user && (
          <>
            <div
              className="Navbar-btn"
              onClick={() => setToggleCocktails(false)}
            >
              <NavLink to="/profile">{user}</NavLink>
            </div>
            <div className="Navbar-btn" onClick={prepareLogout}>
              <NavLink to="/">Logout</NavLink>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
