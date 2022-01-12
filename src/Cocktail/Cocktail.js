import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { v4 as uuidv4 } from "uuid";
import "./Cocktail.css";

const Cocktail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigateTo = async (string) => {
    navigate(`/ingredients/details/${string.toLowerCase()}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:3001/cocktails/name/${name}`
        );
        setData(res.data);
        setLoading(false);
      } catch (error) {
        navigate("/");
      }
    };
    getData();
  }, []);

  if (loading) return "Loading...";

  return (
    <div className="Cocktail">
      <div className="Cocktail-title">{data.name}</div>
      <div className="Cocktail-contents">
        <div
          className="Cocktail-img"
          style={{ backgroundImage: `url(${data.img})` }}
        ></div>
        <div className="Cocktail-ingredients">
          {data.ingredients.map((i) => {
            return (
              <div
                onClick={() => navigateTo(i.name)}
                key={uuidv4()}
                className="Cocktail-ingredient"
              >
                <img src={`${i.img_sm}`} />
                <div>
                  {i.measure !== "null" && `${i.measure} ${i.name}`}
                  {i.measure === "null" && `${i.name}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Cocktail-instructions">{data.instructions}</div>
    </div>
  );
};

export default Cocktail;
