import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import MerchantProfile from "./pages/MerchantProfile";
import SearchResults from "./pages/SearchResults";
import ProductProfile from "./pages/ProductProfile";
import WishlistPage from "./pages/WishlistPage";
import ForYouPage from "./pages/ForYou";
import CategoryResults from "./pages/CategoryResults";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/merchant", element: <MerchantProfile /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/category/:categoryId", element: <CategoryResults /> },
  { path: "/product/:productId", element: <ProductProfile /> },
  { path: "/recommendations/:userId", element: <ForYouPage /> },
  { path: "/wishlists/:userId", element: <WishlistPage /> }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
