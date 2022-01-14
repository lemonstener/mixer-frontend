import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./Navbar/RouteList";
import Navbar from "./Navbar/Navbar";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.jobly);
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
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

  return (
    <BrowserRouter>
      <Navbar />
      <RouteList />
    </BrowserRouter>
  );
}

export default App;
