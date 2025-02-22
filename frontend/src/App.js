import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dashboard from "./Components/Dashboard.js";
import Login from "./Components/Login.js";
import Cart from "./Components/Cart.js";
import Favorites from "./Components/Favorites.js";
import OrderConfo from "./Components/OrderConfo.js";
import Products from "./Components/Products.js";
import Layout from "./Components/Layout.js";
import Home from "./Components/Home.js";
import AddressForm from "./Components/AddressForm.js";
import PaymentForm from "./Components/PaymentForm.js";

function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <Layout>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="fade"
          timeout={300}
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            <Routes location={location}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/favorite" element={<Favorites />} />
              <Route path="/oconfo" element={<OrderConfo />} />
              <Route path="/address" element={<AddressForm />} />
              <Route path="/payments" element={<PaymentForm />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Layout>
  );
}

export default App;
