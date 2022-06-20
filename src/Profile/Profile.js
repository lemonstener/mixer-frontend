import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../helpers/helpers";
import Loading from "../Loading/Loading";
import ResultBoard from "../ResultBoard/ResultBoard";
import UserContext from "../UserContext";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  window.scrollTo(0, 0);

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
    <div className="Profile">
      <h1>
        Welcome back, <span>{user}</span>!
      </h1>
      {data.length === 0 && <h2>You have not favorited any cocktails.</h2>}
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
