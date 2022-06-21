import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../helpers/helpers";
import Loading from "../Loading/Loading";
import ResultBoard from "../ResultBoard/ResultBoard";

const Random = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCocktails = async () => {
      const res = await axios.get(`${BASE_URL}/cocktails/random`);
      setCocktails(res.data);
      setLoading(false);
    };

    getCocktails();
  }, []);

  if (loading) return <Loading />;
  return (
    <ResultBoard
      message="Here are 20 random cocktails"
      type="cocktails"
      results={cocktails}
    />
  );
};

export default Random;
