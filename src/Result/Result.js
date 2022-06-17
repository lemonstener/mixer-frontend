import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = ({ id, name, type, img, likes }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/${type}/details/${id}`);
  };
  return (
    <li onClick={navigateTo} className="Result">
      <img className="Result-img" src={img.replace(/ /g, "%20")} />
      <p className="Result-name">{name}</p>
    </li>
  );
};

export default Result;
