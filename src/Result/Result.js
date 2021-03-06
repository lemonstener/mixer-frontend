import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = ({ id, name, type, img, likes }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    window.scrollTo(0, 0);
    navigate(`/${type}/details/${id}`);
  };
  return (
    <li onClick={navigateTo} className="Result">
      <LazyLoadImage
        aria-label={`View ${name} recipe`}
        alt={`Picture of cocktail ${name}`}
        className="Result-img"
        src={img.replace(/ /g, "%20")}
        placeholderSrc={img.replace(/ /g, "%20")}
        effect="blur"
      />
      <p className="Result-name">{name}</p>
    </li>
  );
};

export default Result;
