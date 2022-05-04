import React from "react";
import "./style.css";
import Graticule from "../Graticule";

const Header = () => {
  return (
    <div id="TocHeader">
      <p>TOC</p>
      <div className="tools">
        <Graticule />
      </div>
    </div>
  );
};

export default Header;
