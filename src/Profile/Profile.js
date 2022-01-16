import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
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
      const res = await axios.get(`http://127.0.0.1:3001/users/${user}`);
      setData(res.data.favorites);
      setLoading(false);
    };
    getUserData();
  }, []);

  if (loading) return "Loading...";
  return (
    <>
      <h1>{user}</h1>
      <ResultBoard
        message={`${user}'s favorite cocktails`}
        results={data}
        type="cocktails"
      />
    </>
  );
};

export default Profile;
