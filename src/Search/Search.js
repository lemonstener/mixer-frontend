import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import ResultBoard from "../ResultBoard/ResultBoard";
import "./Search.css";

const Search = ({ type }) => {
  const word = type[0].toUpperCase() + type.substring(1, type.length);
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState(null);

  const searchTerm = async (string) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:3001/${type}/like/${string}`
      );
      setMessage(`${word} that match the term '${string}'`);
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
    <div className="Search">
      <form className="Search-form" onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={handleChange} />
        <button>Search</button>
      </form>
      <ResultBoard message={message} results={data} type={type} />
    </div>
  );
};

export default Search;
