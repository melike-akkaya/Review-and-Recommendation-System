import React from "react";
import ResponsiveAppBar from "../components/layout/ResponsiveAppBar";
// import { IconButton } from "@mui/material";
// import rrssIcon from "../assets/rrss-logo.png";

const Layout = ({ children }) => {
  // const handleRRSSClick = () => {
  //   window.location.href = "/"; // Redirect to the home page
  // };

  return (
    <div>
      <header className="fixed-header">
        {/* <IconButton style={{ width: 350, height: 150 }}>
          <img
            src={rrssIcon}
            alt="RRSS Logo"
            style={{ transform: "scale(0.2)" }}
            onClick={handleRRSSClick}
          />
        </IconButton> */}
        <ResponsiveAppBar />
      </header>
      <main className="header-content">{children}</main>
      {/* <footer>
        <p>footer</p>
      </footer> */}
    </div>
  );
};

export default Layout;
