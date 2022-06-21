import { Routes, Route } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import Cocktail from "../Cocktail/Cocktail";
import Ingredient from "../Ingredient/Ingredient";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";
import CocktailSearch from "../Forms/CocktailSearch";
import IngredientSearch from "../Forms/IngredientSearch";
import AllCocktails from "../AllCocktails/AllCocktails";
import Profile from "../Profile/Profile";
import Random from "../Random/Random";

const RouteList = ({ login, register }) => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/random" element={<Random />} />
      <Route exact path="/cocktails/details/:id" element={<Cocktail />} />
      <Route exact path="/cocktails/search" element={<CocktailSearch />} />
      <Route exact path="/cocktails" element={<AllCocktails />} />
      <Route exact path="/ingredients/details/:id" element={<Ingredient />} />
      <Route exact path="/ingredients/search" element={<IngredientSearch />} />
      <Route
        exact
        path="/register"
        element={<RegisterForm register={register} />}
      />
      <Route exact path="/login" element={<LoginForm login={login} />} />
      <Route exact path="/logout" />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default RouteList;
