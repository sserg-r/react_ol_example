import React from "react";
import "./style.css";
import "ol/ol.css";

import useMap from "../../hooks/useMap";
import Footer from "./Footer";
import ScaleLine from "./Footer/ScaleLine";

const Map = () => {
  useMap();
  return (
    <div id="Map">
      <ScaleLine />
      <Footer />
    </div>
  );
};

export default Map;
