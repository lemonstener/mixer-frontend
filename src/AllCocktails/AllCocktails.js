import axios from "axios";
import { useEffect, useState } from "react/cjs/react.development";
import ResultBoard from "../ResultBoard/ResultBoard";

const AllCocktails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://127.0.0.1:3001/cocktails`);
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return "Loading...";

  return (
    <div>
      <ResultBoard
        message={`Here are all of the cocktails from our database`}
        type="cocktails"
        results={data}
      />
    </div>
  );
};

export default AllCocktails;
