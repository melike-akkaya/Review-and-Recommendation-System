import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import MerchantProfile from "./pages/MerchantProfile";
import SearchResults from "./pages/SearchResults";
import ProductProfile from "./pages/ProductProfile";
import LogIn  from "./pages/LogIn";
import SignUp  from "./pages/SignUp";
import SignUpasMerchant  from "./pages/SignUpasMerchant";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/merchant", element: <MerchantProfile /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/product/:productId", element: <ProductProfile /> },
  { path: "/login", element: <LogIn />},
  { path: "/signup", element: <SignUp />},
  { path: "/signupasmerchant", element: <SignUpasMerchant />}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

