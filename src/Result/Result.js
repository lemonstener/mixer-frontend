import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = ({ id, name, type, img, likes }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/${type}/details/${id}`);
  };
  return (
    <div onClick={navigateTo} className="Result">
      <div
        className="Result-thumb"
        style={{ backgroundImage: `url(${img.replace(/ /g, "%20")})` }}
      ></div>
      <div className="Result-name">{name}</div>
    </div>
  );
};

export default Result;
