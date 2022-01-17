import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = ({ id, name, type, img, likes }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/${type}/details/${id}`);
  };
  return (
    <div onClick={navigateTo} className="Result">
      <img className="Result-img" src={img.replace(/ /g, "%20")} />
      {/* <div
        className="Result-thumb"
        style={{ backgroundImage: `url(${img.replace(/ /g, "%20")})` }}
      ></div> */}
      <p className="Result-name">{name}</p>
    </div>
  );
};

export default Result;
