import React from "react";
import CategorySelector from "./../components/layout/CatergorySelector";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        {/* <h1>header</h1> */}
        <CategorySelector />
      </header>
      <main>{children}</main>
      {/* <footer>
        <p>footer</p>
      </footer> */}
    </div>
  );
};

export default Layout;
