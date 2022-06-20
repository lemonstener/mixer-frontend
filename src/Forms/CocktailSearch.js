import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../helpers/helpers";
import Loading from "../Loading/Loading";
import ResultBoard from "../ResultBoard/ResultBoard";

const CocktailSearch = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  window.scrollTo(0, 0);

  const searchTerm = async (string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/cocktails/like/${string}`);
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
  };

  return (
    <div className="Form-holder">
      <form onSubmit={handleSubmit}>
        <label>Type the cocktail name here</label>
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
