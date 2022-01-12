import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./Nav/RouteList";

function App() {
  return (
    <BrowserRouter>
      <RouteList />
    </BrowserRouter>
  );
}

export default App;
