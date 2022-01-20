import axios from "axios";
import { useState } from "react";
import ResultBoard from "../ResultBoard/ResultBoard";
import Loading from "../Loading/Loading";
import { BASE_URL } from "../helpers/helpers";

const IngredientSearch = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchTerm = async (string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/ingredients/like/${string}`);
      setMessage(`Ingredients matching the term '${string}'`);
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
    <>
      <form onSubmit={handleSubmit}>
        <p style={{ fontSize: "2vh" }}>Type the ingredient name here</p>
        <input
          type="text"
          placeholder="ex. 'Vodka'"
          value={term}
          onChange={handleChange}
        />
        <button>Search</button>
      </form>
      {loading === true && <Loading />}
      {loading === false && (
        <ResultBoard message={message} results={data} type="ingredients" />
      )}
    </>
  );
};

export default IngredientSearch;
