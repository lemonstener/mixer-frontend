import { useParams } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import "./Ingredient.css";
import ResultBoard from "../ResultBoard/ResultBoard";

const Ingredient = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:3001/ingredients/cocktails/name/${name}`
        );
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return "Loading...";

  if (error)
    return (
      <h1 style={{ color: "white" }}>
        There are currently no cocktails made with {name}
        in the database
      </h1>
    );

  return (
    <>
      <div className="Ingredient">
        <img src={data.img_md} alt={data.name} />
      </div>
      <ResultBoard
        message={`Cocktails with ${`${
          name[0].toUpperCase() + name.substring(1, name.length)
        }`}`}
        results={data.cocktails}
        type="cocktails"
      />
    </>
  );
};

export default Ingredient;
