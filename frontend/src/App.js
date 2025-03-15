import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import OrderConfirmation from "./Components/OrdersFiles/OrderConfirmations/OrderConfirmation.js";
import OrderDetails from "./Components/Admin/AdminOrdersFiles/OrderDetails.js";
import About from "./Components/PageLayout/FooterFiles/About.js";
import Faq from "./Components/PageLayout/FooterFiles/Faq.js";
import Contact from "./Components/PageLayout/FooterFiles/Contact.js";
import Policies from "./Components/PageLayout/FooterFiles/Policies.js";
import Media from "./Components/PageLayout/FooterFiles/Media.js";
import { SearchFilterProvider } from "./Components/PageLayout/HeaderFiles/HeaderTabs/SearchFilterProvider.js";
import Login from "./Components/PageLayout/HeaderFiles/AuthFiles/LoginFiles/Login.js";
import Cart from "./Components/PageLayout/HeaderFiles/CartFiles/Cart.js";
import Favorites from "./Components/PageLayout/HeaderFiles/HeaderTabs/Favorites.js";
import OrderConfo from "./Components/OrdersFiles/OrderConfirmations/OrderConfoPage/OrderConfo.js";
import Home from "./Components/PageLayout/HeaderFiles/HeaderTabs/Home.js";
import AddressForm from "./Components/OrdersFiles/AddressFiles/AddressForm.js";
import PaymentForm from "./Components/OrdersFiles/PaymentFiles/PaymentForm.js";
import Orders from "./Components/OrdersFiles/Orders.js";
import Profile from "./Components/PageLayout/HeaderFiles/AuthFiles/ProfileFiles/Profile.js";
import History from "./Components/OrdersFiles/History.js";
import { CartProvider } from "./Components/PageLayout/HeaderFiles/CartFiles/CartProvider.js";
import Admin from "./Components/Admin/Admin.js";
import Users from "./Components/Admin/SideBarFiles/Users.js";
import AdminRoute from "./Components/Admin/AdminRoute.js";
import { AdminProducts } from "./Components/Admin/SideBarFiles/ProductandPage/AdminProducts.js";
import { AdminProductForm } from "./Components/Admin/SideBarFiles/ProductandPage/AdminProductForm.js";
import Layout from "./Components/PageLayout/Layout.js";
import Products from "./Components/PageLayout/HeaderFiles/UserProductFiles/Products.js";
import ProductDetails from "./Components/PageLayout/HeaderFiles/UserProductFiles/ProductsDetailsPage/ProductDetails.js";

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
