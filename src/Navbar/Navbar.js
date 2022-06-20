import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import UserContext from "../UserContext";
import "./Navbar.css";

const Navbar = ({ logout }) => {
  const { user } = useContext(UserContext);

  const [searchDropdown, setSearchDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const prepareLogout = () => {
    setSearchDropdown(false);
    setMobileMenu(false);
    logout();
    window.scrollTo(0, 0);
  };

  return (
    <header>
      <NavLink to="/">
        <div onClick={() => setMobileMenu(false)} className="Navbar-logo" />
      </NavLink>
      <nav>
        {/* Desktop menu */}
        <ul className="Navbar-desktop">
          <li>
            <NavLink to="/cocktails">Cocktails</NavLink>
          </li>
          <li>
            <button onClick={() => setSearchDropdown(!searchDropdown)}>
              Search
              {searchDropdown && <span>▼</span>}
              {!searchDropdown && <span>▲</span>}
            </button>
            {searchDropdown && (
              <ul className="Navbar-search-dropdown">
                <li onClick={() => setSearchDropdown(!searchDropdown)}>
                  <NavLink to="/cocktails/search">Cocktails</NavLink>
                </li>
                <li onClick={() => setSearchDropdown(!searchDropdown)}>
                  <NavLink to="/ingredients/search">Ingredients</NavLink>
                </li>
              </ul>
            )}
          </li>

          {!user && (
            <li>
              <NavLink to="/login">Sign in</NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink to="/profile">{user}</NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink onClick={prepareLogout} to="/">
                Logout
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile menu */}
        <div
          className="Navbar-hamburger"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu && (
            <>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </>
          )}
          {!mobileMenu && (
            <>
              <div></div>
              <div></div>
              <div></div>
            </>
          )}
        </div>
        {mobileMenu && (
          <ul className="Navbar-mobile">
            <li>
              <NavLink
                onClick={() => setMobileMenu(!mobileMenu)}
                to="/cocktails"
              >
                Cocktails
              </NavLink>
            </li>
            <li>
              <button onClick={() => setSearchDropdown(!searchDropdown)}>
                Search
                {searchDropdown && <span>▼</span>}
                {!searchDropdown && <span>▲</span>}
              </button>
              {searchDropdown && (
                <ul className="Navbar-search-dropdown-mobile">
                  <li onClick={() => setMobileMenu(!mobileMenu)}>
                    <NavLink to="/cocktails/search">Cocktails</NavLink>
                  </li>
                  <li onClick={() => setMobileMenu(!mobileMenu)}>
                    <NavLink to="/ingredients/search">Ingredients</NavLink>
                  </li>
                </ul>
              )}
            </li>

            {!user && (
              <li>
                <NavLink onClick={() => setMobileMenu(!mobileMenu)} to="/login">
                  Sign in
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  onClick={() => setMobileMenu(!mobileMenu)}
                  to="/profile"
                >
                  {user}
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink onClick={prepareLogout} to="/">
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
