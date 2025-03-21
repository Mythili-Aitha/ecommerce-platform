import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./Components/Login.js";
import Cart from "./Components/Cart.js";
import Favorites from "./Components/Favorites.js";
import OrderConfo from "./Components/OrderConfo.js";
import Products from "./Components/Products.js";
import Layout from "./Components/Layout.js";
import Home from "./Components/Home.js";
import AddressForm from "./Components/AddressForm.js";
import PaymentForm from "./Components/PaymentForm.js";
import ProductDetails from "./Components/ProductDetails.js";
import OrderConfirmation from "./Components/OrderConfirmation.js";
import Orders from "./Components/Orders.js";
import OrderDetails from "./Components/OrderDetails.js";
import Profile from "./Components/Profile.js";
import History from "./Components/History.js";
import About from "./Components/About.js";
import Faq from "./Components/Faq.js";
import Contact from "./Components/Contact.js";
import Policies from "./Components/Policies.js";
import Media from "./Components/Media.js";
import { CartProvider } from "./Components/CartProvider.js";
import { SearchFilterProvider } from "./Components/SearchFilterProvider.js";
import Admin from "./Components/Admin.js";
import Users from "./Components/Users.js";
import AdminRoute from "./Components/AdminRoute.js";
import { AdminProducts } from "./Components/AdminProducts.js";
import { AdminProductForm } from "./Components/AdminProductForm.js";

function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <CartProvider>
      <SearchFilterProvider>
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
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<Login />} />
                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<Admin />} />
                    <Route
                      path="/admin/orders/:orderId"
                      element={<OrderDetails />}
                    />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route
                      path="/admin/products/new"
                      element={<AdminProductForm />}
                    />
                    <Route
                      path="/admin/products/:productId"
                      element={<AdminProductForm />}
                    />
                  </Route>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/favorite" element={<Favorites />} />
                  <Route path="/oconfo" element={<OrderConfo />} />
                  <Route path="/address" element={<AddressForm />} />
                  <Route path="/payments" element={<PaymentForm />} />
                  <Route path="/orderconfo" element={<OrderConfirmation />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:orderId" element={<OrderDetails />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/policy" element={<Policies />} />
                  <Route path="/media" element={<Media />} />
                </Routes>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </Layout>
      </SearchFilterProvider>
    </CartProvider>
  );
}

export default App;
