import { v4 as uuidv4 } from "uuid";
import Result from "../Result/Result";
import "./ResultBoard.css";

const ResultBoard = ({ message, type, results }) => {
  return (
    <div className="ResultBoard">
      <p className="ResultBoard-header">{message}</p>
      <div className="ResultBoard-holder">
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
      </div>
    </div>
  );
};

export default ResultBoard;
