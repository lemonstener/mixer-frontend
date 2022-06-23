import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Ingredient.css";
import ResultBoard from "../ResultBoard/ResultBoard";
import Loading from "../Loading/Loading";
import { BASE_URL } from "../helpers/helpers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Ingredient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/ingredients/cocktails/${id}`);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        navigate("/");
      }
    };
    getData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="Ingredient">
        <LazyLoadImage
          effect="blur"
          src={data.img_md.replaceAll(" ", "%20")}
          alt={data.name}
        />
      </div>
      {data.cocktails.length > 0 && (
        <ResultBoard
          message={`Cocktails with ${`${
            data.name[0].toUpperCase() +
            data.name.substring(1, data.name.length)
          }`}`}
          results={data.cocktails}
          type="cocktails"
        />
      )}
      {data.cocktails.length === 0 && (
        <p
          style={{
            color: "white",
            textAlign: "center",
            backgroundColor: "black",
            padding: "2px",
          }}
        >
          There are no cocktails with {data.name} in our database... yet
        </p>
      )}
    </>
  );
};

export default Ingredient;
