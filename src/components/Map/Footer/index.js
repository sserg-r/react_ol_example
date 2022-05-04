import React from "react";
import "./style.css";

const Footer = ({ children }) => {
  return (
    <div id="Footer">
      {(children && children.map(child => child)) || children}
    </div>
  );
};

export default Footer;
