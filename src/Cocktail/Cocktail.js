import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { v4 as uuidv4 } from "uuid";
import "./Cocktail.css";

const Cocktail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigateTo = async (int) => {
    navigate(`/ingredients/details/${int}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3001/cocktails/id/${id}`);
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
                onClick={() => navigateTo(i.id)}
                key={uuidv4()}
                className="Cocktail-ingredient"
              >
                <div
                  className="Cocktail-ingredient-img"
                  style={{
                    backgroundImage: `url(${i.img_sm.replace(/ /g, "%20")})`,
                  }}
                ></div>
                <div className="Cocktail-measure">
                  {i.measure !== "null" && `${i.measure} ${i.name}`}
                  {i.measure === "null" && `${i.name}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Cocktail-instructions">
        <h3>Instructions</h3>
        <p>{data.instructions}</p>
      </div>
    </div>
  );
};

export default Cocktail;
