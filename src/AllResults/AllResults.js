import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import ResultBoard from "../ResultBoard/ResultBoard";
import "./AllResults.css";

const AllResults = ({ type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://127.0.0.1:3001/${type}`);
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return "Loading...";

  return (
    <div className="AllResults">
      <ResultBoard
        message={`Here are all of the ${type} from our database`}
        type={type}
        results={data}
      />
    </div>
  );
};

export default AllResults;
