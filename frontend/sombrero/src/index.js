import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import MerchantProfile from "./pages/MerchantProfile";
import SearchResults from "./pages/SearchResults";
import ProductProfile from "./pages/ProductProfile";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import SignUpasMerchant from "./pages/SignUpasMerchant";
import WishlistPage from "./pages/WishlistPage";
import ForYouPage from "./pages/ForYou";
import CategoryResults from "./pages/CategoryResults";
import AdminPanel from "./pages/AdminPanel";
import CommunityPage from "./pages/CommunityPage";
import Homepage from "./pages/Homepage";
import UserProfile from "./pages/UserProfile";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/merchant/:merchantId", element: <MerchantProfile /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/category/:categoryId", element: <CategoryResults /> },
  { path: "/product/:productId", element: <ProductProfile /> },
  { path: "/login", element: <LogIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signupasmerchant", element: <SignUpasMerchant /> },
  { path: "/recommendations", element: <ForYouPage /> },
  { path: "/wishlists", element: <WishlistPage /> },
  { path: "/communitypage", element: <CommunityPage /> },
  { path: "/adminpanel", element: <AdminPanel /> },
  { path: "/homepage", element: <Homepage /> },
  { path: "/userprofile", element: <UserProfile /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
