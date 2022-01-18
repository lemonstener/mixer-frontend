import { BrowserRouter } from "react-router-dom";
import RouteList from "./Navbar/RouteList";
import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { decodeToken, Jwt } from "react-jwt";
import UserContext from "./UserContext";
import Loading from "./Loading/Loading";
import { BASE_URL } from "./helpers/helpers";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.mixer);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          const { username } = decodeToken(token);
          const res = await axios.get(`${BASE_URL}/users/${username}`);

          const userFavorites = res.data.favorites.map((f) => f.id);
          setFavorites(userFavorites);
          setUser(res.data.username);
        } catch (error) {
          setUser(null);
        }
      }
      setLoading(false);
    };
    getCurrentUser();
  }, [token]);

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/users/login`, {
        username,
        password,
      });
      const resToken = res.data._token;
      setToken(resToken);
      localStorage.setItem("mixer", resToken);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const register = async (username, password, email) => {
    try {
      const res = await axios.post(`${BASE_URL}/users/register`, {
        username,
        password,
        email,
      });
      const resToken = res.data._token;
      setToken(resToken);
      localStorage.setItem("mixer", resToken);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setFavorites([]);
    localStorage.clear();
  };

  const favCocktail = async (id) => {
    if (!token) return;
    if (favorites.includes(id)) {
      const idx = favorites.indexOf(id);
      favorites.splice(idx, 1);
    } else {
      favorites.push(id);
    }
    const res = await axios.post(`${BASE_URL}/cocktails/favorite/${id}`, {
      _token: token,
    });
  };

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, favorites, favCocktail }}>
        <Navbar logout={logout} />
        <RouteList login={login} register={register} />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
