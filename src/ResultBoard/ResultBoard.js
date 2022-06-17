import { v4 as uuidv4 } from "uuid";
import Result from "../Result/Result";
import "./ResultBoard.css";

const ResultBoard = ({ message, type, results }) => {
  return (
    <div className="ResultBoard">
      <h1 className="ResultBoard-header">{message}</h1>
      <ul className="ResultBoard-holder">
        {results.map((r) => {
          return (
            <Result
              key={uuidv4()}
              type={type}
              name={r.name}
              id={r.id}
              img={type === "ingredients" ? r.img_lg : r.img}
              likes={r.likes || null}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ResultBoard;
