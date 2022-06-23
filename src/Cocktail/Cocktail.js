import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../helpers/helpers";
import Loading from "../Loading/Loading";
import UserContext from "../UserContext";
import "./Cocktail.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Cocktail = () => {
  const { user, favorites, favCocktail } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [instructions, setInstructions] = useState([]);

  const navigateTo = async (int) => {
    window.scrollTo(0, 0);
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
    if (!user) {
      document.querySelector(".Cocktail-login-message").style.opacity = "1";
      return;
    }
    setLiked((liked) => !liked);
    const dataCopy = data;
    liked === true ? dataCopy.likes-- : dataCopy.likes++;
    setData(dataCopy);
    favCocktail(data.id);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/cocktails/id/${id}`);
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
  }, [favorites, id, navigate]);

  if (loading) return <Loading />;

  return (
    <div className="Cocktail">
      <h1>{data.name}</h1>

      <LazyLoadImage
        alt={`${data.name}`}
        className="Cocktail-img"
        src={data.img}
        effect="blur"
      />
      <h2>Ingredients:</h2>
      <ul className="Cocktail-ingredients">
        {data.ingredients.map((i) => {
          return (
            <li onClick={() => navigateTo(i.id)} key={uuidv4()}>
              {i.measure !== "null" && (
                <>
                  <span className="Cocktail-measure">{i.measure}</span>
                  <span
                    className="Cocktail-ingredient"
                    aria-label="View other cocktails with this ingredient"
                  >
                    {i.name}
                  </span>
                </>
              )}
              {i.measure === "null" && (
                <span
                  className="Cocktail-ingredient"
                  aria-label="View other cocktails with this ingredient"
                >
                  {i.name}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div onClick={updateCocktail} className="Cocktail-likes">
        {liked === true ? (
          <i
            aria-label="Add cocktail to favorites"
            className="fas fa-heart"
          ></i>
        ) : (
          <i
            aria-label="Remove cocktail from favorites"
            className="far fa-heart"
          ></i>
        )}
        : {data.likes}
      </div>
      <span className="Cocktail-login-message">
        Please login to add this cocktail to favorites
      </span>
      <h2>Directions:</h2>
      <ol className="Cocktail-instructions">
        {instructions.length > 1 &&
          instructions.map((i) => {
            return (
              <li key={uuidv4()}>{i[i.length - 1] === "." ? i : i + "."}</li>
            );
          })}
        {instructions.length === 1 && (
          <li className="Cocktail-paragraph">{data.instructions}</li>
        )}
      </ol>
    </div>
  );
};

export default Cocktail;
