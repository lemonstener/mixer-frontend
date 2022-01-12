import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = ({ id, name, type, img, likes }) => {
  const navigate = useNavigate();

  const navigateTo = (string) => {
    navigate(`/${type}/details/${string.toLowerCase()}`);
  };
  return (
    <div onClick={() => navigateTo(name)} className="Result">
      <div
        className="Result-thumb"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="Result-name">{name}</div>
    </div>
  );
};

export default Result;
