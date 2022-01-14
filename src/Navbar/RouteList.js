import { Routes, Route } from "react-router-dom";
import AllResults from "../AllResults/AllResults";
import Homepage from "../Homepage/Homepage";
import Search from "../Search/Search";
import Cocktail from "../Cocktail/Cocktail";
import Ingredient from "../Ingredient/Ingredient";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";

const RouteList = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/cocktails/details/:id" element={<Cocktail />} />
      <Route
        exact
        path="/cocktails/search"
        element={<Search type="cocktails" />}
      />
      <Route
        exact
        path="/cocktails"
        element={<AllResults type="cocktails" />}
      />
      <Route exact path="/ingredients/details/:id" element={<Ingredient />} />
      <Route
        exact
        path="/ingredients"
        element={<AllResults type="ingredients" />}
      />
      <Route
        exact
        path="/ingredients/search"
        element={<Search type="ingredients" />}
      />
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/register" element={<RegisterForm />} />
    </Routes>
  );
};

export default RouteList;
