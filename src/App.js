import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./Navbar/RouteList";
import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { decodeToken, Jwt } from "react-jwt";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.mixer);
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const decodeToken = decodeToken(token);
          const userFavorites = await axios.get(
            `http://127.0.0.1:3001/users/favorites/${decodeToken.id}`
          );
          setFavorites(userFavorites);
          setUser(decodeToken.username);
        } catch (error) {
          setUser(null);
        }
      }
    };
  }, [token]);

  const login = async (data) => {
    try {
      const res = await axios.post(`http://127.0.0.1:3001/users/login`, {
        data,
      });
      setToken(res.data._token);
      localStorage.set("mixer", token);
      return { success: true };
    } catch (errors) {
      console.log(errors);
      return { success: false, errors };
    }
  };

  const register = async (data) => {
    try {
      const res = await axios.post(`http://127.0.0.1:3001/users/register`, {
        data,
      });
      setToken(res.data._token);
      localStorage.set("mixer", token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setFavorites(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar logout={logout} />
        <RouteList login={login} register={register} />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
