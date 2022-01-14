import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./Navbar/RouteList";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RouteList />
    </BrowserRouter>
  );
}

export default App;
