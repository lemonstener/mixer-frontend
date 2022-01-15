import axios from "axios";
import { useEffect, useState } from "react";
import ResultBoard from "../ResultBoard/ResultBoard";
import "./Homepage.css";

const Homepage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCocktails = async () => {
      const res = await axios.get("http://127.0.0.1:3001/cocktails/random");
      setCocktails(res.data);
      setLoading(false);
    };

    getCocktails();
  }, []);

  if (loading) return "Loading...";
  return (
    <div className="Homepage">
      <ResultBoard
        message="Here are some cocktails to start with"
        type="cocktails"
        results={cocktails}
      />
    </div>
  );
};

export default Homepage;
