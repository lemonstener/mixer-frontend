import axios from "axios";
import { useState } from "react/cjs/react.development";
import ResultBoard from "../ResultBoard/ResultBoard";

const CocktailSearch = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState(null);

  const searchTerm = async (string) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:3001/cocktails/like/${string}`
      );
      setMessage(`Cocktails matching the term '${string}'`);
      setData(res.data);
    } catch (error) {
      setMessage(`Nothing matching the term '${string}'`);
      setData([]);
    }
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchTerm(term);
    setTerm("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ex. 'Long Island'"
          value={term}
          onChange={handleChange}
        />
        <button>Search</button>
      </form>
      {data.length > 1 && (
        <ResultBoard message={message} results={data} type="cocktails" />
      )}
    </div>
  );
};

export default CocktailSearch;
