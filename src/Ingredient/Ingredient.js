import { useParams } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import axios from "axios";
import "./Ingredient.css";
import ResultBoard from "../ResultBoard/ResultBoard";
import Loading from "../Loading/Loading";

const Ingredient = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:3001/ingredients/cocktails/${id}`
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

  if (loading) return <Loading />;

  if (error)
    return (
      <h1>
        There are currently no cocktails made with {data.name}
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
          data.name[0].toUpperCase() + data.name.substring(1, data.name.length)
        }`}`}
        results={data.cocktails}
        type="cocktails"
      />
    </>
  );
};

export default Ingredient;
