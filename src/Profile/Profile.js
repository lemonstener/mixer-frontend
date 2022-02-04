import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../helpers/helpers";
import Loading from "../Loading/Loading";
import ResultBoard from "../ResultBoard/ResultBoard";
import UserContext from "../UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      if (!user) navigate("/");
      const res = await axios.get(`${BASE_URL}/users/${user}`);
      setData(res.data.favorites);
      setLoading(false);
    };
    getUserData();
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          textShadow:
            "1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000",
        }}
      >
        {user}
      </h1>
      {data.length === 0 && <p>You have not favorited any cocktails.</p>}
      {data.length > 0 && (
        <ResultBoard
          message={`Your favorite cocktails`}
          results={data}
          type="cocktails"
        />
      )}
    </div>
  );
};

export default Profile;
