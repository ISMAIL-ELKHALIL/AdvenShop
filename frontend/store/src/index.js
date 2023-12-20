import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";

import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ContactScreen from "./screens/ContactScreen";
import AboutScreen from "./screens/AboutScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FilterProductsScreen from "./screens/FilterProductsScreen";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/styles/index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index={true} path="/" element={<HomeScreen></HomeScreen>}></Route>

      <Route
        path="/products/:id"
        element={<ProductScreen></ProductScreen>}
      ></Route>

      <Route path="/cart" element={<CartScreen></CartScreen>}></Route>

      <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>

      <Route path="/contact" element={<ContactScreen></ContactScreen>}></Route>

      <Route path="/about" element={<AboutScreen></AboutScreen>}></Route>

      <Route
        path="/products/"
        element={<FilterProductsScreen>

        </FilterProductsScreen>}
      ></Route>

      <Route
        path="/register"
        element={<RegisterScreen></RegisterScreen>}
      ></Route>

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute></PrivateRoute>}>
        <Route
          path="/shipping"
          element={<ShippingScreen></ShippingScreen>}
        ></Route>

        <Route
          path="/payment"
          element={<PaymentScreen></PaymentScreen>}
        ></Route>
        <Route
          path="/place-order"
          element={<PlaceOrderScreen></PlaceOrderScreen>}
        ></Route>
        <Route path="/orders/:id" element={<OrderScreen />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}></RouterProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
