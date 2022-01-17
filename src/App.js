import { BrowserRouter } from "react-router-dom";
import RouteList from "./Navbar/RouteList";
import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { decodeToken, Jwt } from "react-jwt";
import UserContext from "./UserContext";
import Loading from "./Loading/Loading";

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
          const res = await axios.get(
            `http://127.0.0.1:3001/users/${username}`
          );

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
      const res = await axios.post(`http://127.0.0.1:3001/users/login`, {
        username,
        password,
      });
      console.log(res);
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
      const res = await axios.post(`http://127.0.0.1:3001/users/register`, {
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
    setFavorites(null);
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
    const res = await axios.post(
      `http://127.0.0.1:3001/cocktails/favorite/${id}`,
      {
        _token: token,
      }
    );
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
