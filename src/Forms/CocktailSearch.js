import axios from "axios";
import { useState } from "react/cjs/react.development";
import Loading from "../Loading/Loading";
import ResultBoard from "../ResultBoard/ResultBoard";

const CocktailSearch = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchTerm = async (string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://mixerdb.herokuapp.com/cocktails/like/${string}`
      );
      setMessage(`Cocktails matching the term '${string}'`);
      setData(res.data);
    } catch (error) {
      setMessage(`Nothing matching the term '${string}'`);
      setData([]);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (term.trim() === "") return;
    await searchTerm(term);
    setTerm("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p style={{ fontSize: "2vh" }}>Type the cocktail name here</p>
        <input
          type="text"
          placeholder="ex. 'Long Island'"
          value={term}
          onChange={handleChange}
        />
        <button>Search</button>
      </form>

      {loading === true && <Loading />}
      {loading === false && (
        <ResultBoard message={message} results={data} type="cocktails" />
      )}
    </div>
  );
};

export default CocktailSearch;
