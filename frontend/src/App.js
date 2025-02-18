import "./App.css";
import "./index.css";
import Dashboard from "./Components/Dashboard.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login.js";
import Cart from "./Components/Cart.js";
import Favorites from "./Components/Favorites.js";
import OrderConfo from "./Components/OrderConfo.js";
import Products from "./Components/Products.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/oconfo" element={<OrderConfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
