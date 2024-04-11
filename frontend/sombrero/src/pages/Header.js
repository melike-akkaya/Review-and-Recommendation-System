import React from "react";
import ResponsiveAppBar from "../components/layout/ResponsiveAppBar";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        {/* <h1>header</h1> */}
        <ResponsiveAppBar />
      </header>
      <main>{children}</main>
      {/* <footer>
        <p>footer</p>
      </footer> */}
    </div>
  );
};

export default Layout;
