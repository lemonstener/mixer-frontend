import "./Result.css";

const Result = ({ id, name, type, img, likes }) => {
  return (
    <div className="Result">
      <div
        className="Result-thumb"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="Result-name">{name}</div>
    </div>
  );
};

export default Result;
