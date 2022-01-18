import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { v4 as uuidv4 } from "uuid";
import Loading from "../Loading/Loading";
import UserContext from "../UserContext";
import "./Cocktail.css";

const Cocktail = () => {
  const { user, favorites, favCocktail } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [instructions, setInstructions] = useState([]);

  const navigateTo = async (int) => {
    navigate(`/ingredients/details/${int}`);
  };

  const splitInstructions = (text) => {
    let array = [];
    if (text.includes("1)")) {
      const copy = text.replaceAll(")", ".");
      array = copy.split(/\r\n|\n\r|\n|\r/);
    } else if (text.includes("1.")) {
      array = [text];
    } else {
      array = text.split(". ");
    }
    return array;
  };

  const updateCocktail = () => {
    if (!user) return;
    setLiked((liked) => !liked);
    const dataCopy = data;
    liked === true ? dataCopy.likes-- : dataCopy.likes++;
    setData(dataCopy);
    favCocktail(data.id);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://mixerdb.herokuapp.com/cocktails/id/${id}`
        );
        setData(res.data);
        const text = splitInstructions(res.data.instructions);
        setInstructions(text);
        if (favorites.includes(res.data.id)) setLiked(true);
        setLoading(false);
      } catch (error) {
        navigate("/");
      }
    };
    getData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="Cocktail">
      <div className="Cocktail-title">{data.name}</div>

      <img src={data.img} />
      <div className="Cocktail-ingredients">
        {data.ingredients.map((i) => {
          return (
            <div
              onClick={() => navigateTo(i.id)}
              key={uuidv4()}
              className="Cocktail-ingredient"
            >
              <img src={i.img_sm} />
              <div className="Cocktail-measure">
                {i.measure !== "null" && `${i.measure} ${i.name}`}
                {i.measure === "null" && `${i.name}`}
              </div>
            </div>
          );
        })}
      </div>

      <div onClick={updateCocktail} className="Cocktail-likes">
        {liked === true ? (
          <i className="fas fa-heart"></i>
        ) : (
          <i className="far fa-heart"></i>
        )}
        : {data.likes}
      </div>
      <div className="Cocktail-instructions">
        <h3>Instructions</h3>
        {instructions.length > 1 &&
          instructions.map((i) => {
            return (
              <p key={uuidv4()}>{i[i.length - 1] === "." ? i : i + "."}</p>
            );
          })}
        {instructions.length === 1 && <p>{data.instructions}</p>}
      </div>
    </div>
  );
};

export default Cocktail;
