import axios from "axios";
import { useEffect, useState } from "react";
import ResultBoard from "../ResultBoard/ResultBoard";
import "./Homepage.css";

const Homepage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCocktails = async () => {
      const res = await axios.get("http://127.0.0.1:3001/cocktails/random");
      setCocktails(res.data);
    };
    const getIngredients = async () => {
      const res = await axios.get("http://127.0.0.1:3001/ingredients/random");
      setIngredients(res.data);
      setLoading(false);
    };
    getCocktails();
    getIngredients();
  }, []);

  if (loading) return "Loading...";
  return (
    <div className="Homepage">
      <ResultBoard
        message="Here are some cocktails to start with"
        type="cocktails"
        results={cocktails}
      />
      <ResultBoard
        message="Here are some ingredients to start with"
        type="ingredients"
        results={ingredients}
      />
    </div>
  );
};

export default Homepage;
