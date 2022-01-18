import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ResultBoard from "../ResultBoard/ResultBoard";

const Homepage = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCocktails = async () => {
      const res = await axios.get(
        "https://mixerdb.herokuapp.com/cocktails/random"
      );
      setCocktails(res.data);
      setLoading(false);
    };

    getCocktails();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <ResultBoard
        message="Let's get started with some random cocktails"
        type="cocktails"
        results={cocktails}
      />
    </div>
  );
};

export default Homepage;
