import { Routes, Route } from "react-router-dom";
import AllResults from "../AllResults/AllResults";
import Homepage from "../Homepage/Homepage";
import Search from "../Search/Search";

const RouteList = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route
        exact
        path="/cocktails"
        element={<AllResults type="cocktails" />}
      />
      <Route
        exact
        path="/ingredients"
        element={<AllResults type="ingredients" />}
      />
      <Route
        exact
        path="/cocktails/search"
        element={<Search type="cocktails" />}
      />
      <Route
        exact
        path="/ingredients/search"
        element={<Search type="ingredients" />}
      />
    </Routes>
  );
};

export default RouteList;
